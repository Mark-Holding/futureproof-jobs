#!/usr/bin/env node

/**
 * Database Connection Test Script
 * Run this to diagnose Supabase connection issues
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Testing AI Resistance Database Connection...\n');

// Check environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('📋 Environment Variables:');
console.log('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? `SET (${supabaseUrl.length} chars)` : '❌ NOT SET');
console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? `SET (${supabaseAnonKey.length} chars)` : '❌ NOT SET');

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('\n❌ Missing environment variables!');
  console.log('\n📝 To fix this:');
  console.log('1. Create a .env.local file in your project root');
  console.log('2. Add your Supabase credentials:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here');
  console.log('\n3. Get your credentials from: https://supabase.com/dashboard/project/[your-project]/settings/api');
  console.log('\n4. Restart your development server after adding the .env.local file');
  process.exit(1);
}

// Test Supabase connection
async function testConnection() {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    console.log('\n🔗 Testing Supabase connection...');
    
    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from('occupations')
      .select('soc_code')
      .limit(1);
    
    if (testError) {
      console.log('❌ Connection failed:', testError.message);
      
      if (testError.message.includes('relation "occupations" does not exist')) {
        console.log('\n📊 Database tables not found!');
        console.log('To fix this:');
        console.log('1. Go to your Supabase dashboard');
        console.log('2. Open the SQL Editor');
        console.log('3. Run the SQL from supabase-schema.sql');
        console.log('4. Import your data using data-import.js');
      }
      
      return;
    }
    
    console.log('✅ Basic connection successful');
    
    // Test table counts
    const { count: occupationCount } = await supabase
      .from('occupations')
      .select('*', { count: 'exact', head: true });
    
    const { count: alternateCount } = await supabase
      .from('alternate_titles')
      .select('*', { count: 'exact', head: true });
    
    console.log('\n📊 Database Status:');
    console.log(`- Occupations: ${occupationCount || 0} records`);
    console.log(`- Alternate Titles: ${alternateCount || 0} records`);
    
    if ((occupationCount || 0) === 0) {
      console.log('\n⚠️  No occupation data found!');
      console.log('You need to import your O*NET data:');
      console.log('1. Run: node data-import.js');
      console.log('2. Make sure your Excel files are in the data/ folder');
    }
    
    console.log('\n✅ Database connection test completed successfully!');
    
  } catch (error) {
    console.log('❌ Connection test failed:', error.message);
    console.log('\nPossible issues:');
    console.log('- Invalid Supabase URL or key');
    console.log('- Network connectivity issues');
    console.log('- Supabase project is paused or deleted');
  }
}

testConnection(); 