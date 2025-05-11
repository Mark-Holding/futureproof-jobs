'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckIcon } from './Icons'

// Define the tier type
interface PricingTier {
  type: 'standard' | 'premium' | 'enterprise';
  title: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

// Pricing card component for reusability
const PricingCard = ({ tier, isSubscription = false }: { tier: PricingTier, isSubscription?: boolean }) => {
  // Determine header color class based on tier.type
  const headerColorClass = 
    tier.type === 'standard' ? 'bg-blue-100' :
    tier.type === 'premium' ? 'bg-blue-200' :
    'bg-blue-300';
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
      <div className={`p-6 text-center ${headerColorClass}`}>
        <h3 className="text-xl font-bold text-blue-900 mb-2">{tier.title}</h3>
        <div className="text-3xl font-bold text-blue-900">
          {tier.price}<span className="text-base font-normal text-blue-700">/{tier.unit}</span>
        </div>
        <p className="text-gray-600 mt-2">{tier.description}</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-3">
          {tier.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <CheckIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="ml-3 text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <Link 
          href={tier.ctaLink}
          className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors w-full"
        >
          {tier.ctaText}
        </Link>
      </div>
    </div>
  )
}

export default function PricingSection() {
  const [pricingType, setPricingType] = useState('individual')
  
  const individualTiers: PricingTier[] = [
    {
      type: 'standard',
      title: 'Standard Listing',
      price: '$299',
      unit: 'post',
      description: 'Perfect for individual human-centered roles',
      features: [
        '30-day job posting',
        'AI Resistance Score verification',
        'Basic candidate matching',
        'Email application notifications'
      ],
      ctaText: 'Post a Job',
      ctaLink: '/post-job/standard'
    },
    {
      type: 'premium',
      title: 'Premium Listing',
      price: '$599',
      unit: 'post',
      description: 'Enhanced visibility and candidate quality',
      features: [
        '60-day featured job posting',
        'Enhanced visibility to matching candidates',
        'Detailed human skill requirements assessment',
        'Candidate pre-screening for human capabilities',
        'Priority placement in search results'
      ],
      ctaText: 'Post a Premium Job',
      ctaLink: '/post-job/premium'
    },
    {
      type: 'enterprise',
      title: 'Advanced Listing',
      price: '$999',
      unit: 'post',
      description: 'Maximum exposure for critical human-centered roles',
      features: [
        '90-day featured job posting',
        'Homepage featured placement',
        'AI-enhanced job description optimization',
        'Video interview screening',
        'Human skills assessment report for all applicants'
      ],
      ctaText: 'Post Advanced Job',
      ctaLink: '/post-job/advanced'
    }
  ]
  
  const subscriptionTiers: PricingTier[] = [
    {
      type: 'standard',
      title: 'Starter',
      price: '$799',
      unit: 'month',
      description: 'Perfect for small organizations',
      features: [
        '3 active job postings',
        'AI Resistance scoring for all listings',
        'Basic analytics dashboard',
        '5 resume database searches per month',
        'Email support'
      ],
      ctaText: 'Start Monthly Plan',
      ctaLink: '/subscribe/starter'
    },
    {
      type: 'premium',
      title: 'Professional',
      price: '$1,999',
      unit: 'month',
      description: 'For growing organizations with regular hiring needs',
      features: [
        '10 active job postings',
        'Premium placement for all listings',
        'Advanced analytics dashboard',
        '25 resume database searches per month',
        'Human-AI workforce analysis report',
        'Priority email and phone support'
      ],
      ctaText: 'Start Professional Plan',
      ctaLink: '/subscribe/professional'
    },
    {
      type: 'enterprise',
      title: 'Enterprise',
      price: '$4,999',
      unit: 'month',
      description: 'Complete workforce automation resilience strategy',
      features: [
        'Unlimited job postings',
        'Featured placement for all listings',
        'Complete enterprise analytics suite',
        'Unlimited resume database searches',
        'Quarterly workforce automation audit',
        'Strategic human-AI integration planning',
        'Dedicated account manager'
      ],
      ctaText: 'Start Enterprise Plan',
      ctaLink: '/subscribe/enterprise'
    }
  ]

  const faqs = [
    {
      question: "What's the difference between per-post and subscription pricing?",
      answer: "Per-post pricing is ideal for organizations with occasional hiring needs, while subscription plans are more cost-effective for companies with regular recruitment activities. Subscriptions also include additional features like resume database access and advanced analytics."
    },
    {
      question: "Can I upgrade my plan at any time?",
      answer: "Yes, you can upgrade your subscription plan at any time. The price difference will be prorated for the remainder of your billing cycle. Downgrading is also possible at the end of your current billing period."
    },
    {
      question: "How do resume database searches work?",
      answer: "Resume database searches allow you to proactively search our talent pool of candidates with verified human skills. You can filter by specific capabilities, AI Resistance Index scores, industry experience, and more. Each search counts as one credit from your monthly allowance."
    },
    {
      question: "What is the AI Resistance Index verification?",
      answer: "Our proprietary AI Resistance Index measures each candidate's skills and capabilities against current and projected automation technology. The verification process ensures that candidates possess the human skills they claim and quantifies their resilience to automation in your specific industry."
    }
  ]

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Flexible Pricing Options
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the right hiring solution for your organization's needs, whether you need to fill a single role or build a future-proof workforce
          </p>
        </div>
        
        <div className="text-center mb-12">
          <div className="inline-flex bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setPricingType('individual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                pricingType === 'individual' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Individual Job Posts
            </button>
            <button
              onClick={() => setPricingType('subscription')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                pricingType === 'subscription' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Subscription Plans
            </button>
          </div>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-blue-900 text-center mb-8">
          {pricingType === 'individual' ? 'Individual Job Posting Options' : 'Monthly Subscription Plans'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {pricingType === 'individual' 
            ? individualTiers.map((tier, index) => (
                <PricingCard key={index} tier={tier} />
              ))
            : subscriptionTiers.map((tier, index) => (
                <PricingCard key={index} tier={tier} isSubscription={true} />
              ))
          }
        </div>
        
        <div className="bg-gray-100 rounded-xl p-8 text-center mt-16">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Need a Custom Solution?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We offer tailored solutions for organizations with unique workforce planning needs. Our team will work with you to develop a customized package.
          </p>
          <Link
            href="/employers/contact-sales"
            className="inline-block bg-green-400 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Sales
          </Link>
        </div>
        
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-blue-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-lg font-medium text-blue-900 mb-2">
                  {faq.question}
                </h4>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 