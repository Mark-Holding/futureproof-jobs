'use client';

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const skills = [
  { id: 'empathy', name: 'Empathy', icon: '❤️', description: 'The ability to understand and share the feelings of another person', score: 9.5 },
  { id: 'creativity', name: 'Creativity', icon: '🎨', description: 'The use of imagination or original ideas to create something new', score: 9.2 },
  { id: 'decision-making', name: 'Complex Decision-Making', icon: '🧠', description: 'The ability to analyze multiple variables and make optimal choices', score: 8.7 },
  { id: 'ethics', name: 'Ethical Judgment', icon: '⚖️', description: 'The capacity to navigate complex moral dilemmas and make principled decisions', score: 9.0 },
  { id: 'dexterity', name: 'Physical Dexterity', icon: '👐', description: 'Fine motor skills and hand-eye coordination for precise physical tasks', score: 7.5 },
  { id: 'social', name: 'Social Intelligence', icon: '👥', description: 'The ability to navigate social relationships and environments effectively', score: 9.3 },
  { id: 'cultural', name: 'Cultural Competence', icon: '🌍', description: 'Understanding and adapting to cultural nuances and differences', score: 8.9 },
  { id: 'cross', name: 'Cross-Disciplinary Thinking', icon: '🔄', description: 'The ability to synthesize knowledge from multiple domains', score: 8.8 },
];

const projectionData = [
  { year: 2025, value: 70 },
  { year: 2030, value: 50 },
  { year: 2035, value: 25 },
  { year: 2040, value: 5 },
];

const skillContent = {
  'empathy': {
    marketDemand: { value: 'Very High', trend: 'Increasing' },
    aiGap: { value: 'Extreme', trend: 'Widening' },
    futureValue: { value: 'Critical', trend: '+38% growth' },
    occupations: [
      { name: 'Mental Health Therapist', resistance: '97%' },
      { name: 'Palliative Care Nurse', resistance: '96%' },
      { name: 'Social Worker', resistance: '94%' },
      { name: 'Special Education Teacher', resistance: '92%' },
      { name: 'Crisis Counselor', resistance: '95%' },
    ],
    limitations: [
      { name: 'Genuine emotional connection', gap: 'Extreme gap' },
      { name: 'Non-verbal cue interpretation', gap: 'High gap' },
      { name: 'Trauma-informed response', gap: 'Extreme gap' },
      { name: 'Cultural emotional context', gap: 'High gap' },
      { name: 'Authentic compassion', gap: 'Extreme gap' },
    ],
    pathways: [
      { name: 'Psychology/Counseling Education', duration: '18-48 months' },
      { name: 'Active Listening Certification', duration: '3-6 months' },
      { name: 'Trauma-Informed Care Training', duration: '6-12 months' },
      { name: 'Emotional Intelligence Coaching', duration: '4-8 months' },
      { name: 'Cross-Cultural Empathy Program', duration: '6-9 months' },
    ]
  },
  'creativity': {
    marketDemand: { value: 'High', trend: 'Increasing' },
    aiGap: { value: 'High', trend: 'Narrowing slowly' },
    futureValue: { value: 'Very High', trend: '+25% growth' },
    occupations: [
      { name: 'Art Director', resistance: '89%' },
      { name: 'Creative Strategist', resistance: '92%' },
      { name: 'Product Designer', resistance: '86%' },
      { name: 'Narrative Designer', resistance: '90%' },
      { name: 'Experience Architect', resistance: '88%' },
    ],
    limitations: [
      { name: 'Original concept generation', gap: 'High gap' },
      { name: 'Cultural relevance', gap: 'High gap' },
      { name: 'Emotional resonance', gap: 'Extreme gap' },
      { name: 'Interdisciplinary innovation', gap: 'High gap' },
      { name: 'Purposeful rule-breaking', gap: 'Extreme gap' },
    ],
    pathways: [
      { name: 'Design Thinking Certification', duration: '3-6 months' },
      { name: 'Creative Problem Solving Workshop', duration: '1-2 months' },
      { name: 'Interdisciplinary Arts Program', duration: '12-24 months' },
      { name: 'Experimental Innovation Lab', duration: '6-12 months' },
      { name: 'Creative Leadership Training', duration: '4-8 months' },
    ]
  },
  // Add data for other skills as needed
};

