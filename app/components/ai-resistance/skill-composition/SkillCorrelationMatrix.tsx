import React from 'react';

const skills = [
  'Empathy',
  'Creativity',
  'Complex Decision-Making',
  'Ethical Judgment',
  'Physical Dexterity',
  'Social Intelligence',
  'Cultural Competence',
  'Cross-Disciplinary Thinking'
];

// Matrix data structure: [row][column] where both are indexed by the skills array
const correlationData = [
  [5.0, 4.2, 3.7, 4.8, 2.5, 4.9, 4.3, 3.8], // Empathy
  [4.2, 5.0, 4.0, 3.5, 4.1, 3.8, 4.4, 4.7], // Creativity
  [3.7, 4.0, 5.0, 4.9, 3.2, 4.1, 3.5, 4.3], // Complex Decision-Making
  [4.8, 3.5, 4.9, 5.0, 1.9, 4.2, 4.5, 3.7], // Ethical Judgment
  [2.5, 4.1, 3.2, 1.9, 5.0, 2.3, 2.1, 3.6], // Physical Dexterity
  [4.9, 3.8, 4.1, 4.2, 2.3, 5.0, 4.8, 3.5], // Social Intelligence
  [4.3, 4.4, 3.5, 4.5, 2.1, 4.8, 5.0, 4.0], // Cultural Competence
  [3.8, 4.7, 4.3, 3.7, 3.6, 3.5, 4.0, 5.0]  // Cross-Disciplinary Thinking
];

const getLevelClass = (value: number) => {
  if (value >= 4.5) return 'bg-green-200';
  if (value >= 4.0) return 'bg-green-100';
  if (value >= 3.0) return 'bg-yellow-100';
  if (value >= 2.0) return 'bg-orange-100';
  return 'bg-red-100';
};

const SkillCorrelationMatrix: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Skill Correlation Matrix</h2>
        <p className="text-gray-600 text-sm">
          Discover how different human skills work together to create strong resistance against automation
        </p>
      </div>
      
      <div className="relative overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Matrix header */}
          <div className="flex">
            <div className="w-48 shrink-0"></div> {/* Empty corner cell */}
            {skills.map((skill, idx) => (
              <div 
                key={`header-${idx}`} 
                className="flex-1 transform origin-bottom-left rotate-45 translate-y-12 -translate-x-4 text-xs text-gray-600 truncate max-w-[100px] h-32"
              >
                {skill}
              </div>
            ))}
          </div>
          
          {/* Matrix rows */}
          {skills.map((rowSkill, rowIdx) => (
            <div key={`row-${rowIdx}`} className="flex">
              <div className="w-48 shrink-0 py-4 pr-4 text-right text-sm text-gray-600 font-medium">
                {rowSkill}
              </div>
              {correlationData[rowIdx].map((value, colIdx) => (
                <div 
                  key={`cell-${rowIdx}-${colIdx}`} 
                  className={`flex-1 aspect-square flex items-center justify-center text-sm font-medium transition-transform hover:scale-105 hover:z-10 hover:shadow ${getLevelClass(value)}`}
                >
                  {value.toFixed(1)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center mt-16 gap-4 flex-wrap">
        <div className="flex items-center text-xs">
          <div className="w-4 h-4 bg-red-100 mr-2"></div>
          <span>Low Correlation (1-2)</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="w-4 h-4 bg-orange-100 mr-2"></div>
          <span>Medium-Low (2-3)</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="w-4 h-4 bg-yellow-100 mr-2"></div>
          <span>Medium (3-4)</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="w-4 h-4 bg-green-100 mr-2"></div>
          <span>Medium-High (4-4.5)</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="w-4 h-4 bg-green-200 mr-2"></div>
          <span>High Correlation (4.5-5)</span>
        </div>
      </div>
    </div>
  );
};

export default SkillCorrelationMatrix; 