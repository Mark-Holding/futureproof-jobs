'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, SignInFormValues, signIn } from '@/lib/auth'

interface SignInFormProps {
  onSuccess?: (values: SignInFormValues) => void
}

export default function SignInForm({ onSuccess }: SignInFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })
  
  const onSubmit = async (data: SignInFormValues) => {
    setIsSubmitting(true)
    setAuthError(null)
    
    try {
      // Call the signIn function from our auth library
      await signIn(data)
      
      // If onSuccess handler is provided, call it
      if (onSuccess) {
        onSuccess(data)
      } else {
        // Default behavior - redirect to dashboard
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      setAuthError('Invalid email or password. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {authError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-md text-sm">
          {authError}
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
      
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          className={`w-full px-3 py-2 border ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          placeholder="Enter your password"
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        
        <Link
          href="/auth/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          Forgot password?
        </Link>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          </span>
        ) : 'Sign In'}
      </button>
    </form>
  )
} 