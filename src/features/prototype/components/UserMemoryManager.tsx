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
        
        // Try to fetch existing user memory
        const { data, error } = await supabase
          .from('user_memory')
          .select('*')
          .eq('user_id', userId)
          .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          throw error;
        }
        
        if (data) {
          setUserMemory(data);
        } else {
          // Create new user memory if none exists
          const newMemory: UserMemory = {
            user_id: userId,
            preferences: {}
          };
          
          // Only insert to database if authenticated
          if (!userId.startsWith('anon_')) {
            const { data: newData, error: insertError } = await supabase
              .from('user_memory')
              .insert(newMemory)
              .select()
              .single();
            
            if (insertError) throw insertError;
            
            setUserMemory(newData);
          } else {
            // For anonymous users, just keep in state
            setUserMemory(newMemory);
          }
        }
        
        // Fetch tool usage history
        const { data: historyData, error: historyError } = await supabase
          .from('tool_usage_history')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (historyError) throw historyError;
        
        setToolHistory(historyData || []);
      } catch (err) {
        console.error('Error fetching user memory:', err);
        setError('Failed to load user data');
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
      
      // Only update database if authenticated
      if (!userId.startsWith('anon_')) {
        const { error } = await supabase
          .from('user_memory')
          .update({
            preferences: updatedMemory.preferences,
            updated_at: updatedMemory.updated_at
          })
          .eq('user_id', userId);
        
        if (error) throw error;
      } else {
        // For anonymous users, store in localStorage
        localStorage.setItem('user_preferences', JSON.stringify(updatedMemory.preferences));
      }
    } catch (err) {
      console.error('Error updating preferences:', err);
      setError('Failed to update preferences');
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
      
      // Only save to database if authenticated
      if (!userId.startsWith('anon_')) {
        const { error } = await supabase
          .from('tool_usage_history')
          .insert(toolUsage);
        
        if (error) throw error;
      } else {
        // For anonymous users, store in localStorage
        const localHistory = JSON.parse(localStorage.getItem('tool_usage_history') || '[]');
        localStorage.setItem('tool_usage_history', JSON.stringify([toolUsage, ...localHistory].slice(0, 10)));
      }
    } catch (err) {
      console.error('Error saving tool usage:', err);
      setError('Failed to save tool usage');
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
