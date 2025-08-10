'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type UserRole = 'employer' | 'jobseeker' | null

interface AuthContextType {
  user: User | null
  session: Session | null
  userRole: UserRole
  loading: boolean
  signIn: (email: string, password: string, role: UserRole) => Promise<void>
  signUp: (email: string, password: string, role: UserRole) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  // Function to fetch user role from database
  const fetchUserRole = async (userId: string): Promise<UserRole | null> => {
    try {
      console.log('🔍 AuthContext: Fetching role for user:', userId)
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', userId)
        .single()

      console.log('📋 Role fetch result:', { data, error })

      if (error) {
        console.error('❌ Error fetching user role:', error)
        return null
      }

      const role = data?.role as UserRole
      console.log('✅ User role fetched:', role)
      return role || null
    } catch (error) {
      console.error('❌ Exception fetching user role:', error)
      return null
    }
  }

  useEffect(() => {
    console.log('🔄 AuthContext: Initializing auth state...')
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('🔍 AuthContext: Getting initial session...')
        const { data: { session } } = await supabase.auth.getSession()
        console.log('📋 AuthContext: Initial session:', session?.user?.email)
        
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          console.log('👤 AuthContext: Fetching user role...')
          const role = await fetchUserRole(session.user.id)
          setUserRole(role)
          console.log('🎭 AuthContext: User role set to:', role)
        }
        
        console.log('✅ AuthContext: Setting loading to false')
        setLoading(false)
        setInitialLoad(false)
      } catch (error) {
        console.error('❌ AuthContext: Error getting initial session:', error)
        setLoading(false)
        setInitialLoad(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 AuthContext: Auth state changed:', event, session?.user?.email)
        
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          console.log('👤 AuthContext: Fetching role for auth change...')
          const role = await fetchUserRole(session.user.id)
          setUserRole(role)
          console.log('🎭 AuthContext: Role set to:', role)
        } else {
          setUserRole(null)
        }
        
        setLoading(false)
        console.log('✅ AuthContext: Loading set to false')
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth]) // Removed router and initialLoad from dependencies

  const signIn = async (email: string, password: string, role: UserRole) => {
    console.log('🔐 AuthContext signIn called with:', { email, role })
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      console.log('📋 Supabase auth response:', { data, error })
      
      if (error) {
        console.error('❌ Supabase auth error:', error)
        throw error
      }
      
      console.log('✅ Supabase auth successful:', data.user?.email)
    } catch (error) {
      console.error('❌ AuthContext signIn error:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, role: UserRole) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role,
        },
      },
    })
    
    if (error) throw error
  }

  const signOut = async () => {
    console.log('🚪 AuthContext signOut called')
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('❌ Sign out error:', error)
        throw error
      }
      console.log('✅ Sign out successful')
      
      // Clear local state
      setUser(null)
      setSession(null)
      setUserRole(null)
      
      // Force page reload to clear all state
      window.location.href = '/'
    } catch (error) {
      console.error('❌ Sign out error:', error)
      throw error
    }
  }

  // Debug logging for authentication state
  console.log('🔍 AuthContext Debug:', {
    user: user?.email,
    userId: user?.id,
    userRole,
    loading,
    sessionExists: !!session,
    sessionUser: session?.user?.email
  })

  const value = {
    user,
    session,
    userRole,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 