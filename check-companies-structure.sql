-- Check Companies Table Structure - Run this in Supabase SQL Editor
-- This will show us what columns actually exist

SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'companies'
ORDER BY ordinal_position;
