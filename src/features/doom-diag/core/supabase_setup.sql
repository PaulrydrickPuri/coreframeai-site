-- Create doom_diag_reports table
CREATE TABLE IF NOT EXISTS doom_diag_reports (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  created_at_timestamp TIMESTAMPTZ DEFAULT NOW(),
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  financial_summary JSONB NOT NULL,
  doom_clock JSONB NOT NULL,
  brutal_headlines JSONB NOT NULL,
  status TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index for faster retrieval by date
CREATE INDEX IF NOT EXISTS idx_doom_diag_reports_timestamp ON doom_diag_reports (created_at_timestamp DESC);

-- Enable Row Level Security
ALTER TABLE doom_diag_reports ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows authenticated users to view only their own reports
-- For MVP we're allowing anonymous/all access, but this can be refined later
CREATE POLICY "Allow anonymous access" ON doom_diag_reports
  FOR ALL
  USING (true);

-- Set up storage for PDF exports (optional)
-- INSERT INTO storage.buckets (id, name) VALUES ('doom-diag', 'Doom Diagnostics Reports')
-- ON CONFLICT DO NOTHING;

-- Create a policy that allows authenticated users to read/write their own files
-- CREATE POLICY "Allow anonymous access to doom-diag storage" ON storage.objects
--   FOR ALL
--   USING (bucket_id = 'doom-diag');
