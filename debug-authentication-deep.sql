-- Deep Authentication Debug - Run this in Supabase SQL Editor
-- This will help identify what's blocking the login process

-- 1. Check if the user profile trigger exists and works
SELECT 
  'User Profile Trigger Check' as test_name,
  EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'on_auth_user_created'
  ) as trigger_exists;

-- 2. Check if the trigger function exists
SELECT 
  'Trigger Function Check' as test_name,
  EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'handle_new_user'
  ) as function_exists;

-- 3. Check if there are any broken user profiles
SELECT 
  'Broken User Profiles Check' as test_name,
  COUNT(*) as broken_profiles
FROM auth.users u
LEFT JOIN user_profiles up ON u.id = up.id
WHERE up.id IS NULL;

-- 4. Check if user_profiles have the right structure
SELECT 
  'User Profiles Structure Check' as test_name,
  COUNT(*) as total_profiles,
  COUNT(CASE WHEN role IS NOT NULL THEN 1 END) as profiles_with_role,
  COUNT(CASE WHEN company_name IS NOT NULL THEN 1 END) as profiles_with_company
FROM user_profiles;

-- 5. Check if the auth.users table has any issues
SELECT 
  'Auth Users Check' as test_name,
  COUNT(*) as total_users,
  COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as confirmed_users,
  COUNT(CASE WHEN last_sign_in_at IS NOT NULL THEN 1 END) as users_with_signins
FROM auth.users;

-- 6. Check if there are any RLS policy conflicts on user_profiles
SELECT 
  'User Profiles RLS Check' as test_name,
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'user_profiles'
ORDER BY policyname;

-- 7. Test if we can read from user_profiles as authenticated user
-- This simulates what happens during login
SELECT 
  'Can Read User Profiles Test' as test_name,
  (SELECT COUNT(*) FROM user_profiles LIMIT 1) as can_read_count;

-- 8. Check if there are any database locks or blocking processes
SELECT 
  'Database Locks Check' as test_name,
  COUNT(*) as active_locks
FROM pg_locks
WHERE NOT granted;

-- 9. Check if the auth schema has all required permissions
SELECT 
  'Auth Schema Permissions Check' as test_name,
  has_schema_privilege('authenticated', 'auth', 'USAGE') as auth_schema_accessible,
  has_schema_privilege('authenticated', 'auth', 'CREATE') as auth_schema_create,
  has_schema_privilege('anon', 'auth', 'USAGE') as anon_auth_accessible;

-- 10. Check if there are any broken foreign key references
SELECT 
  'Foreign Key Check' as test_name,
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
AND tc.table_name IN ('user_profiles', 'companies', 'company_members')
AND tc.constraint_name NOT IN (
  SELECT constraint_name FROM information_schema.referential_constraints
  WHERE delete_rule = 'CASCADE' OR update_rule = 'CASCADE'
);

-- 11. Check if there are any missing indexes that could cause performance issues
SELECT 
  'Missing Indexes Check' as test_name,
  schemaname,
  tablename,
  indexname
FROM pg_indexes
WHERE tablename IN ('user_profiles', 'companies', 'company_members', 'auth.users')
AND indexname IS NOT NULL
ORDER BY tablename, indexname;
