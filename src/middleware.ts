import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a simplified middleware that checks for auth token
// In a real app, you would verify the token's validity
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth/')
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard')
  
  // If user is not authenticated and trying to access protected routes
  if (!authToken && isDashboardPage) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }
  
  // If user is authenticated and trying to access auth pages
  if (authToken && isAuthPage) {
    // Redirect to dashboard or requested callback URL
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl')
    const redirectUrl = callbackUrl ? callbackUrl : '/dashboard'
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }
  
  return NextResponse.next()
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
} 