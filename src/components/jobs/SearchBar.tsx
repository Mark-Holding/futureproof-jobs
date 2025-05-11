'use client'

import { useState } from 'react'

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('high-resistance')

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md -mt-6 relative z-10">
      <div className="flex flex-col md:flex-row mb-6">
        <input
          type="text"
          placeholder="Job title, skills, or keywords..."
          className="flex-1 p-4 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-4 px-8 rounded-r-lg transition-colors">
          Search Jobs
        </button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <div 
          className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-colors ${
            activeFilter === 'high-resistance' 
              ? 'bg-blue-100 border border-blue-500 text-blue-800' 
              : 'bg-gray-100 hover:bg-gray-200 border border-transparent'
          }`}
          onClick={() => handleFilterClick('high-resistance')}
        >
          <div className="w-4 h-4 rounded-full bg-green-400 mr-2"></div>
          High Resistance (90%+)
        </div>
        
        <div 
          className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-colors ${
            activeFilter === 'medium-resistance' 
              ? 'bg-blue-100 border border-blue-500 text-blue-800' 
              : 'bg-gray-100 hover:bg-gray-200 border border-transparent'
          }`}
          onClick={() => handleFilterClick('medium-resistance')}
        >
          <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
          Medium Resistance (70-89%)
        </div>
        
        <div 
          className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-colors ${
            activeFilter === 'at-risk' 
              ? 'bg-blue-100 border border-blue-500 text-blue-800' 
              : 'bg-gray-100 hover:bg-gray-200 border border-transparent'
          }`}
          onClick={() => handleFilterClick('at-risk')}
        >
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          At Risk (Below 70%)
        </div>
        
        <div 
          className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-colors ${
            activeFilter === 'remote' 
              ? 'bg-blue-100 border border-blue-500 text-blue-800' 
              : 'bg-gray-100 hover:bg-gray-200 border border-transparent'
          }`}
          onClick={() => handleFilterClick('remote')}
        >
          Remote Friendly
        </div>
        
        <div 
          className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-colors ${
            activeFilter === 'entry-level' 
              ? 'bg-blue-100 border border-blue-500 text-blue-800' 
              : 'bg-gray-100 hover:bg-gray-200 border border-transparent'
          }`}
          onClick={() => handleFilterClick('entry-level')}
        >
          Entry Level
        </div>
        
        <div 
          className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-colors ${
            activeFilter === 'recent' 
              ? 'bg-blue-100 border border-blue-500 text-blue-800' 
              : 'bg-gray-100 hover:bg-gray-200 border border-transparent'
          }`}
          onClick={() => handleFilterClick('recent')}
        >
          Posted This Week
        </div>
      </div>
    </div>
  )
} 