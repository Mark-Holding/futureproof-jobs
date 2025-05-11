export default function Stats() {
  const stats = [
    {
      value: '95%',
      label: 'Job Stability Rating'
    },
    {
      value: '2,500+',
      label: 'AI-Resistant Jobs'
    },
    {
      value: '150+',
      label: 'Partner Companies'
    }
  ]

  return (
    <section className="bg-white py-8 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-bold text-blue-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 