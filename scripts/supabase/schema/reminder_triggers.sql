-- Schema for reminder_triggers table
-- This table stores user reminders for the MCP time value tool

CREATE TABLE IF NOT EXISTS reminder_triggers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT NOT NULL,
  reminder_time TIME NOT NULL,
  hourly_rate DECIMAL(10, 2) NOT NULL,
  reminder_type TEXT NOT NULL DEFAULT 'email', -- 'email' or 'push'
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups by email
CREATE INDEX IF NOT EXISTS reminder_triggers_email_idx ON reminder_triggers(user_email);

-- Index for faster lookups by reminder time
CREATE INDEX IF NOT EXISTS reminder_triggers_time_idx ON reminder_triggers(reminder_time);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_reminder_triggers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update the updated_at timestamp
CREATE TRIGGER set_reminder_triggers_updated_at
BEFORE UPDATE ON reminder_triggers
FOR EACH ROW
EXECUTE FUNCTION update_reminder_triggers_updated_at();

-- Sample data (commented out for production)
/*
INSERT INTO reminder_triggers (user_email, reminder_time, hourly_rate, reminder_type)
VALUES
  ('user@example.com', '09:00:00', 45.75, 'email'),
  ('another@example.com', '18:30:00', 62.50, 'push');
*/

-- Row level security policies
ALTER TABLE reminder_triggers ENABLE ROW LEVEL SECURITY;

-- Policy for users to only see their own reminders
CREATE POLICY reminder_triggers_user_policy
  ON reminder_triggers
  FOR ALL
  USING (user_email = auth.email());
