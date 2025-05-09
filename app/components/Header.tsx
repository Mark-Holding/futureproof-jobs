'use client'

import Link from 'next/link'

export default function Header() {
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
                <Link href="/jobs" className="text-white hover:text-green-400 font-medium transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/ai-index" className="text-white hover:text-green-400 font-medium transition-colors">
                  AI Resistance Index
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white hover:text-green-400 font-medium transition-colors">
                  Career Paths
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-white hover:text-green-400 font-medium transition-colors">
                  For Employers
                </Link>
              </li>
              <li>
                <Link href="/signin" className="text-white hover:text-green-400 font-medium transition-colors">
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