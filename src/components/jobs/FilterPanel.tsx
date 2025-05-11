'use client'

import { useState } from 'react'

export default function FilterPanel() {
  const [sliderValue, setSliderValue] = useState(85)
  const [activeSkills, setActiveSkills] = useState<string[]>(['empathy'])
  const [jobCategories, setJobCategories] = useState<string[]>(['healthcare'])
  const [locations, setLocations] = useState<string[]>(['remote'])
  const [salaryRanges, setSalaryRanges] = useState<string[]>(['75-100k'])
  const [experienceLevels, setExperienceLevels] = useState<string[]>(['mid'])

  const handleSkillClick = (skill: string) => {
    setActiveSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    )
  }

  const handleCheckboxChange = (category: string, value: string) => {
    switch(category) {
      case 'jobCategories':
        setJobCategories(prev => 
          prev.includes(value) 
            ? prev.filter(c => c !== value) 
            : [...prev, value]
        )
        break
      case 'locations':
        setLocations(prev => 
          prev.includes(value) 
            ? prev.filter(l => l !== value) 
            : [...prev, value]
        )
        break
      case 'salaryRanges':
        setSalaryRanges(prev => 
          prev.includes(value) 
            ? prev.filter(s => s !== value) 
            : [...prev, value]
        )
        break
      case 'experienceLevels':
        setExperienceLevels(prev => 
          prev.includes(value) 
            ? prev.filter(e => e !== value) 
            : [...prev, value]
        )
        break
    }
  }

  return (
    <aside className="w-full md:w-80 bg-white rounded-lg p-6 shadow-sm sticky top-24 self-start">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-blue-900">Filters</h3>
        <button className="text-sm text-gray-500 hover:text-blue-600">Clear All</button>
      </div>
      
      {/* FutureProof Score */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4">FutureProof Score</h4>
        <div className="px-2">
          <div className="flex justify-between text-sm mb-2">
            <span>Risky</span>
            <span>Safe</span>
          </div>
          <div className="h-2.5 bg-gradient-to-r from-red-500 via-amber-500 to-green-500 rounded relative mb-6">
            <div 
              className="absolute -top-2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-pointer"
              style={{ left: `${sliderValue}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded">
                {sliderValue}%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Human Skills Required */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4">Human Skills Required</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'empathy', label: 'Empathy' },
            { id: 'creativity', label: 'Creativity' },
            { id: 'complex-decision', label: 'Complex Decision-Making' },
            { id: 'dexterity', label: 'Physical Dexterity' },
            { id: 'emotional', label: 'Emotional Intelligence' },
            { id: 'ethical', label: 'Ethical Judgment' },
            { id: 'social', label: 'Social Influence' }
          ].map(skill => (
            <div
              key={skill.id}
              className={`px-3 py-1.5 text-sm rounded-full cursor-pointer transition-colors ${
                activeSkills.includes(skill.id)
                  ? 'bg-blue-100 border border-blue-500 text-blue-800'
                  : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
              }`}
              onClick={() => handleSkillClick(skill.id)}
            >
              {skill.label}
            </div>
          ))}
        </div>
      </div>
      
      {/* Job Categories */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4">Job Categories</h4>
        <div className="space-y-3">
          {[
            { id: 'healthcare', label: 'Healthcare & Wellness', count: 124 },
            { id: 'creative', label: 'Creative Direction', count: 87 },
            { id: 'skilled-trades', label: 'Skilled Trades', count: 93 },
            { id: 'education', label: 'Education', count: 68 },
            { id: 'social-services', label: 'Social Services', count: 52 }
          ].map(category => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={category.id}
                checked={jobCategories.includes(category.id)}
                onChange={() => handleCheckboxChange('jobCategories', category.id)}
                className="w-4 h-4 accent-blue-500 mr-3"
              />
              <label htmlFor={category.id} className="flex justify-between w-full text-sm">
                {category.label}
                <span className="text-gray-500">({category.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Location */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4">Location</h4>
        <div className="space-y-3">
          {[
            { id: 'remote', label: 'Remote', count: 175 },
            { id: 'hybrid', label: 'Hybrid', count: 214 },
            { id: 'onsite', label: 'On-site', count: 189 }
          ].map(location => (
            <div key={location.id} className="flex items-center">
              <input
                type="checkbox"
                id={location.id}
                checked={locations.includes(location.id)}
                onChange={() => handleCheckboxChange('locations', location.id)}
                className="w-4 h-4 accent-blue-500 mr-3"
              />
              <label htmlFor={location.id} className="flex justify-between w-full text-sm">
                {location.label}
                <span className="text-gray-500">({location.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Salary Range */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4">Salary Range</h4>
        <div className="space-y-3">
          {[
            { id: '50-75k', label: '$50k - $75k', count: 128 },
            { id: '75-100k', label: '$75k - $100k', count: 142 },
            { id: '100-150k', label: '$100k - $150k', count: 97 },
            { id: '150k+', label: '$150k+', count: 43 }
          ].map(salary => (
            <div key={salary.id} className="flex items-center">
              <input
                type="checkbox"
                id={`salary-${salary.id}`}
                checked={salaryRanges.includes(salary.id)}
                onChange={() => handleCheckboxChange('salaryRanges', salary.id)}
                className="w-4 h-4 accent-blue-500 mr-3"
              />
              <label htmlFor={`salary-${salary.id}`} className="flex justify-between w-full text-sm">
                {salary.label}
                <span className="text-gray-500">({salary.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Experience Level */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-4">Experience Level</h4>
        <div className="space-y-3">
          {[
            { id: 'entry', label: 'Entry Level', count: 95 },
            { id: 'mid', label: 'Mid Level', count: 173 },
            { id: 'senior', label: 'Senior Level', count: 112 }
          ].map(experience => (
            <div key={experience.id} className="flex items-center">
              <input
                type="checkbox"
                id={experience.id}
                checked={experienceLevels.includes(experience.id)}
                onChange={() => handleCheckboxChange('experienceLevels', experience.id)}
                className="w-4 h-4 accent-blue-500 mr-3"
              />
              <label htmlFor={experience.id} className="flex justify-between w-full text-sm">
                {experience.label}
                <span className="text-gray-500">({experience.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
} 