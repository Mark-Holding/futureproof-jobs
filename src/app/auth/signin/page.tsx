'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SignInForm from '@/components/auth/SignInForm'
import AuthStat from '@/components/auth/AuthStat'
import SocialSignIn from '@/components/auth/SocialSignIn'
import { SignInFormValues } from '@/lib/auth'

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard'
  
  const handleSuccess = (values: SignInFormValues) => {
    // Redirect to the callback URL after successful login
    router.push(callbackUrl)
  }

  return (
    <div className="flex max-w-5xl w-full bg-white rounded-xl overflow-hidden shadow-xl">
      {/* Left side - Stats and Image */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center p-8 text-white bg-gradient-to-br from-blue-900 to-blue-600 bg-blend-overlay bg-opacity-80 bg-center bg-cover" 
           style={{backgroundImage: "url('https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
        <h2 className="text-3xl font-bold mb-4">Future-Proof Your Career Path</h2>
        <p className="text-lg max-w-md mb-8 text-center">Connect with opportunities in fields resistant to AI automation</p>
        
        <AuthStat 
          value="92%" 
          label="Role Retention Rate in Our Recommended Careers" 
          percentage={92} 
        />
        
        <AuthStat 
          value="78%" 
          label="Higher Satisfaction in Human-Centered Careers" 
          percentage={78} 
        />
      </div>
      
      {/* Right side - Form */}
      <div className="flex-1 p-6 md:p-12 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-3">Welcome Back</h1>
        <p className="text-gray-600 mb-8">Sign in to access your future-proof career dashboard</p>
        
        <SignInForm onSuccess={handleSuccess} />
        
        <SocialSignIn />
        
        <div className="text-center mt-8 text-gray-600">
          <p>Don't have an account? <Link href="/auth/signup" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">Sign up</Link></p>
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