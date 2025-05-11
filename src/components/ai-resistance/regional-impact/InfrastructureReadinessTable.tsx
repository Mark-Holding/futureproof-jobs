'use client';

import React, { useState } from 'react';

const regions = [
  {
    name: 'North America',
    digitalInfrastructure: 92,
    educationSystem: 88,
    policyFramework: 85,
    workforceAdaptability: 90,
    innovationEcosystem: 95
  },
  {
    name: 'Europe',
    digitalInfrastructure: 90,
    educationSystem: 85,
    policyFramework: 92,
    workforceAdaptability: 88,
    innovationEcosystem: 88
  },
  {
    name: 'Asia Pacific',
    digitalInfrastructure: 88,
    educationSystem: 82,
    policyFramework: 78,
    workforceAdaptability: 85,
    innovationEcosystem: 90
  },
  {
    name: 'Latin America',
    digitalInfrastructure: 75,
    educationSystem: 70,
    policyFramework: 65,
    workforceAdaptability: 78,
    innovationEcosystem: 72
  },
  {
    name: 'Middle East',
    digitalInfrastructure: 82,
    educationSystem: 75,
    policyFramework: 70,
    workforceAdaptability: 80,
    innovationEcosystem: 78
  },
  {
    name: 'Africa',
    digitalInfrastructure: 65,
    educationSystem: 60,
    policyFramework: 55,
    workforceAdaptability: 70,
    innovationEcosystem: 65
  }
];

const getScoreColor = (score: number) => {
  if (score >= 90) return 'bg-emerald-100 text-emerald-700';
  if (score >= 80) return 'bg-blue-100 text-blue-700';
  if (score >= 70) return 'bg-amber-100 text-amber-700';
  if (score >= 60) return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
};

const InfrastructureReadinessTable: React.FC = () => {
  const [sortField, setSortField] = useState<keyof typeof regions[0]>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof typeof regions[0]) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedRegions = [...regions].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return sortDirection === 'asc'
      ? a[sortField] - b[sortField]
      : b[sortField] - a[sortField];
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Region
              {sortField === 'name' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('digitalInfrastructure')}
            >
              Digital Infrastructure
              {sortField === 'digitalInfrastructure' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('educationSystem')}
            >
              Education System
              {sortField === 'educationSystem' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('policyFramework')}
            >
              Policy Framework
              {sortField === 'policyFramework' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('workforceAdaptability')}
            >
              Workforce Adaptability
              {sortField === 'workforceAdaptability' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('innovationEcosystem')}
            >
              Innovation Ecosystem
              {sortField === 'innovationEcosystem' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedRegions.map((region) => (
            <tr key={region.name} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{region.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(region.digitalInfrastructure)}`}>
                  {region.digitalInfrastructure}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(region.educationSystem)}`}>
                  {region.educationSystem}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(region.policyFramework)}`}>
                  {region.policyFramework}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(region.workforceAdaptability)}`}>
                  {region.workforceAdaptability}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(region.innovationEcosystem)}`}>
                  {region.innovationEcosystem}%
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfrastructureReadinessTable; 