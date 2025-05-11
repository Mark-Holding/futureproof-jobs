import Link from 'next/link'

export default function HeroSection() {
  const stats = [
    {
      value: '95%',
      label: 'of our candidates possess high-value human skills'
    },
    {
      value: '78%',
      label: 'reduction in time-to-hire for difficult-to-fill human-centered roles'
    },
    {
      value: '92%',
      label: 'retention rate for positions filled through our platform'
    }
  ]

  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hire Human Talent That AI Can't Replace
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Connect with candidates who possess the irreplaceable human skills your organization needs to thrive in the age of AI
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between max-w-4xl mx-auto mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-4 py-2 md:py-0 md:border-r-0 md:last:border-r-0">
              <div className="text-3xl font-bold text-blue-500 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <Link 
          href="/post-job"
          className="inline-block bg-green-400 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
        >
          Post a Job Today
        </Link>
      </div>
    </section>
  )
} 