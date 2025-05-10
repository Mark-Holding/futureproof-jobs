import React from 'react';

const skillCombinations = [
  {
    id: 1,
    title: 'Technical Literacy + Emotional Intelligence',
    icon: '🧠',
    description: 'The ability to understand complex technical systems while also empathizing with the human users of those systems. Creates professionals who can translate between technical and human needs.',
    industries: ['Healthcare Tech', 'UX Design', 'AI Ethics']
  },
  {
    id: 2,
    title: 'Data Interpretation + Ethical Judgment',
    icon: '📊',
    description: 'The ability to analyze complex data sets while considering the ethical implications of how that data is used. Critical for professionals who ensure algorithmic fairness and responsible data usage.',
    industries: ['Privacy', 'Governance', 'Financial Services']
  },
  {
    id: 3,
    title: 'Cross-Cultural Communication + Creative Problem-Solving',
    icon: '🌐',
    description: 'The ability to navigate diverse cultural contexts while developing innovative solutions that work across boundaries. Essential for global challenges requiring nuanced human perspectives.',
    industries: ['International Development', 'Global Health', 'Crisis Response']
  },
  {
    id: 4,
    title: 'Human-Machine Collaboration + Empathetic Leadership',
    icon: '🤝',
    description: 'The ability to effectively work alongside AI systems while maintaining human-centered leadership that prioritizes wellbeing and emotional needs of teams in digitally transformed environments.',
    industries: ['Future of Work', 'Digital Transformation', 'Change Management']
  }
];

const EmergingSkillCombinations: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Emerging Skill Combinations</h2>
        <p className="text-gray-600 text-sm">
          New high-value skill pairings that create exceptional resistance to automation
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCombinations.map(combo => (
          <div 
            key={combo.id} 
            className="bg-gray-50 rounded-lg p-6 hover:transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
              <span className="text-xl mr-3">{combo.icon}</span>
              {combo.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {combo.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {combo.industries.map((industry, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-md"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergingSkillCombinations; 