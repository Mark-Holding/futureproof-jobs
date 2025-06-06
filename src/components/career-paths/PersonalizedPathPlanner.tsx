'use client'

import { useState } from 'react'
import dummyCareerPathResults from '@/lib/data/dummyCareerPathResults'
import CareerPathResults from './CareerPathResults'

export default function PersonalizedPathPlanner() {
  const [formData, setFormData] = useState({
    currentJobTitle: '',
    industry: '',
    yearsOfExperience: '',
    educationLevel: '',
    skills: ['Project Management', 'Content Creation', 'Data Analysis', 'Team Leadership'],
    desiredRole: '',
    targetIndustry: '',
    topPriority: '',
    timeline: '',
    workEnvironment: '',
    learningStyle: '',
    riskTolerance: '',
    relocationWillingness: ''
  })

  const [newSkill, setNewSkill] = useState('')
  const [resultsGenerated, setResultsGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault()
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleGenerateResults = () => {
    // Simulate API call with loading state
    setIsGenerating(true)
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsGenerating(false)
      setResultsGenerated(true)
    }, 1500)
  }

  const handleReset = () => {
    setResultsGenerated(false)
    setFormData({
      currentJobTitle: '',
      industry: '',
      yearsOfExperience: '',
      educationLevel: '',
      skills: ['Project Management', 'Content Creation', 'Data Analysis', 'Team Leadership'],
      desiredRole: '',
      targetIndustry: '',
      topPriority: '',
      timeline: '',
      workEnvironment: '',
      learningStyle: '',
      riskTolerance: '',
      relocationWillingness: ''
    })
  }

  // If results are generated, show the results component
  if (resultsGenerated) {
    return <CareerPathResults data={dummyCareerPathResults} onReset={handleReset} />
  }

  // Loading state
  if (isGenerating) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-12 min-h-[400px] flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Generating Your Career Path</h3>
          <p className="text-gray-600">Analyzing your profile and mapping optimal transitions...</p>
        </div>
      </div>
    )
  }

  // Display the form
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Your Personalized Path Planner</h2>
        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium">
          Save Plan
        </button>
      </div>
      
      {/* CURRENT POSITION */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold text-blue-800 mb-4">
          <span className="flex items-center justify-center bg-blue-100 text-blue-800 rounded-full w-6 h-6 mr-2 text-sm font-bold">1</span>
          Current Position
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Current Job Title</label>
            <input 
              type="text" 
              name="currentJobTitle"
              value={formData.currentJobTitle}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="e.g., Marketing Specialist"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select 
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Industry</option>
              <option value="tech">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
            <input 
              type="number" 
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="e.g., 5"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Education Level</label>
            <select 
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Education Level</option>
              <option value="highschool">High School</option>
              <option value="associate">Associate's Degree</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD or Doctorate</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* YOUR SKILLS */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold text-blue-800 mb-4">
          <span className="flex items-center justify-center bg-blue-100 text-blue-800 rounded-full w-6 h-6 mr-2 text-sm font-bold">2</span>
          Your Skills
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {skill}
              <button 
                onClick={() => handleRemoveSkill(skill)} 
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div>
          <input 
            type="text" 
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleAddSkill}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Add a skill..."
          />
        </div>
      </div>
      
      {/* CAREER GOALS */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold text-blue-800 mb-4">
          <span className="flex items-center justify-center bg-blue-100 text-blue-800 rounded-full w-6 h-6 mr-2 text-sm font-bold">3</span>
          Career Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Desired Role (5-Year Goal)</label>
            <input 
              type="text" 
              name="desiredRole"
              value={formData.desiredRole}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="e.g., Marketing Director"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Target Industry</label>
            <select 
              name="targetIndustry"
              value={formData.targetIndustry}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Industry</option>
              <option value="tech">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Top Priority</label>
            <select 
              name="topPriority"
              value={formData.topPriority}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Priority</option>
              <option value="stability">Long-term Stability</option>
              <option value="growth">Career Growth</option>
              <option value="salary">Salary Potential</option>
              <option value="impact">Social Impact</option>
              <option value="balance">Work-Life Balance</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Timeline for Transition</label>
            <select 
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Timeline</option>
              <option value="immediate">Immediate (0-6 months)</option>
              <option value="short">Short-term (6-12 months)</option>
              <option value="medium">Medium-term (1-2 years)</option>
              <option value="long">Long-term (3-5 years)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* ADAPTATION PREFERENCES */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold text-blue-800 mb-4">
          <span className="flex items-center justify-center bg-blue-100 text-blue-800 rounded-full w-6 h-6 mr-2 text-sm font-bold">4</span>
          Adaptation Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Preferred Work Environment</label>
            <select 
              name="workEnvironment"
              value={formData.workEnvironment}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Preference</option>
              <option value="remote">Fully Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Learning Style</label>
            <select 
              name="learningStyle"
              value={formData.learningStyle}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Learning Style</option>
              <option value="structured">Structured Courses</option>
              <option value="selfpaced">Self-Paced Learning</option>
              <option value="projectbased">Project-Based</option>
              <option value="mentorship">Mentorship</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Risk Tolerance</label>
            <select 
              name="riskTolerance"
              value={formData.riskTolerance}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Risk Tolerance</option>
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Willingness to Relocate</label>
            <select 
              name="relocationWillingness"
              value={formData.relocationWillingness}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Willingness</option>
              <option value="unwilling">Unwilling to Relocate</option>
              <option value="limited">Limited Locations Only</option>
              <option value="open">Open to Relocation</option>
              <option value="eager">Eager to Relocate</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* SUBMIT BUTTON */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={handleGenerateResults}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md hover:from-blue-700 hover:to-blue-900 transition-colors font-medium text-lg shadow-md"
        >
          Generate Career Path
        </button>
      </div>
    </div>
  )
} 