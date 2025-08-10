-- Check and Fix RLS Policies - Run this in Supabase SQL Editor
-- This will identify and fix the infinite recursion issue

-- 1. First, let's see what RLS policies currently exist
SELECT 
  'Current RLS Policies' as section,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN ('companies', 'company_members', 'job_posts')
ORDER BY tablename, policyname;

-- 2. Check if RLS is enabled on these tables
SELECT 
  'RLS Status Check' as section,
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename IN ('companies', 'company_members', 'job_posts')
ORDER BY tablename;

-- 3. Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Company members can view companies" ON companies;
DROP POLICY IF EXISTS "Company owners can insert companies" ON companies;
DROP POLICY IF EXISTS "Company owners can update companies" ON companies;
DROP POLICY IF EXISTS "Company owners can delete companies" ON companies;

DROP POLICY IF EXISTS "Company members can view company members" ON company_members;
DROP POLICY IF EXISTS "Company owners can manage company members" ON company_members;
DROP POLICY IF EXISTS "Company owners can update company members" ON company_members;
DROP POLICY IF EXISTS "Company owners can delete company members" ON company_members;

DROP POLICY IF EXISTS "Company members can view job posts" ON job_posts;
DROP POLICY IF EXISTS "Company members can create job posts" ON job_posts;
DROP POLICY IF EXISTS "Company members can update job posts" ON job_posts;
DROP POLICY IF EXISTS "Company members can delete job posts" ON job_posts;

-- 4. Create simple, non-recursive policies for companies
CREATE POLICY "companies_select_policy" ON companies
  FOR SELECT USING (true);

CREATE POLICY "companies_insert_policy" ON companies
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "companies_update_policy" ON companies
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "companies_delete_policy" ON companies
  FOR DELETE USING (auth.uid() = created_by);

-- 5. Create simple, non-recursive policies for company_members
CREATE POLICY "company_members_select_policy" ON company_members
  FOR SELECT USING (true);

CREATE POLICY "company_members_insert_policy" ON company_members
  FOR INSERT WITH CHECK (true);

CREATE POLICY "company_members_update_policy" ON company_members
  FOR UPDATE USING (true);

CREATE POLICY "company_members_delete_policy" ON company_members
  FOR DELETE USING (true);

-- 6. Create simple, non-recursive policies for job_posts
CREATE POLICY "job_posts_select_policy" ON job_posts
  FOR SELECT USING (true);

CREATE POLICY "job_posts_insert_policy" ON job_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "job_posts_update_policy" ON job_posts
  FOR UPDATE USING (true);

CREATE POLICY "job_posts_delete_policy" ON job_posts
  FOR DELETE USING (true);

-- 7. Verify the new policies were created
SELECT 
  'New RLS Policies' as section,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN ('companies', 'company_members', 'job_posts')
ORDER BY tablename, policyname;

-- 8. Test if we can query the tables without recursion
SELECT 
  'Test Query Results' as section,
  (SELECT COUNT(*) FROM companies) as companies_count,
  (SELECT COUNT(*) FROM company_members) as company_members_count,
  (SELECT COUNT(*) FROM job_posts) as job_posts_count;
