'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const hotspots = [
  {
    id: 'sf-seattle',
    name: 'San Francisco-Seattle Corridor',
    type: 'Growth Hub',
    description: 'Leading center for AI ethics, governance, and human-AI integration roles. Strong demand for specialized talent in AI oversight and trust.',
    stats: {
      jobGrowth: '+32%',
      avgSalary: '$145,000',
      skillDemand: 'Very High'
    },
    coordinates: { x: 15, y: 30 }
  },
  {
    id: 'singapore-malaysia',
    name: 'Singapore-Malaysia Corridor',
    type: 'Emerging Hub',
    description: 'Growing demand for AI-human collaboration specialists and digital transformation experts.',
    stats: {
      jobGrowth: '+28%',
      avgSalary: '$95,000',
      skillDemand: 'High'
    },
    coordinates: { x: 75, y: 45 }
  },
  {
    id: 'berlin-amsterdam',
    name: 'Berlin-Amsterdam Axis',
    type: 'Innovation Hub',
    description: 'European center for ethical AI development and human-centered technology design.',
    stats: {
      jobGrowth: '+25%',
      avgSalary: '$110,000',
      skillDemand: 'High'
    },
    coordinates: { x: 50, y: 25 }
  },
  {
    id: 'tel-aviv',
    name: 'Tel Aviv Tech Hub',
    type: 'Growth Hub',
    description: 'Strong focus on AI security, human-AI interaction, and emerging technology integration.',
    stats: {
      jobGrowth: '+30%',
      avgSalary: '$120,000',
      skillDemand: 'Very High'
    },
    coordinates: { x: 55, y: 35 }
  },
  {
    id: 'toronto',
    name: 'Toronto AI Hub',
    type: 'Emerging Hub',
    description: 'Growing center for AI research, healthcare AI, and responsible AI development.',
    stats: {
      jobGrowth: '+27%',
      avgSalary: '$105,000',
      skillDemand: 'High'
    },
    coordinates: { x: 20, y: 20 }
  }
];

const MigrationHotspots: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  const getHotspotTypeColor = (type: string) => {
    switch (type) {
      case 'Growth Hub':
        return 'bg-emerald-100 text-emerald-700';
      case 'Emerging Hub':
        return 'bg-blue-100 text-blue-700';
      case 'Innovation Hub':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="relative h-[500px] bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
        {/* Map Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/images/world-map.svg" 
            alt="World Map" 
            className="w-full h-full object-contain opacity-30"
          />
        </div>
        
        {/* Hotspots */}
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className={`absolute w-6 h-6 rounded-full cursor-pointer transition-all duration-300 
              flex items-center justify-center 
              ${selectedHotspot === hotspot.id || hoveredHotspot === hotspot.id
                ? 'bg-blue-500 scale-125 z-10'
                : 'bg-blue-300 hover:bg-blue-400'
              }`}
            style={{
              left: `${hotspot.coordinates.x}%`,
              top: `${hotspot.coordinates.y}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={() => setHoveredHotspot(hotspot.id)}
            onMouseLeave={() => setHoveredHotspot(null)}
            onClick={() => setSelectedHotspot(hotspot.id)}
          >
            <span className="text-white text-xs font-bold">+</span>
          </div>
        ))}

        {/* Tooltip */}
        {hoveredHotspot && (
          <div
            className="absolute bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-xs z-20"
            style={{
              left: `${hotspots.find(h => h.id === hoveredHotspot)?.coordinates.x}%`,
              top: `${hotspots.find(h => h.id === hoveredHotspot)?.coordinates.y}%`,
              transform: 'translate(-50%, -120%)'
            }}
          >
            <h4 className="font-semibold text-blue-900 mb-2">
              {hotspots.find(h => h.id === hoveredHotspot)?.name}
            </h4>
            <p className="text-sm text-gray-600">
              {hotspots.find(h => h.id === hoveredHotspot)?.description}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className={`bg-white rounded-lg border border-gray-200 p-4 cursor-pointer transition-all duration-300 ${
              selectedHotspot === hotspot.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedHotspot(hotspot.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-blue-900">{hotspot.name}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHotspotTypeColor(hotspot.type)}`}>
                {hotspot.type}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{hotspot.description}</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Job Growth</div>
                <div className="font-medium text-emerald-600">{hotspot.stats.jobGrowth}</div>
              </div>
              <div>
                <div className="text-gray-500">Avg. Salary</div>
                <div className="font-medium text-gray-900">{hotspot.stats.avgSalary}</div>
              </div>
              <div>
                <div className="text-gray-500">Skill Demand</div>
                <div className="font-medium text-blue-600">{hotspot.stats.skillDemand}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MigrationHotspots; 