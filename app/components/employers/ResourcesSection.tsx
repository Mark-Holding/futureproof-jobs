import Link from 'next/link'

export default function ResourcesSection() {
  const resources = [
    {
      icon: '📝',
      title: 'Writing Job Descriptions for Human-Centered Roles',
      description: 'Learn how to craft job descriptions that attract candidates with exceptional human skills and clearly communicate your needs.',
      link: '/resources/job-descriptions'
    },
    {
      icon: '🔍',
      title: 'Interviewing for Emotional Intelligence',
      description: 'Proven interview techniques to evaluate candidates\' empathy, ethical reasoning, and other critical human capabilities.',
      link: '/resources/interviewing'
    },
    {
      icon: '🤖',
      title: 'Building Human-AI Collaborative Teams',
      description: 'Strategic framework for creating teams that leverage both human strengths and technological capabilities.',
      link: '/resources/human-ai-teams'
    }
  ]

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Employer Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Valuable guides and insights to help you build a future-proof workforce
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-200"
            >
              <div className="h-48 bg-blue-100 flex items-center justify-center text-5xl">
                {resource.icon}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {resource.description}
                </p>
                <Link
                  href={resource.link}
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Download Guide
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 