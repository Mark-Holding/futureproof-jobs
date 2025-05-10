import Header from '../components/Header'
import Footer from '../components/Footer'
import PersonalizedPathPlanner from '../components/career-paths/PersonalizedPathPlanner'
import PathwayArchetypeCard from '../components/career-paths/PathwayArchetypeCard'
import MilestoneTimeline from '../components/career-paths/MilestoneTimeline'
import SkillRoadmap from '../components/career-paths/SkillRoadmap'
import SuccessStoryCard from '../components/career-paths/SuccessStoryCard'
import IndustryGuidance from '../components/career-paths/IndustryGuidance'

export default function CareerPathsPage() {
  // Pathway archetypes data
  const pathwayArchetypes = [
    {
      title: 'The Specialist',
      subtitle: 'Deepening expertise in human-centric domains',
      icon: '🔬',
      description: 'This career path focuses on developing profound expertise in areas that require uniquely human capabilities. By continuously deepening knowledge in fields that resist automation, specialists maintain high value even as AI advances.',
      characteristics: [
        'Continuous specialization in areas requiring human judgment',
        'Development of rare, high-value expertise difficult for AI to replicate',
        'Focus on depth rather than breadth of knowledge',
        'Strong emphasis on credentials and recognized expertise',
        'Cultivating the ability to handle complex, non-standard cases'
      ]
    },
    {
      title: 'The Overseer',
      subtitle: 'Guiding and governing AI systems',
      icon: '👁️',
      description: 'Overseers develop expertise in managing, evaluating, and improving AI systems. Rather than competing with automation, they ensure it operates effectively, ethically, and safely while maintaining human control over critical decisions.',
      characteristics: [
        'Ability to understand AI capabilities and limitations',
        'Focus on evaluation and quality control of AI outputs',
        'Emphasis on ethical considerations and governance',
        'Development of frameworks for responsible automation',
        'Deep understanding of when human judgment should override algorithms'
      ]
    },
    {
      title: 'The Integrator',
      subtitle: 'Connecting human needs with technological solutions',
      icon: '🔄',
      description: 'Integrators bridge the gap between technical possibilities and human requirements. They excel at understanding both human and AI capabilities, designing solutions that maximize the strengths of each while creating seamless interactions.',
      characteristics: [
        'Strong emphasis on communication across technical and non-technical domains',
        'Ability to translate between human needs and technological capabilities',
        'Focus on creating effective human-AI collaboration models',
        'Adaptability to rapidly changing technological environments',
        'Development of expertise in human experience design'
      ]
    }
  ];
  
  // Success stories data
  const successStories = [
    {
      name: 'Jennifer Thompson',
      initials: 'JT',
      fromRole: 'Financial Analyst',
      toRole: 'AI Ethics Consultant',
      pathwayType: 'The Overseer Path',
      narrative: [
        "When I saw financial analysis roles increasingly being automated, I realized I needed to pivot. Instead of competing with AI, I chose to leverage my deep understanding of financial systems to oversee and ensure ethical implementation of AI in finance. I took specialized courses in AI ethics while working part-time, built a network in the emerging field, and positioned myself as someone who understood both the technical and human sides of financial AI systems.",
        "After 18 months of focused effort, I landed my first role as an AI Ethics Consultant for a major financial services firm. Now, three years later, I lead a team that evaluates algorithmic fairness and ensures regulatory compliance across multiple AI implementations. My career is now more secure than ever, and I'm helping shape how AI is deployed responsibly."
      ],
      beforeAfterSkills: {
        before: {
          role: 'Financial Analyst',
          skills: [
            { name: 'Financial Modeling', level: 85 },
            { name: 'Data Analysis', level: 80 },
            { name: 'Regulatory Knowledge', level: 65 },
            { name: 'Technical Documentation', level: 60 }
          ]
        },
        after: {
          role: 'AI Ethics Consultant',
          skills: [
            { name: 'Ethical Framework Development', level: 90 },
            { name: 'Algorithmic Fairness Assessment', level: 85 },
            { name: 'Cross-functional Communication', level: 80 },
            { name: 'AI Governance', level: 75 }
          ]
        }
      }
    },
    {
      name: 'Michael Rodriguez',
      initials: 'MR',
      fromRole: 'Customer Service Rep',
      toRole: 'Experience Design Strategist',
      pathwayType: 'The Integrator Path',
      narrative: [
        "As chatbots and automation began handling routine customer inquiries, I knew my role would need to evolve. I decided to leverage my deep understanding of customer pain points and communication to move into designing better customer experiences that combine human touch with automation. I enrolled in a UX design program with a focus on conversational interfaces, and started contributing to our company's automation strategy.",
        "By positioning myself as someone who understood both the customer and the technology, I created a unique value proposition. Within two years, I transitioned to an Experience Design Strategist role where I now lead the development of our human-AI customer service model, defining when and how human intervention should complement automated systems."
      ],
      beforeAfterSkills: {
        before: {
          role: 'Customer Service Rep',
          skills: [
            { name: 'Customer Communication', level: 90 },
            { name: 'Problem Resolution', level: 75 },
            { name: 'Product Knowledge', level: 80 },
            { name: 'Data Entry', level: 60 }
          ]
        },
        after: {
          role: 'Experience Design Strategist',
          skills: [
            { name: 'User Experience Design', level: 85 },
            { name: 'Service Blueprint Creation', level: 80 },
            { name: 'Human-AI Collaboration Modeling', level: 90 },
            { name: 'Stakeholder Management', level: 75 }
          ]
        }
      }
    }
  ];
  
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Strategic Career Path Planning</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build a long-term career trajectory that remains valuable throughout the AI transformation
            </p>
          </div>
          
          {/* Personalized Path Planner */}
          <section id="path-planner" className="mb-16">
            <PersonalizedPathPlanner />
          </section>
          
          {/* FutureProof Pathway Archetypes */}
          <section id="pathway-archetypes" className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">FutureProof Pathway Archetypes</h2>
              <p className="text-gray-600">Explore successful career evolution models with high resistance to automation</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pathwayArchetypes.map((archetype, index) => (
                <PathwayArchetypeCard
                  key={index}
                  title={archetype.title}
                  subtitle={archetype.subtitle}
                  icon={archetype.icon}
                  description={archetype.description}
                  characteristics={archetype.characteristics}
                />
              ))}
            </div>
          </section>
          
          {/* Transition Planning Timeline */}
          <section id="milestone-timeline" className="mb-16">
            <MilestoneTimeline />
          </section>
          
          {/* Skill Development Roadmaps */}
          <section id="skill-roadmap" className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">Skill Development Roadmaps</h2>
              <p className="text-gray-600">Visual progression paths for building automation-resistant capabilities</p>
            </div>
            
            <SkillRoadmap />
          </section>
          
          {/* Success Stories & Case Studies */}
          <section id="success-stories" className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">Success Stories & Case Studies</h2>
              <p className="text-gray-600">Real-world examples of successful career adaptations in the age of AI</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {successStories.map((story, index) => (
                <SuccessStoryCard
                  key={index}
                  name={story.name}
                  initials={story.initials}
                  fromRole={story.fromRole}
                  toRole={story.toRole}
                  pathwayType={story.pathwayType}
                  narrative={story.narrative}
                  beforeAfterSkills={story.beforeAfterSkills}
                />
              ))}
            </div>
          </section>
          
          {/* Industry-Specific Guidance */}
          <section id="industry-guidance" className="mb-16">
            <IndustryGuidance />
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
} 