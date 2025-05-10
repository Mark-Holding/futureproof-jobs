import React from 'react';
import GlobalAutomationMap from './regional-impact/GlobalAutomationMap';
import ResilienceFactorsGrid from './regional-impact/ResilienceFactorsGrid';
import MigrationHotspots from './regional-impact/MigrationHotspots';
import TransformationModels from './regional-impact/TransformationModels';
import SkillsVariationGrid from './regional-impact/SkillsVariationGrid';
import InfrastructureReadinessTable from './regional-impact/InfrastructureReadinessTable';

const RegionalImpactTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Global Automation Impact Map</h2>
          <p className="text-gray-600">
            Interactive visualization of automation risk levels across different regions
          </p>
        </div>
        <GlobalAutomationMap />
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Regional Resilience Factors</h2>
          <p className="text-gray-600">
            Key factors that make certain regions more resistant to automation and AI disruption
          </p>
        </div>
        <ResilienceFactorsGrid />
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Migration & Opportunity Hotspots</h2>
          <p className="text-gray-600">
            Emerging job centers and talent migration patterns based on automation impacts
          </p>
        </div>
        <MigrationHotspots />
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Regional Transformation Models</h2>
          <p className="text-gray-600">
            Case studies of different regional approaches to workforce transformation
          </p>
        </div>
        <TransformationModels />
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Regional Skills Variation</h2>
          <p className="text-gray-600">
            How skill demands and priorities vary across different regions
          </p>
        </div>
        <SkillsVariationGrid />
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Infrastructure Readiness Assessment</h2>
          <p className="text-gray-600">
            Evaluation of regional infrastructure readiness for AI integration
          </p>
        </div>
        <InfrastructureReadinessTable />
      </div>
    </div>
  );
};

export default RegionalImpactTab; 