# MCP Playground Supabase Integration Guide

This guide explains how to set up the Supabase integration for the MCP Playground to enable user memory and tool usage tracking.

## Overview

The MCP Playground uses Supabase for two main purposes:
1. Storing user preferences and settings (`user_memory` table)
2. Tracking tool usage history (`tool_usage_history` table)

The implementation is optimized to only save data to Supabase when a user runs a tool, making the page static when idle.

## Prerequisites

- Supabase account with a project created
- Access to the Supabase project dashboard
- Environment variables configured in `.env.local`

## Step 1: Create Required Tables

Log in to your Supabase dashboard and navigate to the SQL Editor. Create the following tables:

### User Memory Table

```sql
-- Create user_memory table
CREATE TABLE IF NOT EXISTS public.user_memory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.user_memory ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own data
CREATE POLICY "Users can only view their own memory"
  ON public.user_memory
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own data
CREATE POLICY "Users can insert their own memory"
  ON public.user_memory
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own data
CREATE POLICY "Users can update their own memory"
  ON public.user_memory
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_memory_user_id ON public.user_memory(user_id);
```

### Tool Usage History Table

```sql
-- Create tool_usage_history table
CREATE TABLE IF NOT EXISTS public.tool_usage_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  tool_id TEXT NOT NULL,
  input_params JSONB DEFAULT '{}'::jsonb,
  result JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.tool_usage_history ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own data
CREATE POLICY "Users can only view their own tool usage"
  ON public.tool_usage_history
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own data
CREATE POLICY "Users can insert their own tool usage"
  ON public.tool_usage_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_tool_usage_user_id ON public.tool_usage_history(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_id ON public.tool_usage_history(tool_id);
```

## Step 2: Configure Environment Variables

Ensure your `.env.local` file contains the following variables:

```
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

These variables are already being used by the OptimizedMemoryManager component.

## Step 3: Authentication Setup (Optional)

If you want users to be able to log in and have persistent data across devices:

1. Go to Authentication → Settings in your Supabase dashboard
2. Configure your preferred auth providers:
   - Email/Password
   - Google
   - GitHub
   - etc.
3. Set up redirect URLs for your environments:
   - Development: `http://localhost:3000/api/auth/callback`, `http://localhost:3001/api/auth/callback`
   - Production: `https://your-domain.com/api/auth/callback`

## Step 4: Testing the Integration

To test if your Supabase integration is working correctly:

1. Start the development server: `npm run dev`
2. Open the MCP Playground
3. Select a tool and run it
4. Check the browser console for logs about Supabase saving data
5. Verify in the Supabase dashboard that data was saved to the tables

## Troubleshooting

### No Data Being Saved to Supabase

1. Check browser console for errors
2. Verify environment variables are correctly set
3. Ensure tables exist with the correct structure
4. Check that RLS policies are properly configured
5. Verify user authentication status

### Authentication Issues

1. Ensure redirect URLs are correctly configured
2. Check for CORS issues in browser console
3. Verify that auth providers are properly set up

## Implementation Details

The OptimizedMemoryManager component includes these optimizations:

1. **Lazy Loading**: Only checks if tables exist once during initialization
2. **Local-First**: Always saves to localStorage for immediate access
3. **Write-on-Action**: Only writes to Supabase when a user runs a tool
4. **Graceful Degradation**: Falls back to localStorage if Supabase is unavailable
5. **Anonymous Support**: Works for both authenticated and anonymous users

## Next Steps

After setting up the basic integration, you can extend it with:

1. **User Profiles**: Store additional user information
2. **Usage Analytics**: Track which tools are most popular
3. **Personalization**: Recommend tools based on usage patterns
4. **Team Sharing**: Allow users to share tool configurations

For more information, refer to the [Supabase documentation](https://supabase.com/docs) and the [MCP Playground Roadmap](../src/features/prototype/ROADMAP.md).
