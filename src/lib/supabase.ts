import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase environment variables are not set!')
    console.error('Please create a .env.local file with:')
    console.error('NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url')
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
    throw new Error('Supabase environment variables are not configured')
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  )
} 