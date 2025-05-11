'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, ForgotPasswordFormValues, resetPassword } from '@/lib/auth'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })
  
  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsSubmitting(true)
    
    try {
      // Call the resetPassword function from our auth library
      await resetPassword(data.email)
      
      // Show success state
      setIsSubmitted(true)
    } catch (error) {
      console.error('Password reset error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Forgot Password</h1>
          
          {isSubmitted ? (
            <div className="mt-8">
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800">
                  Password reset instructions have been sent to your email.
                </p>
              </div>
              <p className="text-gray-600 mb-6">
                Please check your inbox and follow the instructions to reset your password.
                If you don't receive an email within a few minutes, check your spam folder.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/auth/signin"
                  className="text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-8">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                    className={`w-full px-3 py-2 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Enter your email address"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Reset Password'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
} 