'use client'

import { useState } from 'react'

interface ResourceProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
  icon: string;
}

const Resource = ({ title, description, link, linkText, icon }: ResourceProps) => (
  <div className="flex items-start p-4 border border-gray-200 rounded-lg bg-white mb-3 shadow-sm hover:shadow-md transition-shadow">
    <div className="text-2xl mr-4 text-blue-500">{icon}</div>
    <div>
      <div className="font-medium text-blue-900 mb-1">{title}</div>
      <div className="text-sm text-gray-600 mb-2">{description}</div>
      <a href={link} className="text-sm text-green-600 font-medium hover:text-green-700 transition-colors">
        {linkText} →
      </a>
    </div>
  </div>
);

export default function MilestoneTimeline() {
  const [activeTab, setActiveTab] = useState('preparation');

  // These would ideally come from your backend/API
  const timeframes = [
    { id: 'preparation', label: 'Preparation Phase' },
    { id: 'transition', label: 'Transition Period' },
    { id: 'establishment', label: 'Establishment' },
    { id: 'advancement', label: 'Advancement' }
  ];

  const resources = {
    preparation: [
      {
        title: 'Career Goals Objectives Setting Workshop',
        description: 'Guided process for defining clear, achievable career transition goals with measurable outcomes.',
        link: '#',
        linkText: 'Join Workshop',
        icon: '🎯'
      },
      {
        title: 'Mentor Matching Service',
        description: 'Connect with experienced professionals who have successfully navigated similar career transitions.',
        link: '#',
        linkText: 'Find Mentors',
        icon: '👥'
      },
      {
        title: 'Skills Gap Analysis Tool',
        description: 'Identify specific capabilities you need to develop for your target career path.',
        link: '#',
        linkText: 'Start Analysis',
        icon: '🔍'
      }
    ],
    transition: [
      {
        title: 'Portfolio Building Framework',
        description: 'Create compelling evidence of your transferable skills and new capabilities.',
        link: '#',
        linkText: 'Build Portfolio',
        icon: '📂'
      },
      {
        title: 'Transition Narrative Development',
        description: 'Craft a compelling story that explains your career shift in interviews and networking.',
        link: '#',
        linkText: 'Develop Narrative',
        icon: '📝'
      },
      {
        title: 'Industry Immersion Events',
        description: 'Connect with professionals in your target field through structured networking opportunities.',
        link: '#',
        linkText: 'Browse Events',
        icon: '🤝'
      }
    ],
    establishment: [
      {
        title: 'Early Role Success Strategies',
        description: 'Proven approaches for exceeding expectations in your first 90 days in a new field.',
        link: '#',
        linkText: 'Access Strategies',
        icon: '🚀'
      },
      {
        title: 'Professional Identity Workshop',
        description: 'Rebuild your professional brand to align with your new career trajectory.',
        link: '#',
        linkText: 'Join Workshop',
        icon: '🔄'
      },
      {
        title: 'Peer Support Circles',
        description: 'Join a community of professionals who have recently made similar career transitions.',
        link: '#',
        linkText: 'Find Support',
        icon: '⭕'
      }
    ],
    advancement: [
      {
        title: 'Leadership Development Path',
        description: 'Structured progression plan for advancing to leadership roles in your new field.',
        link: '#',
        linkText: 'Start Path',
        icon: '📈'
      },
      {
        title: 'Advanced Certification Guide',
        description: 'Roadmap for obtaining specialized credentials that accelerate career progression.',
        link: '#',
        linkText: 'View Guide',
        icon: '🏆'
      },
      {
        title: 'Thought Leadership Program',
        description: 'Build recognition as an innovative thinker and problem-solver in your new industry.',
        link: '#',
        linkText: 'Explore Program',
        icon: '💡'
      }
    ]
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-12">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Transition Planning Timeline</h2>
      
      <div className="mb-6 relative">
        <div className="flex space-x-4 border-b border-gray-200">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.id}
              onClick={() => setActiveTab(timeframe.id)}
              className={`py-2 px-4 text-sm font-medium transition-colors relative ${
                activeTab === timeframe.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="timeline-resources">
        {resources[activeTab as keyof typeof resources].map((resource, index) => (
          <Resource
            key={index}
            title={resource.title}
            description={resource.description}
            link={resource.link}
            linkText={resource.linkText}
            icon={resource.icon}
          />
        ))}
      </div>
    </div>
  );
} 