const SkillImpactAnalysis: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState('empathy');
  
  const currentSkill = skills.find(skill => skill.id === activeSkill) || skills[0];
  const content = skillContent[activeSkill as keyof typeof skillContent] || skillContent.empathy;
  
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Individual Skill Impact Analysis</h2>
        <p className="text-gray-600 text-sm">
          Explore the importance of specific human skills and their impact on automation resistance
        </p>
      </div>
      
      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <div className="flex">
          {skills.map(skill => (
            <button
              key={skill.id}
              onClick={() => setActiveSkill(skill.id)}
              className={`px-4 py-3 text-sm whitespace-nowrap transition-colors ${
                activeSkill === skill.id
                  ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
                  : 'text-gray-500 border-b-2 border-transparent'
              }`}
            >
              {skill.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-start mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl shrink-0 mr-6">
            {currentSkill.icon}
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-blue-900 mb-1">{currentSkill.name}</h3>
            <p className="text-gray-600 text-sm">{currentSkill.description}</p>
          </div>
          <div className="px-4 py-2 bg-green-50 text-green-600 rounded-lg font-semibold text-sm">
            {currentSkill.score}/10 Resistance Impact
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Current Market Demand</div>
            <div className="text-lg font-semibold text-gray-800">{content.marketDemand.value}</div>
            <div className="text-sm text-green-600 flex items-center">
              ↗ {content.marketDemand.trend}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">AI Capability Gap</div>
            <div className="text-lg font-semibold text-gray-800">{content.aiGap.value}</div>
            <div className="text-sm text-green-600 flex items-center">
              ↗ {content.aiGap.trend}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Predicted Value (2035)</div>
            <div className="text-lg font-semibold text-gray-800">{content.futureValue.value}</div>
            <div className="text-sm text-green-600 flex items-center">
              ↗ {content.futureValue.trend}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis 
                domain={[0, 100]} 
                ticks={[0, 25, 50, 75, 100]} 
                tickFormatter={(value) => {
                  if (value === 0) return 'Low';
                  if (value === 50) return 'Med';
                  if (value === 100) return 'High';
                  return '';
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-base font-medium text-blue-900 mb-4">Primary Occupations</h4>
            <div className="bg-gray-50 rounded-lg">
              {content.occupations.map((occupation, idx) => (
                <div key={idx} className={`flex justify-between p-3 text-sm ${
                  idx !== content.occupations.length - 1 ? 'border-b border-gray-200' : ''
                }`}>
                  <div className="text-gray-800">{occupation.name}</div>
                  <div className="text-gray-600 font-medium">{occupation.resistance} resistant</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-base font-medium text-blue-900 mb-4">AI Limitations</h4>
            <div className="bg-gray-50 rounded-lg">
              {content.limitations.map((limitation, idx) => (
                <div key={idx} className={`flex justify-between p-3 text-sm ${
                  idx !== content.limitations.length - 1 ? 'border-b border-gray-200' : ''
                }`}>
                  <div className="text-gray-800">{limitation.name}</div>
                  <div className="text-gray-600 font-medium">{limitation.gap}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-base font-medium text-blue-900 mb-4">Development Pathways</h4>
            <div className="bg-gray-50 rounded-lg">
              {content.pathways.map((pathway, idx) => (
                <div key={idx} className={`flex justify-between p-3 text-sm ${
                  idx !== content.pathways.length - 1 ? 'border-b border-gray-200' : ''
                }`}>
                  <div className="text-gray-800">{pathway.name}</div>
                  <div className="text-gray-600 font-medium">{pathway.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillImpactAnalysis; 