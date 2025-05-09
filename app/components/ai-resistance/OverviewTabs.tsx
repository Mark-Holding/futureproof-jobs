'use client';

import { useState } from 'react';

const tabs = [
  { id: 'industry', label: 'Industry View' },
  { id: 'skills', label: 'Skill Composition' },
  { id: 'projections', label: 'Future Projections' },
  { id: 'regional', label: 'Regional Impact' }
];

export default function OverviewTabs() {
  const [activeTab, setActiveTab] = useState('industry');

  return (
    <div className="border-b border-gray-200 mb-8">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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
  );
} 