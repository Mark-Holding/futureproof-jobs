import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware handles authentication and role-based access control
export function middleware(request: NextRequest) {
  console.log('🔍 Middleware - ALLOWING ALL REQUESTS (temporarily disabled)')
  return NextResponse.next()
  
  // Temporarily disabled all middleware logic for debugging
  /*
  // Check for Supabase auth cookies
  const supabaseAccessToken = request.cookies.get('sb-access-token')?.value
  const supabaseRefreshToken = request.cookies.get('sb-refresh-token')?.value
  const hasAuthToken = !!(supabaseAccessToken || supabaseRefreshToken)
  
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth/')
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard')
  const isEmployerDashboardPage = request.nextUrl.pathname.startsWith('/employer/dashboard')
  
  console.log('🔍 Middleware:', {
    pathname: request.nextUrl.pathname,
    hasAuthToken,
    supabaseAccessToken: !!supabaseAccessToken,
    supabaseRefreshToken: !!supabaseRefreshToken,
    isAuthPage,
    isDashboardPage,
    isEmployerDashboardPage
  })
  
  // If user is not authenticated and trying to access protected routes
  if (!hasAuthToken && (isDashboardPage || isEmployerDashboardPage)) {
    console.log('🚫 Redirecting unauthenticated user to sign in')
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }
  
  // Temporarily allow all auth page access to debug routing
  // if (hasAuthToken && isAuthPage) {
  //   console.log('🔄 Redirecting authenticated user away from auth page')
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }
  
  // Allow all other requests to proceed normally
  console.log('✅ Allowing request to proceed')
  return NextResponse.next()
  */
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/employer/dashboard/:path*', '/auth/:path*'],
} 