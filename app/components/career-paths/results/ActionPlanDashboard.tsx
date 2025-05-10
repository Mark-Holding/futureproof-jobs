'use client'

import { useState } from 'react';
import { CareerPathResult } from '../../../data/dummyCareerPathResults';

interface ActionPlanDashboardProps {
  actionPlan: CareerPathResult['actionPlan'];
}

export default function ActionPlanDashboard({ actionPlan }: ActionPlanDashboardProps) {
  const [activeTimeframe, setActiveTimeframe] = useState<'30day' | '90day'>('30day');
  
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'now':
        return 'bg-red-100 text-red-700';
      case 'soon':
        return 'bg-yellow-100 text-yellow-700';
      case 'planned':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'now':
        return 'Start Now';
      case 'soon':
        return 'Start Soon';
      case 'planned':
        return 'Planned';
      default:
        return 'Undefined';
    }
  };
  
  return (
    <div className="action-plan-dashboard">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Your Action Plan Dashboard</h2>
      
      <div className="plan-tabs flex border-b border-gray-200 mb-6">
        <button 
          className={`plan-tab px-4 py-2 font-medium text-sm border-b-2 -mb-px ${activeTimeframe === '30day' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTimeframe('30day')}
        >
          30-Day Quick Wins
        </button>
        <button 
          className={`plan-tab px-4 py-2 font-medium text-sm border-b-2 -mb-px ${activeTimeframe === '90day' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTimeframe('90day')}
        >
          90-Day Deep Progress
        </button>
      </div>
      
      <div className="plan-content">
        <div className="action-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actionPlan[activeTimeframe].actions.map((action, index) => (
            <div key={index} className="action-card bg-gray-50 rounded-lg p-5 shadow-sm border border-gray-200">
              <div className="action-header flex justify-between items-start mb-4">
                <h3 className="action-title text-lg font-semibold text-gray-800">{action.title}</h3>
                <span className={`action-priority px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(action.priority)}`}>
                  {getPriorityLabel(action.priority)}
                </span>
              </div>
              
              <div className="action-items space-y-4">
                {action.steps.map((step, stepIdx) => (
                  <div key={stepIdx} className="action-step flex">
                    <div className="step-checkbox">
                      <input 
                        type="checkbox" 
                        id={`action-${index}-step-${stepIdx}`} 
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="step-content">
                      <label 
                        htmlFor={`action-${index}-step-${stepIdx}`}
                        className="step-text text-gray-700 block mb-1 cursor-pointer"
                      >
                        {step.text}
                      </label>
                      <div className="step-timeline text-gray-500 text-sm">
                        {step.timeline}
                      </div>
                      
                      {step.resources && step.resources.length > 0 && (
                        <div className="step-resources mt-2 flex flex-wrap items-center">
                          <span className="resources-label text-gray-500 text-sm">Resources:</span>
                          <div className="flex flex-wrap gap-2">
                            {step.resources.map((resource, resIdx) => (
                              <a 
                                key={resIdx} 
                                href={resource.url} 
                                className="resource-link text-blue-600 hover:underline text-sm"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <div className="text-sm text-gray-500">
          Track your progress to transition effectively
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          Export Action Plan
        </button>
      </div>
    </div>
  );
} 