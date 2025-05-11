import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - FutureProof Jobs',
  description: 'Sign in or create an account for FutureProof Jobs - Connect with opportunities in fields resistant to AI automation',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
    </div>
  )
} 