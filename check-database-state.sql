-- Check Database State - Run this in Supabase SQL Editor
-- This will help us diagnose what's broken after our migrations

-- 1. Check if all required tables exist
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables 
WHERE tablename IN (
  'user_profiles',
  'companies', 
  'company_members',
  'job_posts',
  'missing_user_job_titles'
)
ORDER BY tablename;

-- 2. Check RLS status on all tables
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename IN (
  'user_profiles',
  'companies', 
  'company_members',
  'job_posts',
  'missing_user_job_titles'
)
ORDER BY tablename;

-- 3. Check existing RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename IN (
  'user_profiles',
  'companies', 
  'company_members',
  'job_posts',
  'missing_user_job_titles'
)
ORDER BY tablename, policyname;

-- 4. Check auth.users table structure (this is critical for authentication)
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'auth' 
AND table_name = 'users'
ORDER BY ordinal_position;

-- 5. Check if there are any users in auth.users
SELECT COUNT(*) as total_users FROM auth.users;

-- 6. Check if there are any user_profiles
SELECT COUNT(*) as total_profiles FROM user_profiles;

-- 7. Check if there are any companies
SELECT COUNT(*) as total_companies FROM companies;

-- 8. Check if there are any company_members
SELECT COUNT(*) as total_company_members FROM company_members;

-- 9. Check for any broken foreign key constraints
SELECT 
  tc.table_name, 
  kcu.column_name, 
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND tc.table_name IN (
  'user_profiles',
  'companies', 
  'company_members',
  'job_posts',
  'missing_user_job_titles'
);

-- 10. Check if the auth schema is accessible
SELECT has_schema_privilege('authenticated', 'auth', 'USAGE') as auth_schema_accessible;
