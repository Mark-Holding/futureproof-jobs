'use client'

import { useState } from 'react'

interface SkillProps {
  name: string;
  importance: 'critical' | 'high' | 'medium';
  description: string;
  resources: Array<{ name: string; link: string }>;
}

interface StageProps {
  level: string;
  stageName: string;
  description: string;
  skills: SkillProps[];
  filled: boolean;
  future?: boolean;
}

const SkillItem = ({ name, importance, description, resources }: SkillProps) => {
  const importanceClasses = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    medium: 'bg-blue-100 text-blue-700'
  };

  return (
    <div className="mb-4 p-3 border border-gray-200 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium text-gray-800">{name}</div>
        <div className={`text-xs px-2 py-1 rounded-full ${importanceClasses[importance]}`}>
          {importance.charAt(0).toUpperCase() + importance.slice(1)}
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-2">{description}</div>
      <div className="text-sm">
        <strong className="font-medium">Resources:</strong>{' '}
        {resources.map((resource, i) => (
          <span key={i}>
            <a href={resource.link} className="text-blue-600 hover:underline">
              {resource.name}
            </a>
            {i < resources.length - 1 ? ', ' : ''}
          </span>
        ))}
      </div>
    </div>
  );
};

const RoadmapStage = ({ level, stageName, description, skills, filled, future }: StageProps) => {
  const dotClasses = future
    ? 'border-2 border-dashed border-gray-300'
    : filled
    ? 'bg-blue-600'
    : 'border-2 border-blue-600';

  return (
    <div className="mb-6 relative">
      <div className="text-gray-500 text-sm font-medium mb-2">{level}</div>
      <div className="flex">
        <div className="mr-3 flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full ${dotClasses}`}></div>
          <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
        </div>
        <div className="flex-1">
          <div className="bg-white rounded-md shadow-sm p-4 border border-gray-200">
            <h4 className="text-lg font-bold text-blue-900 mb-1">{stageName}</h4>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            <div>
              {skills.map((skill, index) => (
                <SkillItem key={index} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SkillRoadmap() {
  const [activeSkill, setActiveSkill] = useState('emotional');

  // This would eventually come from your backend
  const skillTypes = [
    { id: 'all', label: 'All Skills' },
    { id: 'emotional', label: 'Emotional Intelligence' },
    { id: 'decision', label: 'Complex Decision Making' },
    { id: 'ethical', label: 'Ethical Judgment' },
    { id: 'creative', label: 'Creative Problem Solving' }
  ];

  const emotionalIntelligenceStages = [
    {
      level: 'Foundational',
      stageName: 'Emotional Awareness',
      description: 'Building fundamental capabilities in recognizing and understanding emotions in yourself and others',
      filled: true,
      skills: [
        {
          name: 'Self-Awareness Development',
          importance: 'critical' as const,
          description: 'Learning to recognize your own emotional states and how they influence your thoughts and behaviors.',
          resources: [
            { name: 'Emotional Intelligence Assessment', link: '#' },
            { name: 'Foundation Course', link: '#' }
          ]
        },
        {
          name: 'Basic Empathy Practice',
          importance: 'high' as const,
          description: 'Developing the ability to understand and share the feelings of others through active listening and observation.',
          resources: [
            { name: 'Empathy Workshop', link: '#' },
            { name: 'Practical Exercises', link: '#' }
          ]
        }
      ]
    },
    {
      level: 'Intermediate',
      stageName: 'Emotional Management',
      description: 'Developing capabilities to effectively manage emotions in yourself and navigate complex interpersonal situations',
      filled: true,
      skills: [
        {
          name: 'Emotion Regulation',
          importance: 'critical' as const,
          description: 'Learning techniques to manage emotional responses in challenging situations while maintaining effectiveness.',
          resources: [
            { name: 'Regulation Techniques Course', link: '#' },
            { name: 'Practice Scenarios', link: '#' }
          ]
        },
        {
          name: 'Advanced Empathetic Communication',
          importance: 'high' as const,
          description: 'Developing sophisticated communication approaches that demonstrate deep understanding of others\' perspectives.',
          resources: [
            { name: 'Communication Masterclass', link: '#' },
            { name: 'Role-Playing Exercises', link: '#' }
          ]
        }
      ]
    },
    {
      level: 'Advanced',
      stageName: 'Emotional Leadership',
      description: 'Applying emotional intelligence to lead and influence others effectively in complex environments',
      filled: false,
      skills: [
        {
          name: 'Organizational Emotional Intelligence',
          importance: 'critical' as const,
          description: 'Developing systems and cultures that foster emotional intelligence at the group and organizational level.',
          resources: [
            { name: 'Organizational EI Framework', link: '#' },
            { name: 'Case Studies', link: '#' }
          ]
        },
        {
          name: 'Cross-Cultural Emotional Intelligence',
          importance: 'high' as const,
          description: 'Navigating emotional dynamics across different cultural contexts and value systems effectively.',
          resources: [
            { name: 'Global EI Course', link: '#' },
            { name: 'Cultural Context Exercises', link: '#' }
          ]
        }
      ]
    },
    {
      level: 'Mastery',
      stageName: 'Transformational Emotional Intelligence',
      description: 'Creating significant positive change through advanced emotional intelligence in complex systems',
      filled: false,
      future: true,
      skills: [
        {
          name: 'Conflict Transformation',
          importance: 'critical' as const,
          description: 'Converting deep conflicts into opportunities for growth, innovation, and stronger relationships.',
          resources: [
            { name: 'Transformation Methodology', link: '#' },
            { name: 'Complex Case Studies', link: '#' }
          ]
        },
        {
          name: 'AI-Human Emotional Integration',
          importance: 'high' as const,
          description: 'Creating emotionally intelligent interfaces between humans and AI systems to optimize collaboration.',
          resources: [
            { name: 'EI in Technology Course', link: '#' },
            { name: 'Integration Projects', link: '#' }
          ]
        }
      ]
    }
  ];

  // We'd have similar data structures for the other skill types
  // For now, we'll just show emotional intelligence data

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-blue-900">Human Skills Progression Path</h3>
        <div className="flex space-x-2">
          {skillTypes.map((skill) => (
            <button
              key={skill.id}
              onClick={() => setActiveSkill(skill.id)}
              className={`py-1 px-3 text-sm rounded-full transition-colors ${
                activeSkill === skill.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {skill.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="roadmap-container">
          {emotionalIntelligenceStages.map((stage, index) => (
            <RoadmapStage
              key={index}
              level={stage.level}
              stageName={stage.stageName}
              description={stage.description}
              skills={stage.skills}
              filled={stage.filled}
              future={stage.future}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 