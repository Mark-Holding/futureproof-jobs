'use client';

import React from 'react';

const resilienceFactors = [
  {
    title: 'Educational Infrastructure',
    icon: '🎓',
    factors: [
      {
        region: 'Scandinavia',
        score: 9.2,
        description: 'Exceptional lifelong learning systems with strong integration of human skills across curriculum',
        scoreClass: 'score-high'
      },
      {
        region: 'Singapore',
        score: 8.7,
        description: 'Agile educational system with rapid adaptation to emerging skills requirements',
        scoreClass: 'score-high'
      },
      {
        region: 'North America',
        score: 7.4,
        description: 'Strong higher education with some gaps in vocational training and retraining systems',
        scoreClass: 'score-medium'
      },
      {
        region: 'Sub-Saharan Africa',
        score: 4.8,
        description: 'Limited educational infrastructure with significant hurdles to widespread skill development',
        scoreClass: 'score-low'
      }
    ]
  },
  {
    title: 'Policy & Regulatory Environment',
    icon: '📜',
    factors: [
      {
        region: 'European Union',
        score: 8.9,
        description: 'Progressive policies on worker retraining, AI regulation, and social safety nets',
        scoreClass: 'score-high'
      },
      {
        region: 'Japan',
        score: 8.5,
        description: 'Strategic national AI initiatives with emphasis on human-machine collaboration',
        scoreClass: 'score-high'
      },
      {
        region: 'United States',
        score: 6.8,
        description: 'Mixed regulatory approach with strong innovation but limited worker protection',
        scoreClass: 'score-medium'
      },
      {
        region: 'Latin America',
        score: 5.2,
        description: 'Emerging policy frameworks but limited implementation and enforcement',
        scoreClass: 'score-low'
      }
    ]
  },
  {
    title: 'Workforce Adaptability',
    icon: '🔄',
    factors: [
      {
        region: 'Estonia',
        score: 9.0,
        description: 'Digital-native workforce with high mobility and continuous learning culture',
        scoreClass: 'score-high'
      },
      {
        region: 'Israel',
        score: 8.6,
        description: 'Entrepreneurial mindset with strong problem-solving and adaptability focus',
        scoreClass: 'score-high'
      },
      {
        region: 'Australia',
        score: 7.1,
        description: 'Good overall adaptability with some sector-specific resistance to change',
        scoreClass: 'score-medium'
      },
      {
        region: 'Southern Europe',
        score: 5.5,
        description: 'Structural employment challenges and slower digital transformation',
        scoreClass: 'score-low'
      }
    ]
  },
  {
    title: 'Innovation Ecosystem',
    icon: '💡',
    factors: [
      {
        region: 'Silicon Valley (USA)',
        score: 9.4,
        description: 'World-leading innovation hub with exceptional startup ecosystem and VC funding',
        scoreClass: 'score-high'
      },
      {
        region: 'South Korea',
        score: 8.8,
        description: 'Strong public-private R&D integration with high technological adoption rates',
        scoreClass: 'score-high'
      },
      {
        region: 'Germany',
        score: 7.5,
        description: 'Industrial innovation excellence but slower adaptation in some service sectors',
        scoreClass: 'score-medium'
      },
      {
        region: 'Eastern Europe',
        score: 5.0,
        description: 'Growing tech sectors but limited scale and investment in advanced technologies',
        scoreClass: 'score-low'
      }
    ]
  }
];

const getScoreColor = (score: number) => {
  if (score >= 8.5) return 'bg-emerald-100 text-emerald-700';
  if (score >= 7.0) return 'bg-blue-100 text-blue-700';
  if (score >= 5.5) return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
};

const ResilienceFactorsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resilienceFactors.map((factor, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
              <span>{factor.icon}</span>
              {factor.title}
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {factor.factors.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold ${getScoreColor(item.score)}`}>
                    {item.score}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">{item.region}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResilienceFactorsGrid; 