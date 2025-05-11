export default function ProcessSection() {
  const processSteps = [
    {
      title: 'Multi-dimensional Assessment',
      description: 'Candidates complete our proprietary assessment measuring emotional intelligence, ethical reasoning, creative thinking, and other irreplaceable human skills.'
    },
    {
      title: 'Practical Validation',
      description: 'Skills are verified through scenario-based challenges that demonstrate actual capabilities rather than theoretical knowledge.'
    },
    {
      title: 'AI Resistance Scoring',
      description: 'We calculate each candidate\'s AI Resistance Index based on their skill profile and the current state of automation technology.'
    },
    {
      title: 'Matching Algorithm',
      description: 'Our system identifies candidates whose human capabilities align perfectly with your specific job requirements.'
    }
  ]

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Human Skills Verification Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our unique methodology for verifying candidates' human capabilities
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {processSteps.map((step, index) => (
            <div 
              key={index} 
              className="flex-1 min-w-[250px] max-w-[300px] text-center"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 