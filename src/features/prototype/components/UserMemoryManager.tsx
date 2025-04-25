"use client";

import { useState, useEffect } from 'react';
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

export function useUserMemory() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userMemory, setUserMemory] = useState<UserMemory | null>(null);
  const [toolHistory, setToolHistory] = useState<ToolUsageHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (session?.user) {
          setUserId(session.user.id);
        } else {
          // Create anonymous session ID for non-authenticated users
          const anonymousId = localStorage.getItem('anonymous_user_id');
          if (anonymousId) {
            setUserId(anonymousId);
          } else {
            const newAnonymousId = `anon_${Math.random().toString(36).substring(2, 15)}`;
            localStorage.setItem('anonymous_user_id', newAnonymousId);
            setUserId(newAnonymousId);
          }
        }
      } catch (err) {
        console.error('Auth error:', err);
        setError('Failed to authenticate');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fetch user memory when userId is available
  useEffect(() => {
    const fetchUserMemory = async () => {
      if (!userId) return;
      
      try {
        setIsLoading(true);
        
        // Create default memory object for all users
        const newMemory: UserMemory = {
          user_id: userId,
          preferences: {}
        };
        
        // Try to load from localStorage for anonymous users
        if (userId.startsWith('anon_')) {
          const savedPrefs = localStorage.getItem('user_preferences');
          if (savedPrefs) {
            newMemory.preferences = JSON.parse(savedPrefs);
          }
          setUserMemory(newMemory);
          
          // Load tool history from localStorage
          const localHistory = JSON.parse(localStorage.getItem('tool_usage_history') || '[]');
          setToolHistory(localHistory);
          setIsLoading(false);
          return;
        }
        
        // For authenticated users, try to use Supabase if available
        try {
          // Check if the table exists by making a small query
          const { data, error } = await supabase
            .from('user_memory')
            .select('*')
            .eq('user_id', userId)
            .single();
          
          // If we get here without error, table exists
          if (data) {
            setUserMemory(data);
          } else if (!error || error.code === 'PGRST116') { // PGRST116 is "no rows returned"
            // Table exists but no data for this user
            try {
              const { data: newData, error: insertError } = await supabase
                .from('user_memory')
                .insert(newMemory)
                .select()
                .single();
              
              if (!insertError) {
                setUserMemory(newData);
              } else {
                // Fall back to local memory if insert fails
                setUserMemory(newMemory);
              }
            } catch (insertErr) {
              // Fall back to local memory
              setUserMemory(newMemory);
            }
          } else {
            // Table might not exist, fall back to local memory
            setUserMemory(newMemory);
          }
          
          // Try to fetch tool history if table exists
          try {
            const { data: historyData } = await supabase
              .from('tool_usage_history')
              .select('*')
              .eq('user_id', userId)
              .order('created_at', { ascending: false })
              .limit(10);
            
            if (historyData) {
              setToolHistory(historyData);
            }
          } catch (historyErr) {
            // Table might not exist, use empty array
            setToolHistory([]);
          }
        } catch (dbErr) {
          // Supabase error, fall back to local memory
          console.log('Using local memory due to database error');
          setUserMemory(newMemory);
          setToolHistory([]);
        }
      } catch (err) {
        console.log('Error in memory system, using defaults');
        // Create a minimal working memory system
        setUserMemory({
          user_id: userId,
          preferences: {}
        });
        setToolHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserMemory();
  }, [userId]);

  // Update user preferences
  const updatePreferences = async (newPreferences: Record<string, any>) => {
    if (!userId || !userMemory) return;
    
    try {
      const updatedMemory = {
        ...userMemory,
        preferences: {
          ...userMemory.preferences,
          ...newPreferences
        },
        updated_at: new Date().toISOString()
      };
      
      setUserMemory(updatedMemory);
      
      // For anonymous users, always store in localStorage
      if (userId.startsWith('anon_')) {
        localStorage.setItem('user_preferences', JSON.stringify(updatedMemory.preferences));
        return;
      }
      
      // For authenticated users, try Supabase if available
      try {
        const { error } = await supabase
          .from('user_memory')
          .update({
            preferences: updatedMemory.preferences,
            updated_at: updatedMemory.updated_at
          })
          .eq('user_id', userId);
        
        // If error, might be that table doesn't exist, fall back to localStorage
        if (error) {
          localStorage.setItem('user_preferences', JSON.stringify(updatedMemory.preferences));
        }
      } catch (err) {
        // Supabase error, fall back to localStorage
        localStorage.setItem('user_preferences', JSON.stringify(updatedMemory.preferences));
      }
    } catch (err) {
      console.log('Error updating preferences, using local storage');
      // Still try to save to localStorage as fallback
      if (userMemory && userMemory.preferences) {
        localStorage.setItem('user_preferences', JSON.stringify(userMemory.preferences));
      }
    }
  };

  // Save tool usage
  const saveToolUsage = async (toolId: string, inputParams: Record<string, any>, result: any) => {
    if (!userId) return;
    
    try {
      const toolUsage: ToolUsageHistory = {
        user_id: userId,
        tool_id: toolId,
        input_params: inputParams,
        result: result
      };
      
      // Update local state first
      setToolHistory(prev => [toolUsage, ...prev].slice(0, 10));
      
      // Update last tool in preferences
      updatePreferences({ last_tool_id: toolId });
      
      // For anonymous users, always store in localStorage
      if (userId.startsWith('anon_')) {
        const localHistory = JSON.parse(localStorage.getItem('tool_usage_history') || '[]');
        localStorage.setItem('tool_usage_history', JSON.stringify([toolUsage, ...localHistory].slice(0, 10)));
        return;
      }
      
      // For authenticated users, try Supabase if available
      try {
        const { error } = await supabase
          .from('tool_usage_history')
          .insert(toolUsage);
        
        // If error, might be that table doesn't exist, fall back to localStorage
        if (error) {
          const localHistory = JSON.parse(localStorage.getItem('tool_usage_history') || '[]');
          localStorage.setItem('tool_usage_history', JSON.stringify([toolUsage, ...localHistory].slice(0, 10)));
        }
      } catch (err) {
        // Supabase error, fall back to localStorage
        const localHistory = JSON.parse(localStorage.getItem('tool_usage_history') || '[]');
        localStorage.setItem('tool_usage_history', JSON.stringify([toolUsage, ...localHistory].slice(0, 10)));
      }
    } catch (err) {
      console.log('Error saving tool usage, using local storage');
      try {
        // Still try to save to localStorage as fallback
        const localHistory = JSON.parse(localStorage.getItem('tool_usage_history') || '[]');
        const toolUsage = {
          user_id: userId,
          tool_id: toolId,
          input_params: inputParams,
          result: result
        };
        localStorage.setItem('tool_usage_history', JSON.stringify([toolUsage, ...localHistory].slice(0, 10)));
      } catch (localErr) {
        // Even localStorage failed, just continue
      }
    }
  };

  // Get last used values for a specific tool
  const getLastToolValues = (toolId: string): Record<string, any> | undefined => {
    const toolUsage = toolHistory.find(history => history.tool_id === toolId);
    return toolUsage?.input_params;
  };

  return {
    userId,
    userMemory,
    toolHistory,
    isLoading,
    error,
    updatePreferences,
    saveToolUsage,
    getLastToolValues
  };
}
