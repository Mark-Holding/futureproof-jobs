import Link from 'next/link';

export default function CTASection() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-500 rounded-lg text-white text-center py-12 px-6">
      <h2 className="text-3xl font-bold mb-6">Build Your AI-Resistant Career Path</h2>
      <p className="max-w-2xl mx-auto text-lg mb-8">
        Use our personal assessment tool to identify your strongest human capabilities 
        and discover career paths that will remain valuable throughout the AI transformation.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link 
          href="/assessment" 
          className="bg-green-400 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Take The FutureProof Assessment
        </Link>
        <Link 
          href="/jobs" 
          className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Browse AI-Resistant Jobs
        </Link>
      </div>
    </div>
  );
} 