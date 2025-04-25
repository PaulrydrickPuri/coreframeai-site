-- Schema for tool_usage_history table
-- This table tracks tool usage patterns for the MCP Playground

CREATE TABLE IF NOT EXISTS tool_usage_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  tool_id TEXT NOT NULL,
  input_params JSONB NOT NULL,
  result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS tool_usage_history_user_id_idx ON tool_usage_history(user_id);

-- Create index for faster lookups by tool_id
CREATE INDEX IF NOT EXISTS tool_usage_history_tool_id_idx ON tool_usage_history(tool_id);

-- Create index for faster lookups by creation date
CREATE INDEX IF NOT EXISTS tool_usage_history_created_at_idx ON tool_usage_history(created_at);

-- Row level security policies
ALTER TABLE tool_usage_history ENABLE ROW LEVEL SECURITY;

-- Policy for users to only see their own tool usage history
CREATE POLICY tool_usage_history_user_policy
  ON tool_usage_history
  FOR ALL
  USING (user_id = auth.uid() OR user_id LIKE 'anon_%')
  WITH CHECK (user_id = auth.uid() OR user_id LIKE 'anon_%');
