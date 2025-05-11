import { CareerPathResult } from '@/lib/data/dummyCareerPathResults';

interface SuccessStoriesProps {
  stories: CareerPathResult['successStories'];
}

export default function SuccessStories({ stories }: SuccessStoriesProps) {
  return (
    <div className="success-stories mb-12">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Personalized Success Stories</h2>
      <p className="text-gray-600 mb-6">Real examples of professionals who successfully navigated similar career transitions</p>
      
      <div className="stories-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story, index) => (
          <div key={index} className="story-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="story-header bg-gradient-to-r from-blue-800 to-blue-600 p-5 text-white">
              <h3 className="text-lg font-semibold mb-1">{story.title}</h3>
              <div className="text-blue-100 text-sm">{story.person}</div>
            </div>
            
            <div className="story-quote px-6 py-4 bg-blue-50 border-b border-blue-100">
              <blockquote className="text-gray-700 italic relative pl-4">
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-300"></div>
                "{story.quote}"
              </blockquote>
            </div>
            
            <div className="story-content p-5">
              <h4 className="text-sm font-semibold text-blue-800 mb-3">Key Actions:</h4>
              <ul className="space-y-2 mb-4">
                {story.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-blue-700 text-xs font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-gray-700 text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
              
              <div className="story-outcome mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Outcome:</h4>
                <p className="text-gray-700 text-sm">{story.outcome}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="more-stories-cta mt-6 text-center">
        <button className="px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium">
          See More Similar Success Stories
        </button>
      </div>
    </div>
  );
} 