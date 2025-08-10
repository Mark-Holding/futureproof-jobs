-- Add AI Resistance columns to existing job_posts table
-- Run this in your Supabase SQL Editor

-- Add the new AI resistance columns
ALTER TABLE job_posts 
ADD COLUMN IF NOT EXISTS ai_resistance_level VARCHAR(50),
ADD COLUMN IF NOT EXISTS ai_resistance_job_title TEXT,
ADD COLUMN IF NOT EXISTS ai_resistance_calculated BOOLEAN DEFAULT false;

-- Update existing records to have default values
UPDATE job_posts 
SET 
  ai_resistance_level = 'Not Calculated',
  ai_resistance_job_title = title,
  ai_resistance_calculated = false
WHERE ai_resistance_level IS NULL;

-- Make sure the columns are not null for new records
ALTER TABLE job_posts 
ALTER COLUMN ai_resistance_level SET NOT NULL,
ALTER COLUMN ai_resistance_job_title SET NOT NULL,
ALTER COLUMN ai_resistance_calculated SET NOT NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_posts_ai_resistance_score ON job_posts(ai_resistance_score);
CREATE INDEX IF NOT EXISTS idx_job_posts_ai_resistance_level ON job_posts(ai_resistance_level);
CREATE INDEX IF NOT EXISTS idx_job_posts_ai_resistance_calculated ON job_posts(ai_resistance_calculated);
