import { CareerPathResult } from '@/lib/data/dummyCareerPathResults';

interface ResultsHeaderProps {
  user: CareerPathResult['user'];
  automationRisk: CareerPathResult['automationRisk'];
  onReset?: () => void;
}

export default function ResultsHeader({ user, automationRisk, onReset }: ResultsHeaderProps) {
  return (
    <div className="results-header bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="person-details">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.name}</h1>
          <div className="text-blue-100 mb-1">{user.currentPosition}</div>
          <div className="text-blue-100 mb-1">{user.pathwayType}</div>
          <div className="text-blue-200 text-sm mb-4">{user.generationDate}</div>
          
          <div className="export-buttons flex space-x-3">
            <button className="export-button px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-sm flex items-center">
              <span className="mr-2">📥</span> Download PDF
            </button>
            <button className="export-button px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-sm flex items-center">
              <span className="mr-2">🔗</span> Share Path
            </button>
          </div>
        </div>
        
        <div className="risk-assessment flex items-center">
          <div className="risk-score mr-4">
            <div className="score-circle w-20 h-20 rounded-full bg-white/10 flex items-center justify-center relative">
              <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.1)" 
                  strokeWidth="10"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.7)" 
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 45 * automationRisk.score / 100} ${2 * Math.PI * 45 * (1 - automationRisk.score / 100)}`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="score-value text-2xl font-bold">{automationRisk.score}%</div>
            </div>
          </div>
          <div className="risk-label text-sm md:text-base font-medium text-blue-100">
            {automationRisk.label}
          </div>
        </div>
      </div>
    </div>
  );
} 