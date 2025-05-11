'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { isAuthenticated, signOut, User } from '@/lib/auth'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // This would be replaced with a real session check in a production app
    const checkAuth = async () => {
      try {
        if (!isAuthenticated()) {
          router.push('/auth/signin')
          return
        }
        
        // Mock user data - in a real app, this would come from your session
        setUser({
          id: '1',
          email: 'user@example.com', 
          name: 'Test User'
        })
      } catch (error) {
        console.error('Authentication error:', error)
        router.push('/auth/signin')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [router])
  
  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/signin')
  }
  
  if (loading) {
    return (
      <>
        <Header />
        <main className="flex flex-1 items-center justify-center min-h-screen py-12 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }
  
  return (
    <>
      <Header />
      <main className="flex-1 py-12 px-4 max-w-7xl mx-auto">
        <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-md mb-6">
            <p className="text-blue-800">
              Welcome back, {user?.name}! This is your future-proof career dashboard.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Your AI Resistance Score</h2>
              <p className="text-3xl font-bold text-green-500 mb-2">87%</p>
              <p className="text-gray-600 text-sm">Based on your skills and experience</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Recommended Jobs</h2>
              <p className="text-3xl font-bold text-blue-500 mb-2">24</p>
              <p className="text-gray-600 text-sm">New job matches this week</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Skills to Develop</h2>
              <p className="text-3xl font-bold text-purple-500 mb-2">3</p>
              <p className="text-gray-600 text-sm">Recommended skills to improve your profile</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Recent Job Matches</h2>
            <ul className="divide-y divide-gray-200">
              {[1, 2, 3].map((i) => (
                <li key={i} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Senior Human Experience Designer</h3>
                      <p className="text-gray-600">Futureproof Technologies Inc.</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      95% Match
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Posted 2 days ago • Remote • $120K - $150K
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <Link
                href="/jobs"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                View all job matches
                <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Career Development</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <h3 className="font-medium">Complete Your Profile</h3>
                <div className="mt-2 bg-gray-200 h-2 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">70% complete</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-md">
                <h3 className="font-medium">Skill Assessment</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Take our comprehensive skill assessment to receive personalized recommendations.
                </p>
                <button className="mt-3 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                  Start Assessment
                </button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-md">
                <h3 className="font-medium">Career Path Planning</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Explore future-proof career paths based on your skills and interests.
                </p>
                <button className="mt-3 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                  Explore Paths
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 