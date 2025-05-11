'use client';

import { useState, FormEvent, useEffect } from 'react';
import SkillCompositionTab from './SkillCompositionTab';
import ResistanceScaleSection from './ResistanceScaleSection';
import IndustryComparisonChart from './IndustryComparisonChart';
import HumanSkillsRanking from './HumanSkillsRanking';
import EmergingRolesSection from './EmergingRolesSection';
import TransformationPathwaysSection from './TransformationPathwaysSection';
import RegionalImpactTab from './RegionalImpactTab';
import JobSpecificResult from './JobSpecificResult';

const tabs = [
  { id: 'industry', label: 'Industry View' },
  { id: 'skills', label: 'Skill Composition' },
  { id: 'projections', label: 'Future Projections' },
  { id: 'regional', label: 'Regional Impact' }
];

export default function OverviewTabs() {
  const [activeTab, setActiveTab] = useState('industry');
  const [searchedJob, setSearchedJob] = useState<string | null>(null);
  
  // Function to handle search from the main search input
  // This will be called via global event listener
  useEffect(() => {
    // Function to handle the search event from the global search box
    const handleGlobalSearch = (event: CustomEvent) => {
      if (event.detail && event.detail.query) {
        setSearchedJob(event.detail.query);
      }
    };

    // Add event listener for the global search
    window.addEventListener('job-search', handleGlobalSearch as EventListener);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('job-search', handleGlobalSearch as EventListener);
    };
  }, []);

  const handleBackToOverview = () => {
    setSearchedJob(null);
    
    // Clear the global search input if needed
    const searchInput = document.querySelector('input[placeholder="Search for a specific job..."]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
  };

  return (
    <div>
      <div className="border-b border-gray-200 mb-8">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchedJob(null); // Clear search when switching tabs
              }}
              className={`px-6 py-4 text-base font-medium border-b-3 transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-500 border-blue-500 border-b-2'
                  : 'text-gray-500 border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Job Specific Result */}
      {activeTab === 'industry' && searchedJob && (
        <JobSpecificResult 
          jobTitle={searchedJob} 
          onBackToOverview={handleBackToOverview} 
        />
      )}
      
      {/* Regular Tab Content - Only shown when no job is searched */}
      {activeTab === 'industry' && !searchedJob && (
        <div>
          <ResistanceScaleSection />
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <IndustryComparisonChart />
            <HumanSkillsRanking />
          </div>
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <EmergingRolesSection />
            <TransformationPathwaysSection />
          </div>
        </div>
      )}
      
      {activeTab === 'skills' && <SkillCompositionTab />}
      
      {activeTab === 'projections' && (
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Future Projections</h2>
          <p className="text-gray-600">
            This tab will contain future projections content. Currently under development.
          </p>
        </div>
      )}
      
      {activeTab === 'regional' && <RegionalImpactTab />}
    </div>
  );
} 