import { z } from 'zod'

// Form validation schemas
export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional()
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address')
})

// TypeScript types derived from schemas
export type SignInFormValues = z.infer<typeof signInSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

// Mock authentication API functions
// In a real app, these would connect to your backend or auth provider
export async function signIn({ email, password, rememberMe }: SignInFormValues) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // This is just a mock implementation - replace with actual auth logic
  // You would typically use NextAuth.js or a similar library
  if (email === 'user@example.com' && password === 'password123') {
    // Store token in localStorage or cookies based on rememberMe
    if (rememberMe) {
      localStorage.setItem('authToken', 'mock-jwt-token')
    } else {
      sessionStorage.setItem('authToken', 'mock-jwt-token')
    }
    return { success: true, user: { id: '1', email, name: 'Test User' } }
  }
  
  throw new Error('Invalid email or password')
}

export async function signOut() {
  // Clear auth token from storage
  localStorage.removeItem('authToken')
  sessionStorage.removeItem('authToken')
  
  // In a real app, you would also invalidate the token on the server
  return { success: true }
}

export async function resetPassword(email: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // In a real app, this would send a password reset link via email
  console.log(`Password reset requested for: ${email}`)
  return { success: true }
}

export function isAuthenticated() {
  // Check if user has valid auth token
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
  return !!token
}

// NextAuth.js type-safe authentication
// This section would be expanded in a real implementation using NextAuth.js
export type User = {
  id: string
  email: string
  name: string
}

export type Session = {
  user: User
  expires: string
} 