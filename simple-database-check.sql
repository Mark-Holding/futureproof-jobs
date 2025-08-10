-- Simple Database Check - Run this in Supabase SQL Editor
-- This will help identify what's broken step by step

-- Test 1: Basic connection and auth access
SELECT 'Test 1: Auth schema accessible' as test_name, 
       has_schema_privilege('authenticated', 'auth', 'USAGE') as result;

-- Test 2: Check if auth.users table exists and is accessible
SELECT 'Test 2: Auth users table accessible' as test_name,
       EXISTS (
         SELECT 1 FROM information_schema.tables 
         WHERE table_schema = 'auth' AND table_name = 'users'
       ) as table_exists;

-- Test 3: Try to count users in auth.users
SELECT 'Test 3: Count auth users' as test_name,
       (SELECT COUNT(*) FROM auth.users) as user_count;

-- Test 4: Check if user_profiles table exists
SELECT 'Test 4: User profiles table exists' as test_name,
       EXISTS (
         SELECT 1 FROM information_schema.tables 
         WHERE table_schema = 'public' AND table_name = 'user_profiles'
       ) as table_exists;

-- Test 5: Try to count user_profiles
SELECT 'Test 5: Count user profiles' as test_name,
       (SELECT COUNT(*) FROM user_profiles) as profile_count;

-- Test 6: Check if companies table exists
SELECT 'Test 6: Companies table exists' as test_name,
       EXISTS (
         SELECT 1 FROM information_schema.tables 
         WHERE table_schema = 'public' AND table_name = 'companies'
       ) as table_exists;

-- Test 7: Check if company_members table exists
SELECT 'Test 7: Company members table exists' as test_name,
       EXISTS (
         SELECT 1 FROM information_schema.tables 
         WHERE table_schema = 'public' AND table_name = 'company_members'
       ) as table_exists;

-- Test 8: Check if job_posts table exists
SELECT 'Test 8: Job posts table exists' as test_name,
       EXISTS (
         SELECT 1 FROM information_schema.tables 
         WHERE table_schema = 'public' AND table_name = 'job_posts'
       ) as table_exists;

-- Test 9: Check if missing_user_job_titles table exists
SELECT 'Test 9: Missing job titles table exists' as test_name,
       EXISTS (
         SELECT 1 FROM information_schema.tables 
         WHERE table_schema = 'public' AND table_name = 'missing_user_job_titles'
       ) as table_exists;

-- Test 10: Check RLS status on key tables
SELECT 'Test 10: RLS status' as test_name,
       (SELECT rowsecurity FROM pg_tables WHERE tablename = 'user_profiles') as user_profiles_rls,
       (SELECT rowsecurity FROM pg_tables WHERE tablename = 'companies') as companies_rls,
       (SELECT rowsecurity FROM pg_tables WHERE tablename = 'company_members') as company_members_rls;

-- Test 11: Check if we can read from user_profiles
SELECT 'Test 11: Can read user_profiles' as test_name,
       (SELECT COUNT(*) FROM user_profiles LIMIT 1) as can_read;

-- Test 12: Check if we can read from companies
SELECT 'Test 12: Can read companies' as test_name,
       (SELECT COUNT(*) FROM companies LIMIT 1) as can_read;

-- Test 13: Check if we can read from company_members
SELECT 'Test 13: Can read company_members' as test_name,
       (SELECT COUNT(*) FROM company_members LIMIT 1) as can_read;
