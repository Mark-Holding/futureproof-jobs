'use client'

import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase'

export default function TestAuthPage() {
  const { user, userRole, loading, signOut } = useAuth()
  const supabase = createClient()

  const testAuth = async () => {
    console.log('🧪 Testing authentication...')
    
    // Test current session
    const { data: { session } } = await supabase.auth.getSession()
    console.log('📋 Current session:', session)
    
    // Test user profiles table
    if (session?.user) {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      
      console.log('👤 User profile:', profile)
      console.log('❌ Profile error:', error)
    }
  }

  const testSupabaseConnection = async () => {
    console.log('🔌 Testing Supabase connection...')
    console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Anon Key length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length)
    console.log('Anon Key preview:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...')
    
    try {
      // Test a simple query to see if connection works
      const { data, error } = await supabase
        .from('user_profiles')
        .select('count')
        .limit(1)
      
      console.log('📊 Connection test result:', { data, error })
    } catch (err) {
      console.error('❌ Connection test failed:', err)
    }
  }

  const testSignIn = async () => {
    console.log('🔐 Testing sign-in...')
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'employer@test.com',
        password: 'password123'
      })
      console.log('📋 Sign-in test result:', { data, error })
    } catch (err) {
      console.error('❌ Sign-in test failed:', err)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Current State:</h2>
          <p>Loading: {loading ? 'Yes' : 'No'}</p>
          <p>User: {user ? user.email : 'None'}</p>
          <p>Role: {userRole || 'None'}</p>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Actions:</h2>
          <button 
            onClick={testSupabaseConnection}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Test Connection
          </button>
          <button 
            onClick={testSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Test Sign In
          </button>
          <button 
            onClick={testAuth}
            className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
          >
            Test Auth
          </button>
          <button 
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Navigation:</h2>
          <a href="/dashboard" className="text-blue-500 underline mr-4">Job Seeker Dashboard</a>
          <a href="/employer/dashboard" className="text-blue-500 underline">Employer Dashboard</a>
        </div>
      </div>
    </div>
  )
} 