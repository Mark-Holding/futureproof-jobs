const emergingRoles = [
  {
    name: 'AI-Human Integration Specialist',
    category: 'Technology & Healthcare',
    score: '98%',
    icon: '🧠'
  },
  {
    name: 'Sustainability Adaptation Consultant',
    category: 'Environmental Services',
    score: '96%',
    icon: '🌿'
  },
  {
    name: 'Crisis Response Coordinator',
    category: 'Emergency Services',
    score: '95%',
    icon: '👥'
  },
  {
    name: 'Holistic Health Advocate',
    category: 'Healthcare',
    score: '94%',
    icon: '🏥'
  },
  {
    name: 'Neurodiversity Coach',
    category: 'Education & Therapy',
    score: '93%',
    icon: '🧩'
  }
];

export default function EmergingRolesSection() {
  return (
    <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-blue-900">Emerging AI-Resistant Roles</h3>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>Jobs with highest future potential</span>
          <span>May 2025</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {emergingRoles.map((role, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl mr-3">
                  {role.icon}
                </div>
                <div>
                  <div className="font-medium">{role.name}</div>
                  <div className="text-xs text-gray-500">{role.category}</div>
                </div>
              </div>
              <div className="font-semibold text-emerald-600">{role.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 