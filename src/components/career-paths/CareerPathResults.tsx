'use client'

import { useState } from 'react'
import { CareerPathResult } from '@/lib/data/dummyCareerPathResults'
import ResultsHeader from './results/ResultsHeader'
import ExecutiveSummary from './results/ExecutiveSummary'
import CareerTimeline from './results/CareerTimeline'
import SkillsDevelopment from './results/SkillsDevelopment'
import TransitionPoints from './results/TransitionPoints'
import AIResistanceStrategy from './results/AIResistanceStrategy'
import SuccessStories from './results/SuccessStories'
import ActionPlanDashboard from './results/ActionPlanDashboard'

interface CareerPathResultsProps {
  data: CareerPathResult;
  onReset?: () => void;
}

export default function CareerPathResults({ data, onReset }: CareerPathResultsProps) {
  // State for loading (for future API integration)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-xl text-blue-800">Generating your personalized career path...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-8">
        <h3 className="text-xl font-semibold text-red-800 mb-3">Error Generating Results</h3>
        <p className="text-red-700 mb-4">{error}</p>
        <button 
          onClick={onReset}
          className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="results-container bg-white rounded-lg shadow-xl overflow-hidden max-w-6xl mx-auto">
      {/* Header Section */}
      <ResultsHeader 
        user={data.user} 
        automationRisk={data.automationRisk} 
        onReset={onReset}
      />
      
      {/* Main Content */}
      <div className="p-6 md:p-8">
        {/* Executive Summary */}
        <ExecutiveSummary 
          paragraphs={data.executiveSummary.paragraphs} 
          highlights={data.executiveSummary.highlights} 
        />
        
        {/* Career Timeline */}
        <CareerTimeline 
          milestones={data.careerTimeline.milestones} 
          alternatePaths={data.careerTimeline.alternatePaths} 
        />
        
        {/* Skills Development */}
        <SkillsDevelopment 
          currentSkills={data.skillsDevelopment.currentSkills}
          requiredSkills={data.skillsDevelopment.requiredSkills}
          recommendedCourses={data.skillsDevelopment.recommendedCourses}
        />
        
        {/* Transition Points */}
        <TransitionPoints 
          steps={data.transitionPoints.steps} 
        />
        
        {/* AI Resistance Strategy */}
        <AIResistanceStrategy 
          overview={data.aiResistanceStrategy.overview}
          keyStrategies={data.aiResistanceStrategy.keyStrategies}
          uniqueAdvantages={data.aiResistanceStrategy.uniqueAdvantages}
        />
        
        {/* Success Stories */}
        <SuccessStories 
          stories={data.successStories} 
        />
        
        {/* Action Plan Dashboard */}
        <ActionPlanDashboard 
          actionPlan={data.actionPlan} 
        />
        
        {/* Bottom Actions */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
          <button
            onClick={onReset}
            className="px-5 py-2.5 bg-white border border-blue-500 text-blue-700 hover:bg-blue-50 rounded-md transition-colors font-medium"
          >
            Start Over
          </button>
          
          <div className="flex space-x-3">
            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium">
              Download PDF
            </button>
            <button className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors font-medium">
              Email Results
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 