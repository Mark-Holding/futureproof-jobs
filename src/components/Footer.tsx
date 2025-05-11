import Link from 'next/link'

export default function Footer() {
  const footerLinks = {
    'FutureProofJobs': [
      { label: 'About Us', href: '/about' },
      { label: 'Our Methodology', href: '/methodology' },
      { label: 'Future of Work Blog', href: '/blog' },
      { label: 'Press & Media', href: '/press' }
    ],
    'For Job Seekers': [
      { label: 'Browse Jobs', href: '/jobs' },
      { label: 'Career Assessment', href: '/assessment' },
      { label: 'Skill Development', href: '/skills' },
      { label: 'Success Stories', href: '/success-stories' }
    ],
    'For Employers': [
      { label: 'Post a Job', href: '/post-job' },
      { label: 'Workforce Planning', href: '/workforce-planning' },
      { label: 'Human-AI Integration', href: '/ai-integration' },
      { label: 'Employer Branding', href: '/employer-branding' }
    ],
    'Resources': [
      { label: 'AI Vulnerability Reports', href: '/reports' },
      { label: 'Industry Insights', href: '/insights' },
      { label: 'Research & Studies', href: '/research' },
      { label: 'Webinars & Events', href: '/events' }
    ]
  }

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-green-400 font-bold text-lg mb-6">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FutureProofJobs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 