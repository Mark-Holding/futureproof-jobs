'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase'

export default function TestSignIn() {
  const { signIn, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const supabase = createClient()

  const handleTestSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Testing sign-in...')
    
    try {
      console.log('🧪 Testing sign-in with:', { email, password })
      await signIn(email, password, 'employer')
      setMessage('✅ Sign-in successful!')
    } catch (error) {
      console.error('❌ Sign-in failed:', error)
      setMessage(`❌ Sign-in failed: ${error}`)
    }
  }

  const handleDirectSupabase = async () => {
    setMessage('Testing direct Supabase...')
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'employer@test.com',
        password: 'password123'
      })
      
      if (error) {
        setMessage(`❌ Direct Supabase error: ${error.message}`)
      } else {
        setMessage(`✅ Direct Supabase success: ${data.user?.email}`)
      }
    } catch (error) {
      setMessage(`❌ Direct Supabase exception: ${error}`)
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign-In Test</h1>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p><strong>AuthContext Loading:</strong> {loading ? 'true' : 'false'}</p>
        <p><strong>Message:</strong> {message}</p>
      </div>

      <form onSubmit={handleTestSignIn} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="test@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="password"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Test Sign-In
        </button>
      </form>

      <div className="mt-4">
        <button
          onClick={handleDirectSupabase}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Test Direct Supabase
        </button>
      </div>
    </div>
  )
} 