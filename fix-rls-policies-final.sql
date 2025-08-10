-- Fix RLS Policies - Run this in Supabase SQL Editor
-- This will restore proper, secure RLS policies

-- 1. Drop all existing overly permissive policies
DROP POLICY IF EXISTS "companies_delete_policy" ON companies;
DROP POLICY IF EXISTS "companies_insert_policy" ON companies;
DROP POLICY IF EXISTS "companies_select_policy" ON companies;
DROP POLICY IF EXISTS "companies_update_policy" ON companies;

DROP POLICY IF EXISTS "company_members_delete_policy" ON company_members;
DROP POLICY IF EXISTS "company_members_insert_policy" ON company_members;
DROP POLICY IF EXISTS "company_members_select_policy" ON company_members;
DROP POLICY IF EXISTS "company_members_update_policy" ON company_members;

DROP POLICY IF EXISTS "job_posts_delete_policy" ON job_posts;
DROP POLICY IF EXISTS "job_posts_insert_policy" ON job_posts;
DROP POLICY IF EXISTS "job_posts_select_policy" ON job_posts;
DROP POLICY IF EXISTS "job_posts_update_policy" ON job_posts;

-- 2. Create proper RLS policies for companies table
CREATE POLICY "Company members can view companies" ON companies
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM company_members
      WHERE company_members.company_id = companies.id
      AND company_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owners can insert companies" ON companies
  FOR INSERT WITH CHECK (
    auth.uid() = created_by
  );

CREATE POLICY "Company owners can update companies" ON companies
  FOR UPDATE USING (
    auth.uid() = created_by
  );

CREATE POLICY "Company owners can delete companies" ON companies
  FOR DELETE USING (
    auth.uid() = created_by
  );

-- 3. Create proper RLS policies for company_members table
CREATE POLICY "Company members can view company members" ON company_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM company_members cm
      WHERE cm.company_id = company_members.company_id
      AND cm.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owners can manage company members" ON company_members
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM companies
      WHERE companies.id = company_members.company_id
      AND companies.created_by = auth.uid()
    )
  );

CREATE POLICY "Company owners can update company members" ON company_members
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM companies
      WHERE companies.id = company_members.company_id
      AND companies.created_by = auth.uid()
    )
  );

CREATE POLICY "Company owners can delete company members" ON company_members
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM companies
      WHERE companies.id = company_members.company_id
      AND companies.created_by = auth.uid()
    )
  );

-- 4. Create proper RLS policies for job_posts table
CREATE POLICY "Company members can view job posts" ON job_posts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM company_members
      WHERE company_members.company_id = job_posts.company_id
      AND company_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Company members can create job posts" ON job_posts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM company_members
      WHERE company_members.company_id = job_posts.company_id
      AND company_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Company members can update job posts" ON job_posts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM company_members
      WHERE company_members.company_id = job_posts.company_id
      AND company_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Company members can delete job posts" ON job_posts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM company_members
      WHERE company_members.company_id = job_posts.company_id
      AND company_members.user_id = auth.uid()
    )
  );

-- 5. Verify the policies were created
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
WHERE tablename IN ('companies', 'company_members', 'job_posts')
ORDER BY tablename, policyname;
