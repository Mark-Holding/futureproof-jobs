'use client'

import { useState } from 'react'

interface IndustryDataProps {
  title: string;
  description: string;
  roleOpportunities: {
    title: string;
    roles: Array<{
      name: string;
      description: string;
      automation: string;
      salary: string;
      growth: string;
    }>;
  };
  transitionStrategies: {
    title: string;
    strategies: Array<{
      name: string;
      description: string;
    }>;
  };
}

const industryData: Record<string, IndustryDataProps> = {
  tech: {
    title: 'Technology',
    description: 'The technology sector continues to evolve rapidly with AI integration, creating both disruption and new opportunities for specialized human roles that partner with automation.',
    roleOpportunities: {
      title: 'Emerging Role Opportunities',
      roles: [
        {
          name: 'AI Ethics Specialist',
          description: 'Evaluates AI systems for bias, fairness, and ethical implications, developing governance frameworks for responsible AI implementation.',
          automation: 'Very Low',
          salary: '$120-180K',
          growth: '+35% (5yr)'
        },
        {
          name: 'Human-AI Collaboration Designer',
          description: 'Creates workflows and interfaces that optimize collaboration between human workers and AI systems to maximize complementary strengths.',
          automation: 'Low',
          salary: '$95-140K',
          growth: '+28% (5yr)'
        },
        {
          name: 'Digital Transformation Consultant',
          description: 'Helps organizations adapt their culture, workforce, and processes to effectively integrate AI and automation technologies.',
          automation: 'Low',
          salary: '$110-165K',
          growth: '+22% (5yr)'
        }
      ]
    },
    transitionStrategies: {
      title: 'Tech Industry Transition Strategies',
      strategies: [
        {
          name: 'Develop Domain-Specific AI Knowledge',
          description: 'While generalized tech roles may face automation pressure, specializing in specific industry applications of AI creates high-value expertise that combines technical and domain knowledge.'
        },
        {
          name: 'Focus on Human-Machine Synergy Skills',
          description: 'Build capabilities in areas where human judgment complements AI capabilities, such as developing sophisticated prompting techniques, validating AI-generated outputs, or designing effective human-in-the-loop systems.'
        },
        {
          name: 'Build AI Governance Expertise',
          description: 'Develop knowledge in regulatory compliance, ethical frameworks, and governance structures for AI implementation as organizations face increasing scrutiny of their AI deployments.'
        }
      ]
    }
  },
  healthcare: {
    title: 'Healthcare',
    description: 'Healthcare is experiencing a digital revolution with AI diagnostics and automation, but continues to highly value human empathy, judgment, and specialized medical expertise.',
    roleOpportunities: {
      title: 'Emerging Role Opportunities',
      roles: [
        {
          name: 'Clinical AI Integration Specialist',
          description: 'Bridges the gap between clinical expertise and AI capabilities, ensuring that automation enhances rather than replaces human care.',
          automation: 'Very Low',
          salary: '$90-130K',
          growth: '+42% (5yr)'
        },
        {
          name: 'Healthcare Experience Designer',
          description: 'Creates patient and provider experiences that blend technology with human touch for optimal healthcare delivery.',
          automation: 'Low',
          salary: '$85-120K',
          growth: '+25% (5yr)'
        },
        {
          name: 'Preventive Care Coordinator',
          description: 'Develops personalized preventive health plans using AI predictions and analytics while providing the human guidance necessary for behavioral change.',
          automation: 'Medium',
          salary: '$75-110K',
          growth: '+30% (5yr)'
        }
      ]
    },
    transitionStrategies: {
      title: 'Healthcare Industry Transition Strategies',
      strategies: [
        {
          name: 'Develop AI-Enhanced Clinical Skills',
          description: 'Build expertise in using AI diagnostic and decision support tools while maintaining a strong foundation in clinical reasoning and patient evaluation that goes beyond what algorithms can provide.'
        },
        {
          name: 'Focus on Integrative Care Approaches',
          description: 'Develop expertise in coordinating complex care that requires synthesizing insights from multiple sources, including AI analytics, specialist recommendations, and patient preferences.'
        },
        {
          name: 'Specialize in High-Touch Patient Communication',
          description: 'Even as routine interactions might be automated, build advanced capabilities in difficult conversations, behavior change facilitation, and emotional support during health challenges.'
        }
      ]
    }
  },
  finance: {
    title: 'Finance',
    description: 'The financial sector is integrating AI for data processing and analytics, creating demand for professionals who can provide nuanced judgment and relationship-based services.',
    roleOpportunities: {
      title: 'Emerging Role Opportunities',
      roles: [
        {
          name: 'AI Risk Manager',
          description: 'Evaluates algorithmic trading systems, automated loan processing, and other AI financial tools for risk, compliance, and unintended consequences.',
          automation: 'Very Low',
          salary: '$140-190K',
          growth: '+38% (5yr)'
        },
        {
          name: 'Financial Impact Strategist',
          description: 'Helps organizations navigate the complex ethical, social, and economic impacts of their financial decisions in an AI-powered economy.',
          automation: 'Low',
          salary: '$125-180K',
          growth: '+20% (5yr)'
        },
        {
          name: 'Client Relationship Orchestrator',
          description: 'Manages high-value client relationships using a blend of personal connection and AI-enhanced insights to provide highly customized financial guidance.',
          automation: 'Low',
          salary: '$95-150K',
          growth: '+15% (5yr)'
        }
      ]
    },
    transitionStrategies: {
      title: 'Finance Industry Transition Strategies',
      strategies: [
        {
          name: 'Develop Algorithmic Oversight Expertise',
          description: 'Build specialized knowledge in evaluating, testing, and governing financial algorithms to detect biases, vulnerabilities, or regulatory compliance issues that require human judgment.'
        },
        {
          name: 'Focus on Complex Client Advisory Services',
          description: 'Develop advanced capabilities in areas where personal relationships and human judgment remain valuable, such as high-net-worth advising, complex scenario planning, or values-based financial guidance.'
        },
        {
          name: 'Build Cross-Disciplinary Financial Knowledge',
          description: 'Cultivate expertise that spans multiple domains such as finance, sustainability, geopolitics, and technology trends to provide integrative insights that narrow AI tools cannot match.'
        }
      ]
    }
  }
};

