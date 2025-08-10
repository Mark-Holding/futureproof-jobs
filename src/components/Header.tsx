'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const pathname = usePathname();
  const { user, userRole, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      console.log('🚪 Header: Sign out button clicked')
      await signOut();
      console.log('✅ Header: Sign out successful')
    } catch (error) {
      console.error('❌ Header: Sign out error:', error);
      
      // Check if it's a Supabase configuration error
      if (error instanceof Error && error.message.includes('Supabase environment variables')) {
        alert('Authentication is not configured. Please set up Supabase environment variables.');
      } else {
        alert('Failed to sign out. Please try again.');
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-900 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center text-2xl font-bold text-white">
            Future<span className="text-green-400">Proof</span>Jobs
          </Link>
          
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link 
                  href="/jobs" 
                  className={`text-white hover:text-green-400 font-medium transition-colors ${
                    pathname.startsWith('/jobs') ? 'text-green-400' : ''
                  }`}
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link 
                  href="/ai-resistance-index" 
                  className={`text-white hover:text-green-400 font-medium transition-colors ${
                    pathname.startsWith('/ai-resistance-index') ? 'text-green-400' : ''
                  }`}
                >
                  AI Resistance Index
                </Link>
              </li>
              <li>
                <Link 
                  href="/career-paths" 
                  className={`text-white hover:text-green-400 font-medium transition-colors ${
                    pathname.startsWith('/career-paths') ? 'text-green-400' : ''
                  }`}
                >
                  Career Paths
                </Link>
              </li>
              <li>
                <Link 
                  href="/employers" 
                  className={`text-white hover:text-green-400 font-medium transition-colors ${
                    pathname.startsWith('/employers') ? 'text-green-400' : ''
                  }`}
                >
                  For Employers
                </Link>
              </li>
              
              {/* Role-based dashboard links */}
              {user && userRole === 'employer' && (
                <li>
                  <Link 
                    href="/employer/dashboard" 
                    className={`text-white hover:text-green-400 font-medium transition-colors ${
                      pathname.startsWith('/employer/dashboard') ? 'text-green-400' : ''
                    }`}
                  >
                    Employer Dashboard
                  </Link>
                </li>
              )}
              
              {user && userRole === 'jobseeker' && (
                <li>
                  <Link 
                    href="/dashboard" 
                    className={`text-white hover:text-green-400 font-medium transition-colors ${
                      pathname.startsWith('/dashboard') ? 'text-green-400' : ''
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              
              {/* Auth links */}
              {user ? (
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-white hover:text-green-400 font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <li>
                  <Link 
                    href="/auth/signin" 
                    className={`text-white hover:text-green-400 font-medium transition-colors ${
                      pathname.startsWith('/auth/signin') ? 'text-green-400' : ''
                    }`}
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
} 