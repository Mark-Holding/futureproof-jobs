import Link from 'next/link'

export default function EmployerCTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-500 py-20 text-white">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Build Your Future-Proof Workforce?
        </h2>
        <p className="text-xl mb-12">
          Join hundreds of forward-thinking organizations that are preparing for the future of work by prioritizing irreplaceable human talent.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/post-job"
            className="bg-green-400 hover:bg-green-500 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Post a Job Now
          </Link>
          <Link
            href="/employers/consultation"
            className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Schedule a Consultation
          </Link>
          <Link
            href="/employers/demo"
            className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </section>
  )
} 