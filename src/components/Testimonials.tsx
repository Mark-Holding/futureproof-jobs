export default function Testimonials() {
  const testimonials = [
    {
      name: "Jessica T.",
      role: "Former Data Entry Specialist, Now Occupational Therapist",
      quote: "The AI Vulnerability Index helped me realize my career was at high risk. FutureProofJobs guided me toward occupational therapy where my people skills create value AI can't replicate."
    },
    {
      name: "Michael R.",
      role: "Former Retail Manager, Now Community Health Worker",
      quote: "I was worried about retail automation. The Skill Transfer Navigator showed me how my customer service experience translated perfectly to community health work."
    },
    {
      name: "Sarah K.",
      role: "AI Implementation Manager",
      quote: "As an employer, we found specialists through FutureProofJobs who understand how to work alongside our AI systems, creating the perfect human-machine collaboration."
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            How people found stable, fulfilling careers through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-xl font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-blue-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 