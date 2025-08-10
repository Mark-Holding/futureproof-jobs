export default function Features() {
  const features = [
    {
      title: 'AI Resistance Index™',
      description: 'Our proprietary rating system helps you understand which careers have long-term stability against automation, with detailed assessments updated quarterly.'
    },
    {
      title: 'Skill Transfer Navigator',
      description: 'Discover how your current skills translate to automation-resistant roles, with personalized recommendations for career transitions.'
    },
    {
      title: 'Human-AI Collaboration Insights',
      description: 'Learn which jobs will transform rather than disappear, and how to position yourself for roles that complement AI systems.'
    }
  ]

  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Why Choose FutureProofJobs
          </h2>
          <p className="text-xl text-gray-600">
            Tools and resources designed specifically for automation-resistant careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 