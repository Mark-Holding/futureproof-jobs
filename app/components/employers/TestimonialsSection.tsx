export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "After struggling to fill our specialized healthcare roles through traditional job boards, we turned to FutureProof Jobs. The quality of candidates was extraordinary—they arrived pre-screened for the exact human skills we needed. We've now filled our entire patient advocacy team through the platform.",
      name: "Rebecca Martinez",
      title: "Director of Talent Acquisition, Meridian Health Systems",
      initials: "RM"
    },
    {
      quote: "As a tech company, we were initially skeptical about focusing on 'human skills' when most of our industry is racing toward automation. But the human-AI collaborative teams we've built through FutureProof Jobs have given us a significant competitive advantage in product development. Our human-centered approach now differentiates us in the market.",
      name: "James Kim",
      title: "Chief Innovation Officer, TechVision Solutions",
      initials: "JK"
    }
  ]

  return (
    <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            What Employers Are Saying
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Success stories from organizations that have hired through our platform
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <p className="text-gray-600 italic text-lg mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold mr-4">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 