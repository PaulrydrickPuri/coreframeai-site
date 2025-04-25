"use client";

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// Define types for user memory
export interface UserMemory {
  id?: string;
  user_id: string;
  preferences: {
    last_tool_id?: string;
    theme?: 'light' | 'dark';
    [key: string]: any;
  };
  created_at?: string;
  updated_at?: string;
}

export interface ToolUsageHistory {
  id?: string;
  user_id: string;
  tool_id: string;
  input_params: Record<string, any>;
  result: any;
  created_at?: string;
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simple function to get anonymous ID
function getOrCreateAnonymousId(): string {
  const stored = localStorage.getItem('anonymous_user_id');
  if (stored) return stored;
  
  const newId = `anon_${Math.random().toString(36).substring(2, 15)}`;
  localStorage.setItem('anonymous_user_id', newId);
  return newId;
}

// Load data from localStorage
function loadFromLocalStorage() {
  try {
    const preferences = JSON.parse(localStorage.getItem('user_preferences') || '{}');
    const history = JSON.parse(localStorage.getItem('tool_usage_history') || '[]');
    return { preferences, history };
  } catch (e) {
    console.log('Error loading from localStorage');
    return { preferences: {}, history: [] };
  }
}

export function useOptimizedMemory() {
  // Use refs to avoid re-renders
  const initRef = useRef(false);
  const tablesExistRef = useRef(false);
  const userIdRef = useRef<string | null>(null);
  
  // State that will trigger renders
  const [userMemory, setUserMemory] = useState<UserMemory | null>(null);
  const [toolHistory, setToolHistory] = useState<ToolUsageHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize only once
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    
    const init = async () => {
      try {
        // 1. Load from localStorage first for immediate UI
        const { preferences, history } = loadFromLocalStorage();
        
        // 2. Try to get authenticated user
        let currentUserId: string;
        try {
          const { data } = await supabase.auth.getSession();
          currentUserId = data.session?.user?.id || getOrCreateAnonymousId();
        } catch (e) {
          currentUserId = getOrCreateAnonymousId();
        }
        
        // Store userId in ref to avoid re-renders
        userIdRef.current = currentUserId;
        
        // 3. Set initial state from localStorage
        setUserMemory({
          user_id: currentUserId,
          preferences: preferences
        });
        setToolHistory(history);
        
        // 4. Check if tables exist (only for information)
        try {
          const { error } = await supabase
            .from('user_memory')
            .select('*', { count: 'exact', head: true });
          
          tablesExistRef.current = !error;
          console.log(tablesExistRef.current ? 
            'Supabase tables exist, will save data to database when tools run' : 
            'Using localStorage only (tables not found)');
        } catch (e) {
          console.log('Error checking tables, using localStorage only');
        }
      } catch (e) {
        console.log('Error in initialization');
      } finally {
        setIsLoading(false);
      }
    };
    
    init();
  }, []); // Empty dependency array - run once only

  // Update preferences locally (no database write)
  const updatePreferences = (newPreferences: Record<string, any>) => {
    if (!userMemory) return;
    
    try {
      // Create new object to trigger re-render
      const updatedMemory = {
        ...userMemory,
        preferences: {
          ...userMemory.preferences,
          ...newPreferences
        }
      };
      
      // Update state and localStorage
      setUserMemory(updatedMemory);
      localStorage.setItem('user_preferences', JSON.stringify(updatedMemory.preferences));
    } catch (e) {
      console.log('Error updating preferences');
    }
  };

  // Save tool usage - only function that writes to database
  const saveToolUsage = async (toolId: string, inputParams: Record<string, any>, result: any) => {
    if (!userIdRef.current) return;
    
    try {
      // 1. Create tool usage object
      const toolUsage: ToolUsageHistory = {
        user_id: userIdRef.current,
        tool_id: toolId,
        input_params: inputParams,
        result: result,
        created_at: new Date().toISOString()
      };
      
      // 2. Update local state
      setToolHistory(prev => [toolUsage, ...prev].slice(0, 10));
      updatePreferences({ last_tool_id: toolId });
      
      // 3. Always save to localStorage
      try {
        const localHistory = JSON.parse(localStorage.getItem('tool_usage_history') || '[]');
        localStorage.setItem('tool_usage_history', 
          JSON.stringify([toolUsage, ...localHistory].slice(0, 10)));
      } catch (e) {
        console.log('Error saving to localStorage');
      }
      
      // 4. Save to Supabase if tables exist and user is authenticated
      if (tablesExistRef.current && userIdRef.current && !userIdRef.current.startsWith('anon_')) {
        console.log('Saving to Supabase...');
        
        // Save user preferences
        try {
          await supabase
            .from('user_memory')
            .upsert({
              user_id: userIdRef.current,
              preferences: userMemory?.preferences || {},
              updated_at: new Date().toISOString()
            });
        } catch (e) {
          console.log('Error saving preferences to database');
        }
        
        // Save tool usage
        try {
          await supabase
            .from('tool_usage_history')
            .insert(toolUsage);
        } catch (e) {
          console.log('Error saving tool usage to database');
        }
      }
    } catch (e) {
      console.log('Error in saveToolUsage');
    }
  };

  // Get last used values for a specific tool
  const getLastToolValues = (toolId: string): Record<string, any> | undefined => {
    const toolUsage = toolHistory.find(history => history.tool_id === toolId);
    return toolUsage?.input_params;
  };

  return {
    userId: userIdRef.current,
    userMemory,
    toolHistory,
    isLoading,
    error,
    updatePreferences,
    saveToolUsage,
    getLastToolValues
  };
}
