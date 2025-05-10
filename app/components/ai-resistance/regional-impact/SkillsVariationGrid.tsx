'use client';

import React from 'react';

const regions = [
  {
    name: 'North America',
    skills: [
      { name: 'AI Ethics & Governance', demand: 92, trend: 'up' },
      { name: 'Human-AI Collaboration', demand: 88, trend: 'up' },
      { name: 'Data Privacy', demand: 85, trend: 'up' },
      { name: 'Creative Problem Solving', demand: 82, trend: 'stable' },
      { name: 'Digital Literacy', demand: 80, trend: 'up' }
    ]
  },
  {
    name: 'Europe',
    skills: [
      { name: 'AI Ethics & Governance', demand: 90, trend: 'up' },
      { name: 'Data Privacy', demand: 88, trend: 'up' },
      { name: 'Human-AI Collaboration', demand: 85, trend: 'up' },
      { name: 'Digital Literacy', demand: 83, trend: 'up' },
      { name: 'Creative Problem Solving', demand: 80, trend: 'stable' }
    ]
  },
  {
    name: 'Asia Pacific',
    skills: [
      { name: 'Human-AI Collaboration', demand: 95, trend: 'up' },
      { name: 'Digital Literacy', demand: 90, trend: 'up' },
      { name: 'AI Ethics & Governance', demand: 85, trend: 'up' },
      { name: 'Creative Problem Solving', demand: 82, trend: 'up' },
      { name: 'Data Privacy', demand: 80, trend: 'up' }
    ]
  },
  {
    name: 'Latin America',
    skills: [
      { name: 'Digital Literacy', demand: 88, trend: 'up' },
      { name: 'Human-AI Collaboration', demand: 85, trend: 'up' },
      { name: 'Creative Problem Solving', demand: 82, trend: 'stable' },
      { name: 'Data Privacy', demand: 80, trend: 'up' },
      { name: 'AI Ethics & Governance', demand: 75, trend: 'up' }
    ]
  }
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return '↗';
    case 'down':
      return '↘';
    default:
      return '→';
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'up':
      return 'text-emerald-600';
    case 'down':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const getDemandColor = (demand: number) => {
  if (demand >= 90) return 'bg-emerald-500';
  if (demand >= 80) return 'bg-blue-500';
  if (demand >= 70) return 'bg-amber-500';
  return 'bg-gray-500';
};

const SkillsVariationGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {regions.map((region) => (
        <div key={region.name} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-blue-900">{region.name}</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {region.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-gray-900">{skill.name}</div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${getTrendColor(skill.trend)}`}>
                        {getTrendIcon(skill.trend)}
                      </span>
                      <span className="text-sm font-medium text-gray-600">{skill.demand}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getDemandColor(skill.demand)}`}
                      style={{ width: `${skill.demand}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsVariationGrid; 