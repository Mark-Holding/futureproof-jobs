import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/employers/HeroSection'
import AdvantagesSection from '@/components/employers/AdvantagesSection'
import ResourcesSection from '@/components/employers/ResourcesSection'
import ProcessSection from '@/components/employers/ProcessSection'
import DashboardPreviewSection from '@/components/employers/DashboardPreviewSection'
import TestimonialsSection from '@/components/employers/TestimonialsSection'
import PricingSection from '@/components/employers/PricingSection'
import EmployerCTASection from '@/components/employers/EmployerCTASection'

export const metadata: Metadata = {
  title: 'For Employers | FutureProofJobs',
  description: 'Connect with candidates who possess the irreplaceable human skills your organization needs to thrive in the age of AI',
  keywords: 'employers, hiring, recruitment, AI-resistant jobs, human skills, future of work',
}

export default function EmployersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <AdvantagesSection />
      <ResourcesSection />
      <ProcessSection />
      <DashboardPreviewSection />
      <TestimonialsSection />
      <PricingSection />
      <EmployerCTASection />
      <Footer />
    </main>
  )
} 