export default function IndustryGuidance() {
  const [activeIndustry, setActiveIndustry] = useState('tech');
  const industries = Object.keys(industryData);
  
  const currentIndustry = industryData[activeIndustry];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Industry-Specific Guidance</h2>
      <p className="text-gray-600 mb-6">Tailored career evolution strategies for high-impact sectors</p>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setActiveIndustry(industry)}
              className={`py-3 px-6 font-medium transition-colors ${
                activeIndustry === industry
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {industryData[industry].title}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-blue-800 mb-2">{currentIndustry.title}</h3>
        <p className="text-gray-700 mb-6">{currentIndustry.description}</p>
        
        {/* Emerging Roles */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-blue-700 mb-4">{currentIndustry.roleOpportunities.title}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentIndustry.roleOpportunities.roles.map((role, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <h5 className="font-bold text-blue-900 mb-2">{role.name}</h5>
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                <div className="text-sm">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Automation Risk:</span>
                    <span className="font-medium text-gray-800">{role.automation}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Salary Range:</span>
                    <span className="font-medium text-gray-800">{role.salary}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Projected Growth:</span>
                    <span className="font-medium text-green-600">{role.growth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Transition Strategies */}
        <div>
          <h4 className="text-lg font-semibold text-blue-700 mb-4">{currentIndustry.transitionStrategies.title}</h4>
          <div className="space-y-4">
            {currentIndustry.transitionStrategies.strategies.map((strategy, idx) => (
              <div key={idx} className="border-l-4 border-blue-500 pl-4 py-1">
                <h5 className="font-semibold text-gray-800 mb-1">{strategy.name}</h5>
                <p className="text-sm text-gray-600">{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 