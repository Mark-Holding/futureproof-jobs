'use client'

import { useState } from 'react';
import { CareerPathResult } from '../../../data/dummyCareerPathResults';

interface TransitionPointsProps {
  steps: CareerPathResult['transitionPoints']['steps'];
}

export default function TransitionPoints({ steps }: TransitionPointsProps) {
  const [activeStep, setActiveStep] = useState(0);
  
  return (
    <div className="transition-points mb-12">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Career Transition Strategy</h2>
      
      <div className="transition-tabs flex mb-6 border-b border-gray-200">
        {steps.map((step, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
              activeStep === index
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveStep(index)}
          >
            {step.title}
          </button>
        ))}
      </div>
      
      <div className="transition-content bg-blue-50 rounded-lg p-6">
        <div className="transition-header mb-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-blue-800">{steps[activeStep].title}</h3>
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {steps[activeStep].timing}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed">{steps[activeStep].details}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Challenges */}
          <div className="transition-challenges">
            <h4 className="text-lg font-medium text-blue-800 mb-3">Key Challenges</h4>
            <ul className="space-y-2">
              {steps[activeStep].challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-red-600">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Strategies */}
          <div className="transition-strategies">
            <h4 className="text-lg font-medium text-blue-800 mb-3">Success Strategies</h4>
            <ul className="space-y-2">
              {steps[activeStep].strategies.map((strategy, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-green-600">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{strategy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Timeline Navigation */}
        <div className="transition-nav flex justify-between mt-8 pt-4 border-t border-blue-100">
          <button
            className={`px-3 py-1.5 rounded text-sm font-medium flex items-center ${
              activeStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-800'
            }`}
            onClick={() => activeStep > 0 && setActiveStep(activeStep - 1)}
            disabled={activeStep === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Previous Transition
          </button>
          
          <button
            className={`px-3 py-1.5 rounded text-sm font-medium flex items-center ${
              activeStep === steps.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-800'
            }`}
            onClick={() => activeStep < steps.length - 1 && setActiveStep(activeStep + 1)}
            disabled={activeStep === steps.length - 1}
          >
            Next Transition
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 