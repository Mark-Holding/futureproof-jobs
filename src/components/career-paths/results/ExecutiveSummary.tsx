import { CareerPathResult } from '@/lib/data/dummyCareerPathResults';

interface ExecutiveSummaryProps {
  paragraphs: CareerPathResult['executiveSummary']['paragraphs'];
  highlights: CareerPathResult['executiveSummary']['highlights'];
}

export default function ExecutiveSummary({ paragraphs, highlights }: ExecutiveSummaryProps) {
  return (
    <div className="executive-summary mb-12">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Executive Summary</h2>
      
      <div className="summary-content mb-8">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      
      <div className="summary-highlights grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((highlight, index) => (
          <div key={index} className="highlight-card bg-blue-50 p-4 rounded-lg border border-blue-100 flex">
            <div className="highlight-icon text-2xl mr-3 mt-1">{highlight.icon}</div>
            <div className="highlight-content">
              <div className="highlight-title font-semibold text-blue-800 mb-1">{highlight.title}</div>
              <div className="highlight-description text-sm text-gray-700">{highlight.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 