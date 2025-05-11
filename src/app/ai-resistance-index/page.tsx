import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IndustryProjectionsGrid from '@/components/ai-resistance/IndustryProjectionsGrid';
import OverviewTabs from '@/components/ai-resistance/OverviewTabs';
import CTASection from '@/components/ai-resistance/CTASection';
import GlobalSearchHandler from '@/components/ai-resistance/GlobalSearchHandler';

export const metadata = {
  title: 'FutureProof Jobs - AI Resistance Index',
  description: 'Our proprietary rating system that analyzes and quantifies jobs\' resilience to automation, helping you make informed career decisions in the age of AI.'
};

export default function AIResistanceIndex() {
  return (
    <>
      <Header />
      
      <section className="bg-gradient-to-r from-blue-900 to-blue-500 text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">AI Resistance Index™</h1>
          <p className="max-w-3xl mx-auto text-lg">
            Our proprietary rating system that analyzes and quantifies jobs' resilience to automation, 
            helping you make informed career decisions in the age of AI.
          </p>
        </div>
      </section>

      <section className="bg-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center flex-wrap gap-4">
          <div className="text-sm text-gray-600 max-w-3xl">
            The AI Resistance Index combines expert analysis, historical data, and predictive modeling 
            to assess how different occupations will withstand automation over time.
          </div>
          <a href="#" className="text-blue-500 font-medium text-sm flex items-center">
            <span className="mr-2">View our full methodology</span> →
          </a>
          <div className="text-sm text-gray-500">
            Last Updated: April 25, 2025
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex justify-between items-start mb-8 flex-wrap gap-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Occupational Resistance Overview</h2>
                <p className="text-gray-600">See how different job categories compare in their ability to resist automation</p>
              </div>
              <form role="search" className="bg-gray-100 rounded-lg flex items-center p-2 w-full max-w-md">
                <input 
                  type="text" 
                  placeholder="Search for a specific job..." 
                  className="bg-transparent border-none flex-1 px-2 py-2 focus:outline-none text-sm"
                />
                <button type="submit" className="text-gray-500">🔍</button>
              </form>
            </div>
            
            <GlobalSearchHandler />
            
            <OverviewTabs />
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-900">Industry Stability Projections</h2>
              <div className="flex gap-4">
                <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600">5 Years</button>
                <button className="px-4 py-2 rounded-md text-sm font-medium text-blue-800 bg-blue-100">10 Years</button>
                <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600">20 Years</button>
              </div>
            </div>
            
            <IndustryProjectionsGrid />
          </div>
          
          <CTASection />
        </div>
      </section>
      
      <Footer />
    </>
  );
} 