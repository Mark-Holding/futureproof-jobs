'use client';

import { useState } from 'react';

const skillsData = [
  { 
    name: 'Empathy & Emotional Intelligence', 
    value: 9.5, 
    percentage: 95, 
    color: 'bg-emerald-500'
  },
  { 
    name: 'Complex Decision Making', 
    value: 9.0, 
    percentage: 90, 
    color: 'bg-emerald-500'
  },
  { 
    name: 'Creative Ideation', 
    value: 8.7, 
    percentage: 87, 
    color: 'bg-emerald-500'
  },
  { 
    name: 'Ethical Judgment', 
    value: 8.5, 
    percentage: 85, 
    color: 'bg-emerald-500'
  },
  { 
    name: 'Adaptive Physical Dexterity', 
    value: 8.2, 
    percentage: 82, 
    color: 'bg-blue-500'
  },
  { 
    name: 'Social Intelligence', 
    value: 8.0, 
    percentage: 80, 
    color: 'bg-blue-500'
  },
  { 
    name: 'Cultural Competence', 
    value: 7.8, 
    percentage: 78, 
    color: 'bg-blue-500'
  },
  { 
    name: 'Cross-Disciplinary Thinking', 
    value: 7.5, 
    percentage: 75, 
    color: 'bg-amber-500'
  }
];

export default function HumanSkillsRanking() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  
  return (
    <div className="flex-1 bg-white rounded-lg p-6 shadow">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-900">High-Value Human Skills</h3>
      </div>
      
      <div className="space-y-5">
        {skillsData.map((skill, index) => (
          <div 
            key={index} 
            className="flex items-center"
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div className="w-[35%] text-sm font-medium text-gray-800">{skill.name}</div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${skill.color} rounded-full transition-all duration-300 ${
                  hoveredSkill === index ? 'opacity-100 scale-y-150' : 'opacity-90'
                }`}
                style={{ width: `${skill.percentage}%` }}
              ></div>
            </div>
            <div className="w-[15%] text-right text-xs font-semibold text-gray-600 pl-4">
              {skill.value}/10
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 