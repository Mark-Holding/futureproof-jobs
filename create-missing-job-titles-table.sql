-- Create table for tracking missing job titles
-- This table will store job titles that employers couldn't find in the AI resistance database

CREATE TABLE IF NOT EXISTS missing_user_job_titles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_title TEXT NOT NULL,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'added', 'rejected')),
  notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_missing_job_titles_status ON missing_user_job_titles(status);
CREATE INDEX idx_missing_job_titles_created_at ON missing_user_job_titles(created_at);
CREATE INDEX idx_missing_job_titles_company_id ON missing_user_job_titles(company_id);
CREATE INDEX idx_missing_job_titles_user_id ON missing_user_job_titles(user_id);

-- Enable RLS
ALTER TABLE missing_user_job_titles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can insert their own missing job titles" ON missing_user_job_titles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own missing job titles" ON missing_user_job_titles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Company members can view company missing job titles" ON missing_user_job_titles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM company_members 
      WHERE company_members.company_id = missing_user_job_titles.company_id 
      AND company_members.user_id = auth.uid()
    )
  );

-- Grant permissions
GRANT ALL ON missing_user_job_titles TO authenticated;
GRANT ALL ON missing_user_job_titles TO service_role;
