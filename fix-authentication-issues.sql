-- Fix Authentication Issues - Run this in Supabase SQL Editor
-- This will restore basic authentication functionality

-- 1. First, let's make sure the auth schema is accessible
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO anon;

-- 2. Grant basic permissions on auth.users (this is critical for login)
GRANT SELECT ON auth.users TO authenticated;
GRANT SELECT ON auth.users TO anon;

-- 3. Make sure user_profiles table is accessible
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON user_profiles TO anon;

-- 4. Check if we need to recreate the user_profiles trigger
-- This trigger is essential for creating user profiles when users sign up
DO $$
BEGIN
  -- Drop the trigger if it exists
  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  
  -- Create the trigger function if it doesn't exist
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS trigger AS $$
  BEGIN
    INSERT INTO public.user_profiles (id, email, role, first_name, last_name, company_name, job_title)
    VALUES (
      new.id,
      new.email,
      'jobseeker', -- default role
      '', -- empty first_name
      '', -- empty last_name
      '', -- empty company_name
      ''  -- empty job_title
    );
    RETURN new;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  -- Create the trigger
  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    
  RAISE NOTICE 'User profile trigger recreated successfully';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error recreating trigger: %', SQLERRM;
END $$;

-- 5. Make sure the user_profiles table has the right structure
-- Add any missing columns that might be needed
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 6. Create a simple RLS policy for user_profiles that allows basic access
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 7. Make sure RLS is enabled on user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 8. Grant basic permissions on companies and company_members
GRANT ALL ON companies TO authenticated;
GRANT ALL ON company_members TO authenticated;

-- 9. Create simple RLS policies for companies and company_members
-- Companies table
DROP POLICY IF EXISTS "Company members can view companies" ON companies;
CREATE POLICY "Company members can view companies" ON companies
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM company_members 
      WHERE company_members.company_id = companies.id 
      AND company_members.user_id = auth.uid()
    )
  );

-- Company members table  
DROP POLICY IF EXISTS "Users can view company members" ON company_members;
CREATE POLICY "Users can view company members" ON company_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM company_members cm
      WHERE cm.company_id = company_members.company_id 
      AND cm.user_id = auth.uid()
    )
  );

-- 10. Enable RLS on these tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_members ENABLE ROW LEVEL SECURITY;

-- 11. Check if there are any existing users that need profiles
INSERT INTO user_profiles (id, email, role, first_name, last_name, company_name, job_title)
SELECT 
  u.id,
  u.email,
  'jobseeker',
  '',
  '',
  '',
  ''
FROM auth.users u
LEFT JOIN user_profiles up ON u.id = up.id
WHERE up.id IS NULL;

-- 12. Verify the fix
SELECT 
  'auth.users count' as table_name,
  COUNT(*) as record_count
FROM auth.users
UNION ALL
SELECT 
  'user_profiles count' as table_name,
  COUNT(*) as record_count
FROM user_profiles;
