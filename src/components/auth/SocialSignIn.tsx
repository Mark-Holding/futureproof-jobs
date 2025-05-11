'use client'

import React from 'react'

interface SocialSignInProps {
  onSocialSignIn?: (provider: 'google' | 'linkedin') => void
}

export default function SocialSignIn({ onSocialSignIn }: SocialSignInProps = {}) {
  const handleSocialSignIn = (provider: 'google' | 'linkedin') => {
    if (onSocialSignIn) {
      onSocialSignIn(provider)
    } else {
      // Default implementation for social sign-in
      console.log(`Sign in with ${provider}`)
      // In a real implementation, this would integrate with an auth provider
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-center mb-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">Or sign in with</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
          onClick={() => handleSocialSignIn('google')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#EA4335">
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0647 7.05C9.5063 7.05 8.0782 7.75 7.1642 9.107C6.2502 10.465 6.0022 12.142 6.4842 13.684C6.9842 15.249 8.0642 16.54 9.7982 16.898C9.7202 16.402 9.6972 16.18 9.5502 15.582L8.9702 13.084C8.7762 13.302 8.2382 13.744 7.5002 13.744C5.7722 13.744 4.5002 12.027 4.5002 10.084C4.5002 7.622 6.3 5.604 8.5302 5.604C10.294 5.604 12.064 6.784 12.064 9.02C12.064 10.844 11.16 12.764 9.8542 12.764C9.0902 12.764 8.5442 12.156 8.7082 11.38L9.2462 9.126C9.3842 8.487 9.5462 7.873 9.5462 7.436C9.5462 6.915 9.2382 6.487 8.6402 6.487C7.9042 6.487 7.3102 7.31 7.3102 8.357C7.3102 8.964 7.5002 9.378 7.5002 9.378C7.5002 9.378 6.6762 13.178 6.5382 13.744C6.4182 14.229 6.3862 14.854 6.3882 15.447C4.0142 14.26 2.5002 11.654 2.5002 9C2.5002 5.13401 5.63421 2 9.5002 2C13.3662 2 16.5002 5.13401 16.5002 9C16.5002 11.806 14.7642 14.525 12.1682 15.647C12.1742 15.178 12.0622 14.617 11.8702 14.102C11.8702 14.102 11.4242 12.125 11.4242 12.089C11.8442 11.5 12.658 10.62 12.658 9.102C12.658 7.169 11.302 5.05 8.5702 5.05C6.1542 5.05 4.0002 7.071 4.0002 10.084C4.0002 12.471 5.4242 14.339 7.5002 14.339C8.7282 14.339 9.4662 13.615 9.4662 13.615L10.0462 16.113C10.1582 16.551 10.3402 16.98 10.5522 17.358C10.0342 17.44 9.53021 17.5 9.0002 17.5C5.13421 17.5 2.0002 14.366 2.0002 10.5C2.0002 6.63401 5.13421 3.5 9.0002 3.5C12.8662 3.5 16.0002 6.63401 16.0002 10.5C16.0002 14.366 12.8662 17.5 9.0002 17.5C8.4402 17.5 7.8942 17.449 7.3662 17.35C8.0862 17.783 8.9162 18 9.7982 18C12.3642 18 14.6262 16.13 15.2502 13.636C15.4242 12.868 15.5002 12.067 15.5002 11.25C15.5002 8.19 13.0702 6.05 11.0647 7.05Z"/>
          </svg>
          <span className="font-medium text-gray-700">Google</span>
        </button>
        
        <button 
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
          onClick={() => handleSocialSignIn('linkedin')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
          </svg>
          <span className="font-medium text-gray-700">LinkedIn</span>
        </button>
      </div>
    </div>
  )
} 