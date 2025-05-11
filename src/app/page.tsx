import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Categories from '@/components/Categories'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Stats />
      <Categories />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
} 