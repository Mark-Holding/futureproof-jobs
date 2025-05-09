'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname();

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
                  href="/careers" 
                  className={`text-white hover:text-green-400 font-medium transition-colors ${
                    pathname.startsWith('/careers') ? 'text-green-400' : ''
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
              <li>
                <Link 
                  href="/signin" 
                  className={`text-white hover:text-green-400 font-medium transition-colors ${
                    pathname.startsWith('/signin') ? 'text-green-400' : ''
                  }`}
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
} 