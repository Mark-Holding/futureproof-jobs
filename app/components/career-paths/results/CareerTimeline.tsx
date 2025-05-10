'use client'

import { useState } from 'react';
import { CareerPathResult } from '../../../data/dummyCareerPathResults';

interface CareerTimelineProps {
  milestones: CareerPathResult['careerTimeline']['milestones'];
  alternatePaths: CareerPathResult['careerTimeline']['alternatePaths'];
}

export default function CareerTimeline({ milestones, alternatePaths }: CareerTimelineProps) {
  const [activeView, setActiveView] = useState<'roles' | 'skills' | 'financial'>('roles');

  return (
    <div className="career-timeline mb-12">
      <div className="timeline-header flex items-end justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Your Personalized Career Timeline</h2>
        <div className="timeline-views flex border-b border-gray-200">
          <button 
            className={`timeline-view px-4 py-2 font-medium text-sm border-b-2 -mb-px ${activeView === 'roles' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveView('roles')}
          >
            Role Progression
          </button>
          <button 
            className={`timeline-view px-4 py-2 font-medium text-sm border-b-2 -mb-px ${activeView === 'skills' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveView('skills')}
          >
            Skill Development
          </button>
          <button 
            className={`timeline-view px-4 py-2 font-medium text-sm border-b-2 -mb-px ${activeView === 'financial' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveView('financial')}
          >
            Financial Projection
          </button>
        </div>
      </div>
      
      <div className="timeline-visualization bg-blue-50 p-6 rounded-lg relative overflow-hidden">
        {/* Timeline Track */}
        <div className="timeline-track relative h-1 bg-blue-200 my-6">
          <div 
            className="track-progress absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500" 
            style={{ width: '20%' }}
          />
        </div>
        
        {/* Timeline Milestones */}
        <div className="timeline-milestones flex justify-between w-full relative mb-10">
          {milestones.map((milestone, index) => (
            <div key={index} className="timeline-milestone flex flex-col items-center" style={{ width: `${100 / milestones.length}%` }}>
              <div className={`milestone-dot w-5 h-5 rounded-full border-2 ${milestone.isCurrent ? 'bg-blue-500 border-blue-500' : 'bg-white border-blue-300'}`} />
              <div className="milestone-date text-sm font-medium text-blue-800 mt-2 mb-1">{milestone.date}</div>
              <div className="milestone-role text-base font-semibold text-center">{milestone.role}</div>
              <div className="milestone-company text-sm text-gray-600 text-center">{milestone.company}</div>
            </div>
          ))}
        </div>
        
        {/* Alternate Paths */}
        {activeView === 'roles' && (
          <div className="alternate-paths relative">
            <div className="flex justify-between mb-2">
              <div className="text-sm font-medium text-blue-800 ml-10">Alternative Paths:</div>
            </div>
            <div className="alternate-path-wrapper flex items-start">
              {alternatePaths.map((path, index) => (
                <div 
                  key={index}
                  className="alternate-path-item flex items-center"
                  style={{ 
                    marginLeft: `${(parseInt(path.date.split('-')[0]) / 5) * 100}%`,
                    position: 'absolute', 
                    top: index * 30 + 'px'
                  }}
                >
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <div className="text-sm text-gray-700">{path.role}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skill Development View */}
        {activeView === 'skills' && (
          <div className="skills-timeline py-4">
            <div className="text-center text-gray-500 italic mb-6">
              Skill development trajectory visualization will appear here, showing how skills advance over time along your career path.
            </div>
            <div className="grid grid-cols-5 gap-4">
              {['Technical', 'Strategic', 'Leadership', 'Creative', 'Ethical'].map((category, i) => (
                <div key={i} className="skill-category">
                  <div className="text-sm font-medium text-blue-800 mb-2">{category} Skills</div>
                  <div className="h-24 bg-white rounded border border-blue-100 flex items-end p-2">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-green-400 rounded"
                      style={{ height: `${20 + (i * 15)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Financial Projection View */}
        {activeView === 'financial' && (
          <div className="financial-timeline py-4">
            <div className="text-center text-gray-500 italic mb-6">
              Financial projections will appear here, showing potential salary increases as you progress along your career path.
            </div>
            <div className="financial-chart h-40 bg-white rounded-lg border border-blue-100 p-4 flex items-end">
              {[1, 2, 3, 4, 5].map((year, i) => (
                <div key={i} className="financial-bar relative flex-1 mx-1">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-green-400 rounded"
                    style={{ height: `${30 + (i * 15)}%` }}
                  />
                  <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-600">
                    Year {year}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-right">
              <div className="text-sm text-gray-600">Projected 5-Year Salary Growth</div>
              <div className="text-lg font-bold text-blue-900">+65%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 