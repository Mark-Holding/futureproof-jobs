export default function Categories() {
  const categories = [
    {
      icon: '👨‍⚕️',
      title: 'Healthcare & Wellness',
      description: 'Roles requiring empathy and physical presence',
      score: '98%'
    },
    {
      icon: '🧠',
      title: 'Creative Direction',
      description: 'Shaping original vision and concepts',
      score: '95%'
    },
    {
      icon: '👷',
      title: 'Skilled Trades',
      description: 'Complex physical environments requiring adaptability',
      score: '93%'
    },
    {
      icon: '👥',
      title: 'Social Services',
      description: 'Human connection and ethical decision-making',
      score: '97%'
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            High-Demand AI-Resistant Categories
          </h2>
          <p className="text-xl text-gray-600">
            Jobs where human skills will always remain essential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 text-center shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">{category.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                {category.title}
              </h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="inline-block px-4 py-2 bg-green-50 text-green-600 rounded-full font-semibold">
                {category.score} FutureProof
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 