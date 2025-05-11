import { CareerPathResult } from '@/lib/data/dummyCareerPathResults';

interface AIResistanceStrategyProps {
  overview: string;
  keyStrategies: CareerPathResult['aiResistanceStrategy']['keyStrategies'];
  uniqueAdvantages: string[];
}

export default function AIResistanceStrategy({ 
  overview, 
  keyStrategies, 
  uniqueAdvantages 
}: AIResistanceStrategyProps) {
  return (
    <div className="ai-resistance-strategy mb-12">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">AI Resistance Strategy</h2>
      
      <div className="overview bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-8 border border-blue-100">
        <p className="text-gray-700 leading-relaxed">{overview}</p>
      </div>
      
      {/* Key Strategies */}
      <div className="key-strategies grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {keyStrategies.map((strategy, index) => (
          <div key={index} className="strategy-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="strategy-header bg-blue-700 text-white p-4">
              <h3 className="text-lg font-semibold">{strategy.title}</h3>
            </div>
            <div className="strategy-body p-4">
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">{strategy.description}</p>
              
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Implementation:</h4>
              <ul className="space-y-2 text-sm">
                {strategy.implementation.map((step, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-blue-700 text-xs font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      {/* Unique Human Advantages */}
      <div className="unique-advantages">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Your Unique Human Advantages</h3>
        
        <div className="advantages-grid grid grid-cols-1 md:grid-cols-2 gap-4">
          {uniqueAdvantages.map((advantage, index) => (
            <div key={index} className="advantage-item flex bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
              </div>
              <div className="advantage-content">
                <p className="text-gray-700 leading-relaxed">{advantage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 