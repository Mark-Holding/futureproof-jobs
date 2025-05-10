'use client';

import React, { useState } from 'react';

const transformationModels = [
  {
    id: 'nordic',
    name: 'Nordic Model',
    region: 'Scandinavia',
    description: 'Focus on lifelong learning and social safety nets',
    keyFeatures: [
      'Universal access to education and training',
      'Strong social safety nets',
      'Public-private partnerships for reskilling',
      'Emphasis on human-AI collaboration'
    ],
    outcomes: {
      successRate: '92%',
      jobRetention: '85%',
      skillUpgrade: '78%'
    },
    challenges: [
      'High implementation costs',
      'Requires strong public sector',
      'Cultural adaptation needed'
    ]
  },
  {
    id: 'singapore',
    name: 'Singapore Model',
    region: 'Singapore',
    description: 'Rapid adaptation and skills future program',
    keyFeatures: [
      'SkillsFuture initiative',
      'Industry-led training programs',
      'Digital readiness assessment',
      'Continuous learning culture'
    ],
    outcomes: {
      successRate: '88%',
      jobRetention: '82%',
      skillUpgrade: '85%'
    },
    challenges: [
      'Resource-intensive',
      'Requires strong government coordination',
      'Needs industry buy-in'
    ]
  },
  {
    id: 'german',
    name: 'German Model',
    region: 'Germany',
    description: 'Dual education system and vocational training',
    keyFeatures: [
      'Apprenticeship programs',
      'Industry-academic partnerships',
      'Vocational training centers',
      'Job rotation schemes'
    ],
    outcomes: {
      successRate: '85%',
      jobRetention: '80%',
      skillUpgrade: '75%'
    },
    challenges: [
      'Long implementation time',
      'Cultural barriers',
      'Industry coordination needed'
    ]
  },
  {
    id: 'estonian',
    name: 'Estonian Model',
    region: 'Estonia',
    description: 'Digital-first approach with e-residency',
    keyFeatures: [
      'Digital skills programs',
      'E-residency initiative',
      'Remote work infrastructure',
      'Tech startup ecosystem'
    ],
    outcomes: {
      successRate: '90%',
      jobRetention: '88%',
      skillUpgrade: '92%'
    },
    challenges: [
      'Digital divide risks',
      'Infrastructure requirements',
      'Cybersecurity concerns'
    ]
  }
];

const TransformationModels: React.FC = () => {
  const [activeModel, setActiveModel] = useState(transformationModels[0].id);

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto gap-4 pb-2">
        {transformationModels.map((model) => (
          <button
            key={model.id}
            onClick={() => setActiveModel(model.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeModel === model.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {model.name}
          </button>
        ))}
      </div>

      {transformationModels.map((model) => (
        <div
          key={model.id}
          className={`bg-white rounded-lg border border-gray-200 p-6 ${
            activeModel === model.id ? 'block' : 'hidden'
          }`}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-900 mb-1">{model.name}</h3>
              <p className="text-gray-600">{model.description}</p>
            </div>
            <div className="text-sm text-gray-500">{model.region}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
              <ul className="space-y-2">
                {model.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Outcomes</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">Success Rate</div>
                  <div className="text-lg font-semibold text-emerald-600">{model.outcomes.successRate}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">Job Retention</div>
                  <div className="text-lg font-semibold text-blue-600">{model.outcomes.jobRetention}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">Skill Upgrade</div>
                  <div className="text-lg font-semibold text-purple-600">{model.outcomes.skillUpgrade}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Challenges</h4>
            <div className="flex flex-wrap gap-2">
              {model.challenges.map((challenge, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm"
                >
                  {challenge}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransformationModels; 