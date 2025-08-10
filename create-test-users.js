// create-test-users.js
// Script to create test user accounts for Supabase Auth
// Run with: node create-test-users.js

require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for admin operations

console.log('🔍 Debugging environment variables...');
console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'SET (' + supabaseUrl.length + ' chars)' : 'NOT SET');
console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'SET (' + supabaseServiceKey.length + ' chars)' : 'NOT SET');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!');
  console.error('Please ensure you have set in .env.local:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nCurrent values:');
  console.error('URL:', supabaseUrl || 'NOT SET');
  console.error('Service Key:', supabaseServiceKey ? 'SET' : 'NOT SET');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTestUsers() {
  console.log('🔧 Creating test users...');

  try {
    // Check if users already exist
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingEmails = existingUsers.users.map(user => user.email);

    // Create employer test account
    if (!existingEmails.includes('employer@test.com')) {
      const { data: employerData, error: employerError } = await supabase.auth.admin.createUser({
        email: 'employer@test.com',
        password: 'password123',
        email_confirm: true,
        user_metadata: {
          role: 'employer'
        }
      });

      if (employerError) {
        console.error('❌ Error creating employer account:', employerError.message);
      } else {
        console.log('✅ Employer account created:', employerData.user.email);
      }
    } else {
      console.log('ℹ️  Employer account already exists');
    }

    // Create jobseeker test account
    if (!existingEmails.includes('jobseeker@test.com')) {
      const { data: jobseekerData, error: jobseekerError } = await supabase.auth.admin.createUser({
        email: 'jobseeker@test.com',
        password: 'password123',
        email_confirm: true,
        user_metadata: {
          role: 'jobseeker'
        }
      });

      if (jobseekerError) {
        console.error('❌ Error creating jobseeker account:', jobseekerError.message);
      } else {
        console.log('✅ Jobseeker account created:', jobseekerData.user.email);
      }
    } else {
      console.log('ℹ️  Jobseeker account already exists');
    }

    console.log('\n🎉 Test accounts setup complete!');
    console.log('\n📋 Test Credentials:');
    console.log('👔 Employer: employer@test.com / password123');
    console.log('👤 Job Seeker: jobseeker@test.com / password123');
    console.log('\n💡 You can now test the authentication system with these accounts.');

  } catch (error) {
    console.error('❌ Error creating test users:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Make sure you have the correct SUPABASE_SERVICE_ROLE_KEY');
    console.error('2. Ensure your Supabase project is active');
    console.error('3. Check that the auth schema is properly set up');
  }
}

createTestUsers(); 