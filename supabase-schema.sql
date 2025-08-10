-- Supabase Schema for AI Resistance Index
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Occupations table
CREATE TABLE IF NOT EXISTS occupations (
  id SERIAL PRIMARY KEY,
  soc_code VARCHAR(10) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alternate titles table
CREATE TABLE IF NOT EXISTS alternate_titles (
  id SERIAL PRIMARY KEY,
  soc_code VARCHAR(10) REFERENCES occupations(soc_code) ON DELETE CASCADE,
  alternate_title TEXT NOT NULL,
  short_title TEXT,
  source_code VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills data table
CREATE TABLE IF NOT EXISTS skills_data (
  id SERIAL PRIMARY KEY,
  soc_code VARCHAR(10) REFERENCES occupations(soc_code) ON DELETE CASCADE,
  element_name TEXT NOT NULL,
  element_id VARCHAR(10),
  scale_type VARCHAR(20) NOT NULL,
  data_value DECIMAL(5,2),
  n DECIMAL(5,2),
  standard_error DECIMAL(5,2),
  lower_ci_bound DECIMAL(5,2),
  upper_ci_bound DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge data table
CREATE TABLE IF NOT EXISTS knowledge_data (
  id SERIAL PRIMARY KEY,
  soc_code VARCHAR(10) REFERENCES occupations(soc_code) ON DELETE CASCADE,
  element_name TEXT NOT NULL,
  element_id VARCHAR(10),
  scale_type VARCHAR(20) NOT NULL,
  data_value DECIMAL(5,2),
  n DECIMAL(5,2),
  standard_error DECIMAL(5,2),
  lower_ci_bound DECIMAL(5,2),
  upper_ci_bound DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Abilities data table
CREATE TABLE IF NOT EXISTS abilities_data (
  id SERIAL PRIMARY KEY,
  soc_code VARCHAR(10) REFERENCES occupations(soc_code) ON DELETE CASCADE,
  element_name TEXT NOT NULL,
  element_id VARCHAR(10),
  scale_type VARCHAR(20) NOT NULL,
  data_value DECIMAL(5,2),
  n DECIMAL(5,2),
  standard_error DECIMAL(5,2),
  lower_ci_bound DECIMAL(5,2),
  upper_ci_bound DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resistance factors table
CREATE TABLE IF NOT EXISTS resistance_factors (
  id SERIAL PRIMARY KEY,
  factor_name VARCHAR(50) UNIQUE NOT NULL,
  weight DECIMAL(3,2) NOT NULL,
  factor_type VARCHAR(20) NOT NULL CHECK (factor_type IN ('protection', 'vulnerability')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Element factor mappings table
CREATE TABLE IF NOT EXISTS element_factor_mappings (
  id SERIAL PRIMARY KEY,
  factor_name VARCHAR(50) REFERENCES resistance_factors(factor_name) ON DELETE CASCADE,
  element_name TEXT NOT NULL,
  element_type VARCHAR(20) NOT NULL CHECK (element_type IN ('skill', 'knowledge', 'ability')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job analysis cache table
CREATE TABLE IF NOT EXISTS job_analysis_cache (
  id SERIAL PRIMARY KEY,
  soc_code VARCHAR(10) REFERENCES occupations(soc_code) ON DELETE CASCADE,
  resistance_score INTEGER NOT NULL,
  factor_scores JSONB,
  breakdown JSONB,
  algorithm_version VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User queries table
CREATE TABLE IF NOT EXISTS user_queries (
  id SERIAL PRIMARY KEY,
  query_text TEXT NOT NULL,
  matched_soc_code VARCHAR(10) REFERENCES occupations(soc_code) ON DELETE SET NULL,
  resistance_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default resistance factors
INSERT INTO resistance_factors (factor_name, weight, factor_type, description) VALUES
('physical_coordination', 0.25, 'protection', 'Body movement, dexterity, stamina - requires physical presence'),
('creative_artistic', 0.20, 'protection', 'Originality, artistic skills - uniquely human creativity'),
('human_interaction', 0.18, 'protection', 'Social skills, empathy, communication with people'),
('complex_reasoning', 0.15, 'protection', 'Strategic thinking, complex problem solving'),
('mathematical_technical', -0.20, 'vulnerability', 'Math, programming, technical analysis - AI excels here'),
('routine_cognitive', -0.15, 'vulnerability', 'Repetitive mental tasks, monitoring, quality control'),
('data_processing', -0.12, 'vulnerability', 'Reading, writing, data analysis - increasingly automated'),
('equipment_operation', -0.08, 'vulnerability', 'Machine operation, equipment control')
ON CONFLICT (factor_name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_occupations_soc_code ON occupations(soc_code);
CREATE INDEX IF NOT EXISTS idx_alternate_titles_soc_code ON alternate_titles(soc_code);
CREATE INDEX IF NOT EXISTS idx_alternate_titles_title ON alternate_titles(alternate_title);
CREATE INDEX IF NOT EXISTS idx_skills_data_soc_code ON skills_data(soc_code);
CREATE INDEX IF NOT EXISTS idx_knowledge_data_soc_code ON knowledge_data(soc_code);
CREATE INDEX IF NOT EXISTS idx_abilities_data_soc_code ON abilities_data(soc_code);
CREATE INDEX IF NOT EXISTS idx_job_analysis_cache_soc_code ON job_analysis_cache(soc_code);
CREATE INDEX IF NOT EXISTS idx_user_queries_created_at ON user_queries(created_at);

-- Enable Row Level Security (optional - for public read access)
ALTER TABLE occupations ENABLE ROW LEVEL SECURITY;
ALTER TABLE alternate_titles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE abilities_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE resistance_factors ENABLE ROW LEVEL SECURITY;
ALTER TABLE element_factor_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_analysis_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_queries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to occupations" ON occupations FOR SELECT USING (true);
CREATE POLICY "Allow public read access to alternate_titles" ON alternate_titles FOR SELECT USING (true);
CREATE POLICY "Allow public read access to skills_data" ON skills_data FOR SELECT USING (true);
CREATE POLICY "Allow public read access to knowledge_data" ON knowledge_data FOR SELECT USING (true);
CREATE POLICY "Allow public read access to abilities_data" ON abilities_data FOR SELECT USING (true);
CREATE POLICY "Allow public read access to resistance_factors" ON resistance_factors FOR SELECT USING (true);
CREATE POLICY "Allow public read access to element_factor_mappings" ON element_factor_mappings FOR SELECT USING (true);
CREATE POLICY "Allow public read access to job_analysis_cache" ON job_analysis_cache FOR SELECT USING (true);
CREATE POLICY "Allow public insert to job_analysis_cache" ON job_analysis_cache FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to user_queries" ON user_queries FOR INSERT WITH CHECK (true); 