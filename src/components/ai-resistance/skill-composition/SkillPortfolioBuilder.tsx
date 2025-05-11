'use client';

import React, { useState } from 'react';

const skillsList = [
  { id: 'empathy', name: 'Empathy', baseScore: 9.5 },
  { id: 'creativity', name: 'Creativity', baseScore: 9.2 },
  { id: 'decision', name: 'Complex Decision-Making', baseScore: 8.7 },
  { id: 'ethics', name: 'Ethical Judgment', baseScore: 9.0 },
  { id: 'dexterity', name: 'Physical Dexterity', baseScore: 7.5 },
  { id: 'social', name: 'Social Intelligence', baseScore: 9.3 },
  { id: 'cultural', name: 'Cultural Competence', baseScore: 8.9 },
  { id: 'cross', name: 'Cross-Disciplinary Thinking', baseScore: 8.8 },
];

const careerMatches = [
  { id: 1, title: 'Mental Health Counselor', sector: 'Healthcare & Wellness', match: 94 },
  { id: 2, title: 'Social Services Coordinator', sector: 'Social Services', match: 92 },
  { id: 3, title: 'Community Health Advocate', sector: 'Healthcare & Wellness', match: 89 },
  { id: 4, title: 'Ethics Advisor', sector: 'Various Industries', match: 85 },
  { id: 5, title: 'Human Resources Specialist', sector: 'Business Services', match: 82 },
  { id: 6, title: 'Creative Director', sector: 'Design & Media', match: 88 },
  { id: 7, title: 'UX Researcher', sector: 'Technology', match: 86 },
  { id: 8, title: 'Educational Consultant', sector: 'Education', match: 83 },
];

const SkillPortfolioBuilder: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['empathy', 'ethics', 'social']);
  const [skillLevel, setSkillLevel] = useState<number>(4);
  const [resistanceScore, setResistanceScore] = useState<number>(87);
  const [matches, setMatches] = useState(careerMatches.slice(0, 5));
  
  const handleSkillToggle = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };
  
  const handleSkillLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillLevel(parseInt(e.target.value));
  };
  
  const updatePortfolio = () => {
    // Calculate new resistance score based on selected skills and level
    const baseScore = selectedSkills.reduce((sum, skillId) => {
      const skill = skillsList.find(s => s.id === skillId);
      return sum + (skill?.baseScore || 0);
    }, 0);
    
    // Normalize to 0-100 scale with level multiplier
    const normalizedScore = Math.min(
      Math.round((baseScore / (selectedSkills.length * 10)) * 100 * (skillLevel / 3)),
      99
    );
    
    setResistanceScore(normalizedScore);
    
    // Update career matches based on selected skills
    const newMatches = [...careerMatches].sort((a, b) => {
      // This is a simplified matching algorithm
      // In a real app, this would be more sophisticated
      const skillsMatch = selectedSkills.length;
      const aRandom = a.match + (Math.random() * 5 - 2.5);
      const bRandom = b.match + (Math.random() * 5 - 2.5);
      return bRandom - aRandom;
    }).slice(0, 5);
    
    setMatches(newMatches);
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Skill Portfolio Builder</h2>
        <p className="text-gray-600 text-sm">
          Build your personal skill portfolio and discover your automation resistance score
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-4">Select Your Skills</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {skillsList.map(skill => (
                <div key={skill.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`skill-${skill.id}`}
                    checked={selectedSkills.includes(skill.id)}
                    onChange={() => handleSkillToggle(skill.id)}
                    className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`skill-${skill.id}`} className="ml-3 text-sm text-gray-600">
                    {skill.name}
                  </label>
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm text-gray-600 mb-2">Skill Proficiency Level</h4>
              <input
                type="range"
                min="1"
                max="5"
                value={skillLevel}
                onChange={handleSkillLevelChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Basic</span>
                <span>Intermediate</span>
                <span>Advanced</span>
              </div>
            </div>
            
            <button
              onClick={updatePortfolio}
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Update My Portfolio
            </button>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-blue-900">Your Automation Resistance Score</h3>
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xl font-bold">
                {resistanceScore}%
              </div>
            </div>
            
            <div>
              {selectedSkills.map(skillId => {
                const skill = skillsList.find(s => s.id === skillId);
                return skill ? (
                  <div key={skill.id} className="flex justify-between py-3 border-b border-gray-200 last:border-0">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {skill.name}
                    </div>
                    <div>
                      {skillLevel === 1 ? 'Basic' : 
                       skillLevel === 2 ? 'Basic-Intermediate' :
                       skillLevel === 3 ? 'Intermediate' :
                       skillLevel === 4 ? 'Advanced' : 'Expert'} ({skillLevel}/5)
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-4">Recommended Career Matches</h3>
            
            {matches.map(career => (
              <div key={career.id} className="flex justify-between py-3 border-b border-gray-200 last:border-0">
                <div>
                  <h4 className="text-base font-medium text-gray-800">{career.title}</h4>
                  <div className="text-sm text-gray-500">{career.sector}</div>
                </div>
                <div className="text-sm font-semibold text-green-600">
                  {career.match}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillPortfolioBuilder; 