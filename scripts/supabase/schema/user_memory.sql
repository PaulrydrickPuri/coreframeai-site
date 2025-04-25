-- Schema for user_memory table
-- This table stores user preferences and settings for the MCP Playground

CREATE TABLE IF NOT EXISTS user_memory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique index on user_id to ensure one memory record per user
CREATE UNIQUE INDEX IF NOT EXISTS user_memory_user_id_idx ON user_memory(user_id);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_memory_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update the updated_at timestamp
CREATE TRIGGER set_user_memory_updated_at
BEFORE UPDATE ON user_memory
FOR EACH ROW
EXECUTE FUNCTION update_user_memory_updated_at();

-- Row level security policies
ALTER TABLE user_memory ENABLE ROW LEVEL SECURITY;

-- Policy for users to only see and modify their own memory
CREATE POLICY user_memory_user_policy
  ON user_memory
  FOR ALL
  USING (user_id = auth.uid() OR user_id LIKE 'anon_%')
  WITH CHECK (user_id = auth.uid() OR user_id LIKE 'anon_%');
