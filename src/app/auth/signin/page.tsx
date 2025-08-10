'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/context/AuthContext'
import AuthStat from '@/components/auth/AuthStat'
import SocialSignIn from '@/components/auth/SocialSignIn'
import { createClient } from '@/lib/supabase'

type UserType = 'jobseeker' | 'employer'

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard'
  const [activeTab, setActiveTab] = useState<UserType>('jobseeker')
  const { signIn, loading } = useAuth()
  const supabase = createClient()
  
  console.log('🔍 SignInContent: loading state:', loading)
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const testDirectSignIn = async () => {
    console.log('🧪 Testing direct Supabase sign-in...')
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'employer@test.com',
        password: 'password123'
      })
      console.log('📋 Direct sign-in result:', { data, error })
      if (data.user) {
        router.push('/employer/dashboard')
      }
    } catch (err) {
      console.error('❌ Direct sign-in failed:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    console.log('🔐 Starting sign-in process for:', activeTab)
    console.log('📧 Email:', formData.email)
    console.log('🔑 Password length:', formData.password.length)

    try {
      console.log('🔄 Calling signIn function...')
      await signIn(formData.email, formData.password, activeTab)
      console.log('✅ Sign-in successful, redirecting...')
      
      // Redirect immediately based on role
      if (activeTab === 'employer') {
        console.log('👔 Redirecting to employer dashboard')
        router.push('/employer/dashboard')
      } else {
        console.log('👤 Redirecting to job seeker dashboard')
        router.push('/dashboard')
      }
      
    } catch (error) {
      console.error('❌ Sign in error:', error)
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTabContent = () => {
    if (activeTab === 'jobseeker') {
      return {
        title: 'Future-Proof Your Career Path',
        subtitle: 'Connect with opportunities in fields resistant to AI automation',
        stats: [
          { value: '92%', label: 'Role Retention Rate in Our Recommended Careers', percentage: 92 },
          { value: '78%', label: 'Higher Satisfaction in Human-Centered Careers', percentage: 78 }
        ],
        formTitle: 'Welcome Back',
        formSubtitle: 'Sign in to access your future-proof career dashboard',
        signupText: "Don't have an account?",
        signupLink: "Sign up as a job seeker"
      }
    } else {
      return {
        title: 'Find Your Perfect AI-Resistant Talent',
        subtitle: 'Connect with professionals who excel in human-centered roles',
        stats: [
          { value: '85%', label: 'Higher Retention Rate for Human-Skill Focused Roles', percentage: 85 },
          { value: '94%', label: 'Employer Satisfaction with Our Matched Candidates', percentage: 94 }
        ],
        formTitle: 'Employer Sign In',
        formSubtitle: 'Access your hiring dashboard and find future-proof talent',
        signupText: "Don't have an employer account?",
        signupLink: "Sign up as an employer"
      }
    }
  }

  const content = getTabContent()

  return (
    <div className="flex max-w-6xl w-full bg-white rounded-xl overflow-hidden shadow-xl">
      {/* Left side - Stats and Image */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center p-8 text-white bg-gradient-to-br from-blue-900 to-blue-600 bg-blend-overlay bg-opacity-80 bg-center bg-cover" 
           style={{backgroundImage: "url('https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
        <h2 className="text-3xl font-bold mb-4 text-center">{content.title}</h2>
        <p className="text-lg max-w-md mb-8 text-center">{content.subtitle}</p>
        
        {content.stats.map((stat, index) => (
          <AuthStat 
            key={index}
            value={stat.value} 
            label={stat.label} 
            percentage={stat.percentage} 
          />
        ))}
      </div>
      
      {/* Right side - Form */}
      <div className="flex-1 p-6 md:p-12 flex flex-col justify-center">
        {/* Tab Navigation */}
        <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('jobseeker')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'jobseeker'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Job Seekers
            </div>
          </button>
          <button
            onClick={() => setActiveTab('employer')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'employer'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Employers
            </div>
          </button>
        </div>

        <h1 className="text-3xl font-bold text-blue-900 mb-3">{content.formTitle}</h1>
        <p className="text-gray-600 mb-8">{content.formSubtitle}</p>
        
        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <SocialSignIn userType={activeTab} />
        
        <div className="text-center mt-8 text-gray-600">
          <p>{content.signupText} <Link href={`/auth/signup?type=${activeTab}`} className="text-blue-600 font-medium hover:text-blue-800 transition-colors">{content.signupLink}</Link></p>
        </div>
        
        {/* Debug button for testing */}
        <div className="text-center mt-4">
          <button
            onClick={testDirectSignIn}
            className="text-sm text-gray-500 underline"
          >
            Test Direct Sign-In
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center py-8 px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <SignInContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
} 