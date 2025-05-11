export default function AdvantagesSection() {
  const advantages = [
    {
      icon: '🛡️',
      title: 'Future-Proof Your Workforce',
      description: 'Build teams with the human skills that will remain valuable regardless of technological advancement, creating lasting organizational resilience in the face of automation.'
    },
    {
      icon: '💡',
      title: 'Reduce Innovation Gaps',
      description: 'Employees with strong human skills create more effective human-AI collaborative teams, leading to innovations that purely technological approaches miss.'
    },
    {
      icon: '🤝',
      title: 'Improve Client Relationships',
      description: 'Clients increasingly value human connection, empathy and ethical judgment – precisely the skills that our candidates excel in delivering.'
    },
    {
      icon: '⚖️',
      title: 'Build Ethical Foundations',
      description: 'As AI systems become more prevalent, human oversight and ethical decision-making become critical competitive advantages for responsible organizations.'
    }
  ]

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            The AI-Resistant Talent Advantage
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            In a world where technology is rapidly changing the workforce landscape, hiring employees with irreplaceable human skills creates lasting organizational value
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
                {advantage.title}
              </h3>
              <p className="text-gray-600 text-center">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 