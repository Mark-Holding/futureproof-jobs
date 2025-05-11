import React from 'react';

const resources = [
  {
    id: 1,
    title: 'Educational Programs',
    icon: '🎓',
    description: 'Formal education programs specifically designed to develop high-value human skills that complement rather than compete with AI capabilities.',
    linkText: 'Browse Programs',
    linkUrl: '#'
  },
  {
    id: 2,
    title: 'Skill Certifications',
    icon: '📝',
    description: 'Industry-recognized certifications that validate your human skills and demonstrate your value in the age of automation to potential employers.',
    linkText: 'Find Certifications',
    linkUrl: '#'
  },
  {
    id: 3,
    title: 'Assessment Tools',
    icon: '📊',
    description: 'Professional assessment instruments that help you identify your natural human skill strengths and areas for development.',
    linkText: 'Take Assessments',
    linkUrl: '#'
  },
  {
    id: 4,
    title: 'Mentorship Connections',
    icon: '👥',
    description: 'Connect with professionals who excel in specific human skills and can provide guidance on developing these capabilities in your career.',
    linkText: 'Find Mentors',
    linkUrl: '#'
  }
];

const SkillDevelopmentResources: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Skill Development Resources</h2>
        <p className="text-gray-600 text-sm">
          Educational opportunities to strengthen your human capabilities
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map(resource => (
          <div key={resource.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="bg-blue-100 p-4 flex items-center">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl mr-4 shadow-sm">
                {resource.icon}
              </div>
              <h3 className="text-base font-semibold text-blue-900">{resource.title}</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4 h-24 overflow-hidden">
                {resource.description}
              </p>
              <a 
                href={resource.linkUrl} 
                className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
              >
                {resource.linkText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillDevelopmentResources; 