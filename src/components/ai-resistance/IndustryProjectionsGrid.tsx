const industryData = [
  {
    name: 'Healthcare & Wellness',
    trend: { type: 'up', text: 'Growing Stability' },
    score: { value: '97%', category: 'very-high' },
    details: {
      humanFactor: 'Very High',
      jobGrowth: '+28% by 2035',
      aiIntegration: 'Complementary'
    },
    roles: [
      { name: 'Mental Health Therapist', highDemand: true },
      { name: 'Geriatric Specialist', highDemand: true },
      { name: 'Occupational Therapist', highDemand: false },
      { name: 'Patient Advocate', highDemand: false }
    ],
    backgroundIcon: '🏥'
  },
  {
    name: 'Education & Development',
    trend: { type: 'stable', text: 'Stable Evolution' },
    score: { value: '95%', category: 'very-high' },
    details: {
      humanFactor: 'Very High',
      jobGrowth: '+15% by 2035',
      aiIntegration: 'Supportive Tools'
    },
    roles: [
      { name: 'Special Education Teacher', highDemand: true },
      { name: 'Educational Therapist', highDemand: false },
      { name: 'Learning Designer', highDemand: true },
      { name: 'Early Childhood Specialist', highDemand: false }
    ],
    backgroundIcon: '🎓'
  },
  {
    name: 'Skilled Trades',
    trend: { type: 'up', text: 'Growing Importance' },
    score: { value: '88%', category: 'high' },
    details: {
      humanFactor: 'High',
      jobGrowth: '+22% by 2035',
      aiIntegration: 'Augmentation'
    },
    roles: [
      { name: 'Custom Fabrication Specialist', highDemand: true },
      { name: 'Restoration Expert', highDemand: true },
      { name: 'Infrastructure Adaptability Tech', highDemand: false },
      { name: 'Creative Craftsperson', highDemand: false }
    ],
    backgroundIcon: '🔧'
  },
  {
    name: 'Creative Arts',
    trend: { type: 'stable', text: 'Transforming Stably' },
    score: { value: '85%', category: 'high' },
    details: {
      humanFactor: 'High',
      jobGrowth: '+12% by 2035',
      aiIntegration: 'Co-creative'
    },
    roles: [
      { name: 'Narrative Experience Designer', highDemand: true },
      { name: 'Human-AI Art Director', highDemand: false },
      { name: 'Cultural Context Curator', highDemand: false },
      { name: 'Immersive Performance Artist', highDemand: true }
    ],
    backgroundIcon: '🎨'
  },
  {
    name: 'Social Services',
    trend: { type: 'up', text: 'High Growth' },
    score: { value: '93%', category: 'very-high' },
    details: {
      humanFactor: 'Critical',
      jobGrowth: '+32% by 2035',
      aiIntegration: 'Administrative Support'
    },
    roles: [
      { name: 'Community Resilience Coordinator', highDemand: true },
      { name: 'Family Systems Therapist', highDemand: false },
      { name: 'Trauma-Informed Specialist', highDemand: true },
      { name: 'Elder Care Advocate', highDemand: false }
    ],
    backgroundIcon: '👪'
  },
  {
    name: 'Technology',
    trend: { type: 'down', text: 'Transforming Rapidly' },
    score: { value: '76%', category: 'medium' },
    details: {
      humanFactor: 'Varied',
      jobGrowth: '-18% / +25% (Split)',
      aiIntegration: 'Replacement & Creation'
    },
    roles: [
      { name: 'AI Ethics Governance Lead', highDemand: true },
      { name: 'Human-Tech Integration Specialist', highDemand: true },
      { name: 'Tech-Social Impact Evaluator', highDemand: false },
      { name: 'Digital Humanities Expert', highDemand: false }
    ],
    backgroundIcon: '💻'
  }
];

const getTrendIcon = (type: string) => {
  switch (type) {
    case 'up': return '↗';
    case 'down': return '↘';
    case 'stable': return '→';
    default: return '→';
  }
};

const getTrendColor = (type: string) => {
  switch (type) {
    case 'up': return 'text-emerald-600';
    case 'down': return 'text-red-600';
    case 'stable': return 'text-indigo-700';
    default: return 'text-gray-600';
  }
};

const getScoreClass = (category: string) => {
  switch (category) {
    case 'very-high': return 'bg-emerald-50 text-emerald-600';
    case 'high': return 'bg-indigo-50 text-indigo-700';
    case 'medium': return 'bg-amber-50 text-amber-600';
    case 'low': return 'bg-red-50 text-red-600';
    default: return 'bg-gray-50 text-gray-600';
  }
};

export default function IndustryProjectionsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {industryData.map((industry, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6 relative overflow-hidden">
          {/* Background icon */}
          <div className="absolute top-0 right-0 w-36 h-36 opacity-5 flex items-center justify-center text-6xl">
            {industry.backgroundIcon}
          </div>
          
          {/* Header */}
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <h3 className="text-xl font-semibold text-blue-900 mb-1">{industry.name}</h3>
              <div className={`text-sm flex items-center ${getTrendColor(industry.trend.type)}`}>
                <span className="mr-1">{getTrendIcon(industry.trend.type)}</span>
                {industry.trend.text}
              </div>
            </div>
            <div className={`px-3 py-1 rounded-md text-sm font-semibold ${getScoreClass(industry.score.category)}`}>
              {industry.score.value}
            </div>
          </div>
          
          {/* Details */}
          <div className="relative z-10">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Human Factor:</span>
                <span className="font-medium text-gray-800">{industry.details.humanFactor}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Job Growth:</span>
                <span className="font-medium text-gray-800">{industry.details.jobGrowth}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">AI Integration:</span>
                <span className="font-medium text-gray-800">{industry.details.aiIntegration}</span>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">Key Resistant Roles:</div>
              <div className="flex flex-wrap gap-2">
                {industry.roles.map((role, roleIndex) => (
                  <div 
                    key={roleIndex} 
                    className={`px-2 py-1 rounded-md text-xs ${
                      role.highDemand 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {role.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 