export interface CareerPathResult {
  user: {
    name: string;
    currentPosition: string;
    pathwayType: string;
    generationDate: string;
  };
  automationRisk: {
    score: number;
    label: string;
  };
  executiveSummary: {
    paragraphs: string[];
    highlights: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  careerTimeline: {
    milestones: {
      date: string;
      role: string;
      company: string;
      isCurrent: boolean;
    }[];
    alternatePaths: {
      role: string;
      date: string;
    }[];
  };
  skillsDevelopment: {
    currentSkills: {
      name: string;
      level: number;
      category: string;
    }[];
    requiredSkills: {
      name: string;
      currentLevel: number;
      targetLevel: number;
      timeframe: string;
      category: string;
    }[];
    recommendedCourses: {
      title: string;
      provider: string;
      level: string;
      url: string;
      duration: string;
    }[];
  };
  transitionPoints: {
    steps: {
      title: string;
      timing: string;
      details: string;
      challenges: string[];
      strategies: string[];
    }[];
  };
  aiResistanceStrategy: {
    overview: string;
    keyStrategies: {
      title: string;
      description: string;
      implementation: string[];
    }[];
    uniqueAdvantages: string[];
  };
  successStories: {
    title: string;
    person: string;
    quote: string;
    details: string[];
    outcome: string;
  }[];
  actionPlan: {
    "30day": {
      actions: {
        title: string;
        priority: "now" | "soon" | "planned";
        steps: {
          text: string;
          timeline: string;
          resources?: {
            title: string;
            url: string;
          }[];
        }[];
      }[];
    };
    "90day": {
      actions: {
        title: string;
        priority: "now" | "soon" | "planned";
        steps: {
          text: string;
          timeline: string;
          resources?: {
            title: string;
            url: string;
          }[];
        }[];
      }[];
    };
  };
}

const dummyCareerPathResults: CareerPathResult = {
  user: {
    name: "Sarah Johnson",
    currentPosition: "Marketing Specialist at TechCorp",
    pathwayType: "Recommended Pathway: The Integrator",
    generationDate: "Generated on May 10, 2025"
  },
  automationRisk: {
    score: 35,
    label: "Current Role Automation Risk"
  },
  executiveSummary: {
    paragraphs: [
      "Based on your profile as a Marketing Specialist with strong creative and analytical skills, we recommend the \"Integrator\" pathway to leverage your unique human capabilities alongside advancing AI systems. Your current role faces a moderate automation risk of 35%, primarily in data analysis and basic content creation aspects.",
      "We've mapped a 5-year trajectory toward becoming a Human-AI Marketing Strategist, where you'll lead the integration of AI tools with human creativity and relationship-building to deliver high-impact marketing campaigns. This role has a projected 92% resistance to automation and leverages your existing skills while developing new capabilities in AI collaboration."
    ],
    highlights: [
      {
        icon: "🎯",
        title: "Destination Role",
        description: "Human-AI Marketing Strategist at a technology or creative agency (92% resistance score)"
      },
      {
        icon: "⏱️",
        title: "Timeline",
        description: "5-year progressive path with two strategic intermediate roles"
      },
      {
        icon: "🧠",
        title: "Key Skills to Develop",
        description: "AI-Human Collaboration, Strategic Marketing, Emotional Intelligence, Systems Thinking"
      },
      {
        icon: "🔄",
        title: "Transferable Strengths",
        description: "Creative Content Development, Analytics Understanding, Client Communication"
      }
    ]
  },
  careerTimeline: {
    milestones: [
      {
        date: "Present",
        role: "Marketing Specialist",
        company: "TechCorp",
        isCurrent: true
      },
      {
        date: "1-2 Years",
        role: "Content Strategist",
        company: "Digital Agency",
        isCurrent: false
      },
      {
        date: "2-3 Years",
        role: "AI-Enhanced Marketing Lead",
        company: "Tech or Creative Firm",
        isCurrent: false
      },
      {
        date: "4-5 Years",
        role: "Human-AI Marketing Strategist",
        company: "Leading Agency or In-house",
        isCurrent: false
      },
      {
        date: "Beyond",
        role: "Marketing Innovation Director",
        company: "Enterprise or Consultancy",
        isCurrent: false
      }
    ],
    alternatePaths: [
      {
        role: "Brand Experience Director",
        date: "4-5 Years"
      },
      {
        role: "Marketing AI Consultant",
        date: "3-4 Years"
      }
    ]
  },
  skillsDevelopment: {
    currentSkills: [
      {
        name: "Content Creation",
        level: 85,
        category: "Creative"
      },
      {
        name: "Social Media Strategy",
        level: 75,
        category: "Strategic"
      },
      {
        name: "Data Analysis",
        level: 60,
        category: "Technical"
      },
      {
        name: "Client Communication",
        level: 80,
        category: "Interpersonal"
      },
      {
        name: "Project Management",
        level: 70,
        category: "Administrative"
      },
      {
        name: "Basic Automation Tools",
        level: 50,
        category: "Technical"
      }
    ],
    requiredSkills: [
      {
        name: "AI Tool Proficiency",
        currentLevel: 40,
        targetLevel: 85,
        timeframe: "1-2 Years",
        category: "Technical"
      },
      {
        name: "Strategic Marketing",
        currentLevel: 65,
        targetLevel: 90,
        timeframe: "2-3 Years",
        category: "Strategic"
      },
      {
        name: "Cross-functional Leadership",
        currentLevel: 55,
        targetLevel: 80,
        timeframe: "3-4 Years",
        category: "Leadership"
      },
      {
        name: "Human-AI Collaboration",
        currentLevel: 30,
        targetLevel: 95,
        timeframe: "4-5 Years",
        category: "Emerging"
      },
      {
        name: "Ethical Technology Use",
        currentLevel: 45,
        targetLevel: 85,
        timeframe: "2-3 Years",
        category: "Values"
      },
      {
        name: "Narrative Strategy",
        currentLevel: 70,
        targetLevel: 90,
        timeframe: "1-2 Years",
        category: "Creative"
      }
    ],
    recommendedCourses: [
      {
        title: "AI for Marketing Professionals",
        provider: "Digital Marketing Institute",
        level: "Intermediate",
        url: "#",
        duration: "8 Weeks"
      },
      {
        title: "Strategic Thinking in the Age of AI",
        provider: "Harvard Business School Online",
        level: "Advanced",
        url: "#",
        duration: "6 Weeks"
      },
      {
        title: "Ethical Implications of Marketing Technology",
        provider: "LinkedIn Learning",
        level: "Intermediate",
        url: "#",
        duration: "4 Weeks"
      },
      {
        title: "Marketing Innovation Leadership",
        provider: "Cornell Tech",
        level: "Advanced",
        url: "#",
        duration: "10 Weeks"
      }
    ]
  },
  transitionPoints: {
    steps: [
      {
        title: "Marketing Specialist → Content Strategist",
        timing: "1-2 Years",
        details: "Focus on developing deeper narrative capabilities and begin integrating AI tools into your content creation workflow while building strategic planning skills.",
        challenges: [
          "Competition from other content creators",
          "Need to demonstrate strategic thinking beyond execution",
          "Learning to effectively use AI content tools"
        ],
        strategies: [
          "Build a portfolio of strategic content campaigns",
          "Develop expertise in a specific industry vertical",
          "Take courses in AI-assisted content creation",
          "Network with professionals in digital agencies"
        ]
      },
      {
        title: "Content Strategist → AI-Enhanced Marketing Lead",
        timing: "2-3 Years",
        details: "Leverage your content strategy background to lead broader marketing initiatives while developing expertise in human-AI collaboration models.",
        challenges: [
          "Need to develop team leadership skills",
          "Understanding the technical aspects of marketing AI",
          "Balancing automation with human creativity"
        ],
        strategies: [
          "Seek opportunities to lead cross-functional projects",
          "Pursue technical training in marketing technology",
          "Develop frameworks for human-AI collaboration",
          "Build relationships with AI developers/engineers"
        ]
      },
      {
        title: "AI-Enhanced Marketing Lead → Human-AI Marketing Strategist",
        timing: "4-5 Years",
        details: "Position yourself as an expert in creating integrated human-AI marketing systems that maximize the strengths of both human creativity and AI capabilities.",
        challenges: [
          "Rapidly evolving technology landscape",
          "Need for both strategic vision and technical understanding",
          "Convincing stakeholders of the value of hybrid approaches"
        ],
        strategies: [
          "Publish thought leadership on human-AI marketing integration",
          "Develop measurable success cases from your work",
          "Build a network of both creative and technical professionals",
          "Consider specialized certification in AI ethics and governance"
        ]
      }
    ]
  },
  aiResistanceStrategy: {
    overview: "As marketing automation becomes increasingly sophisticated, your path to resilience lies in developing the uniquely human capabilities to guide, contextualize, and enhance AI-driven marketing systems rather than competing with them directly.",
    keyStrategies: [
      {
        title: "Creative Direction of AI Systems",
        description: "Develop the ability to effectively prompt, direct, and curate AI-generated marketing content to achieve strategic goals that reflect human values and emotional intelligence.",
        implementation: [
          "Practice prompt engineering specifically for marketing content",
          "Learn to effectively review and refine AI-generated materials",
          "Build frameworks for ensuring brand consistency across AI outputs",
          "Develop skills in optimizing the human-AI creative workflow"
        ]
      },
      {
        title: "Contextual Strategy Development",
        description: "Cultivate expertise in understanding broader business and cultural contexts that AI systems cannot fully grasp, allowing you to develop marketing strategies that connect with human audiences on deeper levels.",
        implementation: [
          "Deepen industry-specific knowledge beyond what's available in training data",
          "Study behavioral psychology and cultural trends",
          "Develop skills in identifying unstructured opportunities",
          "Build expertise in translating business goals to human narratives"
        ]
      },
      {
        title: "Ethical Oversight and Governance",
        description: "Position yourself as an expert in ensuring AI marketing systems operate ethically, with appropriate oversight and in alignment with human values and regulatory requirements.",
        implementation: [
          "Study emerging ethical frameworks for AI in marketing",
          "Develop expertise in privacy regulations and responsible data use",
          "Build skills in bias detection and mitigation in marketing algorithms",
          "Learn to create governance processes for AI marketing systems"
        ]
      }
    ],
    uniqueAdvantages: [
      "Deep understanding of human emotional response to marketing that AI cannot replicate",
      "Ability to build authentic relationships with clients and stakeholders",
      "Creativity that extends beyond pattern recognition to true innovation",
      "Ethical judgment that ensures marketing remains responsible and human-centered",
      "Contextual understanding of business needs that transcends data-driven insights"
    ]
  },
  successStories: [
    {
      title: "From Traditional Marketing to AI Integration Leadership",
      person: "Michael Torres, Former Digital Marketing Manager",
      quote: "I didn't fight the AI wave - I learned to surf it by becoming the bridge between creative teams and automation systems.",
      details: [
        "Started as a traditional marketing manager with minimal technical experience",
        "Focused on learning how AI tools worked while maintaining creative oversight",
        "Positioned himself as the 'translator' between technical and creative teams",
        "Developed frameworks for determining which tasks should be human-led vs. AI-driven"
      ],
      outcome: "Now leads a 15-person Human-AI Marketing team at a major agency, commanding a salary 85% higher than his previous role with excellent job security."
    },
    {
      title: "Creating a Specialized AI-Resistant Niche",
      person: "Jennifer Qasim, Former Content Writer",
      quote: "I niched down into highly regulated industries where AI needs human oversight, making my skills more valuable, not less.",
      details: [
        "Recognized her content creation role was vulnerable to AI automation",
        "Specialized in financial and healthcare marketing with complex compliance requirements",
        "Developed expertise in ensuring AI-assisted content met regulatory standards",
        "Created systems for efficient human review of AI-generated regulated content"
      ],
      outcome: "Now works as a Compliance Strategy Director for an AI marketing platform, ensuring their tools meet regulatory requirements across industries."
    }
  ],
  actionPlan: {
    "30day": {
      actions: [
        {
          title: "AI Tool Proficiency Development",
          priority: "now",
          steps: [
            {
              text: "Identify and learn 3 key AI marketing tools currently used in the industry",
              timeline: "Weeks 1-2",
              resources: [
                {
                  title: "AI Marketing Tools Landscape Report",
                  url: "#"
                },
                {
                  title: "LinkedIn Learning: Marketing Automation Fundamentals",
                  url: "#"
                }
              ]
            },
            {
              text: "Complete the 'AI for Marketing Professionals' introductory course",
              timeline: "Weeks 2-4",
              resources: [
                {
                  title: "Digital Marketing Institute Course",
                  url: "#"
                }
              ]
            },
            {
              text: "Create a sample project using AI tools to enhance your current marketing work",
              timeline: "Weeks 3-4",
              resources: []
            }
          ]
        },
        {
          title: "Strategic Skill Development",
          priority: "soon",
          steps: [
            {
              text: "Conduct an analysis of a successful integrated human-AI marketing campaign",
              timeline: "Week 2",
              resources: [
                {
                  title: "Case Study: Nike's AI-Enhanced Personalization Campaign",
                  url: "#"
                }
              ]
            },
            {
              text: "Begin reading 'Marketing in the Age of AI' book",
              timeline: "Weeks 1-4",
              resources: [
                {
                  title: "Marketing in the Age of AI: HBR Book",
                  url: "#"
                }
              ]
            },
            {
              text: "Schedule informational interviews with 2-3 people in Content Strategy roles",
              timeline: "Weeks 3-4",
              resources: []
            }
          ]
        },
        {
          title: "Network Development",
          priority: "planned",
          steps: [
            {
              text: "Join marketing technology communities and forums",
              timeline: "Week 1",
              resources: [
                {
                  title: "MarTech Today Slack Community",
                  url: "#"
                },
                {
                  title: "AI in Marketing LinkedIn Group",
                  url: "#"
                }
              ]
            },
            {
              text: "Attend virtual MarTech conference",
              timeline: "Week 3",
              resources: [
                {
                  title: "MarTech Virtual Conference Registration",
                  url: "#"
                }
              ]
            }
          ]
        }
      ]
    },
    "90day": {
      actions: [
        {
          title: "Content Strategy Portfolio Development",
          priority: "now",
          steps: [
            {
              text: "Create a strategic content plan that integrates AI tools for a sample company",
              timeline: "Months 1-2",
              resources: [
                {
                  title: "Strategic Content Planning Template",
                  url: "#"
                }
              ]
            },
            {
              text: "Develop case studies from your current work that highlight strategic thinking",
              timeline: "Months 2-3",
              resources: []
            },
            {
              text: "Build a personal brand highlighting your AI-human marketing integration expertise",
              timeline: "Months 1-3",
              resources: [
                {
                  title: "Personal Branding for Marketing Professionals",
                  url: "#"
                }
              ]
            }
          ]
        },
        {
          title: "Skills Certification",
          priority: "soon",
          steps: [
            {
              text: "Complete Content Strategy certification course",
              timeline: "Months 1-3",
              resources: [
                {
                  title: "Northwestern Content Strategy Certification",
                  url: "#"
                }
              ]
            },
            {
              text: "Finish AI Marketing Tools certification",
              timeline: "Months 2-3",
              resources: [
                {
                  title: "HubSpot AI Marketing Tools Certification",
                  url: "#"
                }
              ]
            }
          ]
        },
        {
          title: "Career Transition Preparation",
          priority: "planned",
          steps: [
            {
              text: "Research target companies for Content Strategist roles",
              timeline: "Month 1",
              resources: []
            },
            {
              text: "Update resume and LinkedIn to highlight strategic and AI integration skills",
              timeline: "Month 2",
              resources: [
                {
                  title: "Resume Template for Strategic Marketing Roles",
                  url: "#"
                }
              ]
            },
            {
              text: "Begin informational interviews with digital agencies",
              timeline: "Month 3",
              resources: []
            }
          ]
        }
      ]
    }
  }
};

export default dummyCareerPathResults; 