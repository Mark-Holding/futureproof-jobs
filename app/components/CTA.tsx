import Link from 'next/link'

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-500 py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Secure Your Professional Future Today
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands who've future-proofed their careers against automation
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="bg-green-400 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-500 transition-colors inline-block"
          >
            Create Job Seeker Profile
          </Link>
          <Link
            href="/post-job"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors inline-block"
          >
            Post AI-Resistant Jobs
          </Link>
        </div>
      </div>
    </section>
  )
} 