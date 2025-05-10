import { FC } from 'react';

interface JobSpecificResultProps {
  jobTitle: string;
  onBackToOverview: () => void;
}

const JobSpecificResult: FC<JobSpecificResultProps> = ({ 
  jobTitle, 
  onBackToOverview 
}) => {
  // Hardcoded data for Clinical Psychology Therapist
  const jobData = {
    title: "Clinical Psychology Therapist",
    industry: "Healthcare & Mental Health",
    resistanceScore: 83,
    resistanceCategory: "High Resistance",
    stabilityTimeline: "Core role stable through 2040 with evolving responsibilities",
    details: {
      industryCategory: "Healthcare",
      salaryRange: "$70,000 - $120,000",
      growthProjection: "+14% (2025-2035)",
      educationRequired: "Master's/Doctorate",
      resistanceRank: "Top 15%"
    },
    humanValueFactors: [
      "Deep interpersonal empathy and emotional connection that AI cannot replicate",
      "Complex ethical judgment in highly nuanced human situations",
      "Ability to build authentic therapeutic relationships based on trust",
      "Cultural and contextual awareness in treatment approaches",
      "Creative adaptation of therapeutic techniques to individual needs"
    ],
    vulnerabilityFactors: [
      "Initial intake and assessment processes could be partially automated",
      "Some standard therapeutic techniques may be delivered by AI for basic cases",
      "Data-driven treatment recommendation systems will augment decision making",
      "Administrative and documentation aspects are highly automatable",
      "Some clients may accept AI-assisted therapy for cost or accessibility reasons"
    ],
    skillsContribution: [
      { name: "Empathy & Emotional Intelligence", value: 9.5, color: "bg-emerald-500" },
      { name: "Ethical Judgment", value: 9.0, color: "bg-red-500" },
      { name: "Complex Decision-Making", value: 8.5, color: "bg-amber-500" },
      { name: "Creative Adaptation", value: 8.0, color: "bg-purple-500" },
      { name: "Physical Presence", value: 7.0, color: "bg-indigo-500" }
    ],
    transformationPathway: [
      {
        period: "2025-2028",
        title: "Administrative Automation",
        description: "AI systems will handle most administrative tasks, including note-taking, scheduling, and basic documentation, freeing therapists to focus more on direct client care."
      },
      {
        period: "2028-2032",
        title: "Assessment Augmentation",
        description: "AI will provide data-enriched client assessments, detecting patterns and subtle indicators that complement the therapist's clinical judgment and help personalize treatment plans."
      },
      {
        period: "2032-2038",
        title: "Therapeutic Collaboration",
        description: "Therapists will increasingly collaborate with AI systems that offer evidence-based intervention suggestions and track client progress through multimodal data analysis, while maintaining human leadership of the therapeutic relationship."
      },
      {
        period: "2038-2045",
        isFuture: true,
        title: "Specialization in Complex Cases",
        description: "Human therapists will increasingly focus on complex cases, trauma work, and situations requiring high ethical judgment, while AI handles more routine therapeutic support under human supervision."
      }
    ],
    recommendations: [
      {
        icon: "🧠",
        title: "Advanced Therapeutic Specialization",
        description: "Develop expertise in complex therapeutic approaches that require deep human insight, such as trauma-informed care, complex grief work, or specialized modalities that require high contextual awareness."
      },
      {
        icon: "🤖",
        title: "AI-Augmented Therapy Skills",
        description: "Learn to effectively integrate AI tools into your practice, including how to evaluate AI-generated insights, maintain clinical leadership while using supportive technologies, and blend human and artificial intelligence for optimal client outcomes."
      },
      {
        icon: "🌐",
        title: "Cross-Cultural Therapeutic Competence",
        description: "Strengthen ability to work effectively across diverse cultural contexts, as cultural nuance and sensitivity will remain challenging for AI systems to fully replicate for the foreseeable future."
      }
    ],
    aiTools: [
      { icon: "📊", name: "Predictive Analytics" },
      { icon: "🗣️", name: "NLP Systems" },
      { icon: "📱", name: "Therapeutic Apps" },
      { icon: "🧪", name: "Outcome Tracking" },
      { icon: "🔍", name: "Research Synthesis" },
      { icon: "🔒", name: "Secure Telehealth" }
    ],
    similarRoles: [
      {
        name: "Specialized Trauma Therapist",
        resistance: { value: "92%", category: "very-high" },
        overlap: 85,
        difficulty: { level: "Easy", category: "easy" }
      },
      {
        name: "Family Systems Therapist",
        resistance: { value: "90%", category: "very-high" },
        overlap: 80,
        difficulty: { level: "Easy", category: "easy" }
      },
      {
        name: "Psychiatric Nurse Practitioner",
        resistance: { value: "86%", category: "high" },
        overlap: 65,
        difficulty: { level: "Challenging", category: "challenging" }
      },
      {
        name: "Occupational Therapist",
        resistance: { value: "85%", category: "high" },
        overlap: 55,
        difficulty: { level: "Moderate", category: "moderate" }
      },
      {
        name: "Health Systems Navigator",
        resistance: { value: "84%", category: "high" },
        overlap: 60,
        difficulty: { level: "Moderate", category: "moderate" }
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-200">
        <button 
          onClick={onBackToOverview}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-md text-gray-600 border border-gray-200"
        >
          ← Back to Overview
        </button>
        <div className="flex-1 ml-4">
          <h1 className="text-2xl font-bold text-blue-900">{jobData.title}</h1>
          <p className="text-gray-500">{jobData.industry}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-md text-gray-600 border border-gray-200">
          🖨️ Print Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <ResistanceScoreCard data={jobData} />
        <div className="lg:col-span-3 flex flex-col gap-6">
          <KeyFactorsAnalysis 
            humanFactors={jobData.humanValueFactors} 
            vulnerabilityFactors={jobData.vulnerabilityFactors}
            skillsContribution={jobData.skillsContribution}
          />
          <TransformationPathway pathway={jobData.transformationPathway} />
          <SkillDevelopmentRecommendations 
            recommendations={jobData.recommendations}
            aiTools={jobData.aiTools}
          />
          <SimilarRolesComparison similarRoles={jobData.similarRoles} />
        </div>
      </div>
    </div>
  );
};

// Sub-components
const ResistanceScoreCard: FC<{ data: any }> = ({ data }) => {
  return (
    <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm flex flex-col items-center">
      <div className="relative w-40 h-40 my-4">
        <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center text-4xl font-bold text-blue-900 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-[83%] bg-blue-500 z-0"></div>
          <span className="relative z-10">{data.resistanceScore}%</span>
        </div>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-blue-200 px-6 py-1.5 rounded-full font-semibold text-sm text-blue-800">
          {data.resistanceCategory}
        </div>
      </div>

      <div className="w-full mt-4 mb-6">
        <h3 className="text-base font-semibold text-blue-900 mb-2 text-center">Estimated Stability Timeline</h3>
        <div className="h-2 w-full bg-gray-200 rounded-full mb-2 relative">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full w-3/4"></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>2025</span>
          <span>2035</span>
          <span>2045+</span>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">{data.stabilityTimeline}</p>
      </div>

      <div className="w-full">
        {Object.entries(data.details).map(([key, value]) => (
          <div key={key} className="py-3 border-b border-gray-200 flex justify-between items-center last:border-0">
            <span className="text-sm text-gray-500">{formatLabel(key)}</span>
            <span className="text-sm font-semibold text-gray-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const KeyFactorsAnalysis: FC<{ 
  humanFactors: string[], 
  vulnerabilityFactors: string[],
  skillsContribution: any[]
}> = ({ humanFactors, vulnerabilityFactors, skillsContribution }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-blue-900">Key Factors Analysis</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="flex items-center text-lg font-semibold text-emerald-600 mb-3">
              <span className="mr-2">✓</span> Human Value Factors
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {humanFactors.map((factor, index) => (
                <div key={index} className="flex mb-3 last:mb-0 text-gray-700">
                  <span className="text-xl text-emerald-500 mr-3">•</span>
                  <p className="text-sm">{factor}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="flex items-center text-lg font-semibold text-red-600 mb-3">
              <span className="mr-2">!</span> Vulnerability Factors
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {vulnerabilityFactors.map((factor, index) => (
                <div key={index} className="flex mb-3 last:mb-0 text-gray-700">
                  <span className="text-xl text-red-500 mr-3">•</span>
                  <p className="text-sm">{factor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills Contribution to Resistance</h3>
          <div className="space-y-4">
            {skillsContribution.map((skill, index) => (
              <div key={index} className="flex items-center">
                <div className="w-1/3 text-sm text-gray-600">{skill.name}</div>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${skill.color} rounded-full`} 
                    style={{ width: `${skill.value * 10}%` }}
                  ></div>
                </div>
                <div className="w-12 text-right text-sm font-semibold text-gray-800 ml-4">{skill.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TransformationPathway: FC<{ pathway: any[] }> = ({ pathway }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-blue-900">Transformation Pathway</h2>
      </div>
      <div className="p-6">
        <div className="relative pl-6">
          <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gray-200"></div>
          
          {pathway.map((phase, index) => (
            <div key={index} className="relative pb-6 last:pb-0">
              <div className={`absolute left-[-0.65rem] top-0 w-4 h-4 rounded-full border-2 border-white ${phase.isFuture ? 'bg-gray-400' : 'bg-blue-500'}`}></div>
              <div className="text-sm font-semibold text-blue-900 mb-2">{phase.period}</div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-base font-semibold text-gray-800 mb-1">{phase.title}</h3>
                <p className="text-sm text-gray-600">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillDevelopmentRecommendations: FC<{ 
  recommendations: any[], 
  aiTools: any[] 
}> = ({ recommendations, aiTools }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-blue-900">Skill Development Recommendations</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl mr-4">
                {rec.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">{rec.title}</h3>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Complementary Technologies to Learn</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {aiTools.map((tool, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-3 text-center transition-transform hover:-translate-y-1">
                <div className="text-2xl mb-1">{tool.icon}</div>
                <div className="text-sm font-medium text-gray-700">{tool.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SimilarRolesComparison: FC<{ similarRoles: any[] }> = ({ similarRoles }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-blue-900">Similar Roles Comparison</h2>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500 bg-gray-50">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 bg-gray-50">Resistance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 bg-gray-50">Skills Overlap</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 bg-gray-50">Transition Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {similarRoles.map((role, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{role.name}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium bg-${getBgColor(role.resistance.category)} text-${getTextColor(role.resistance.category)}`}>
                      {role.resistance.value}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${role.overlap}%` }}></div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium bg-${getBgColor(role.difficulty.category)} text-${getTextColor(role.difficulty.category)}`}>
                      {role.difficulty.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const formatLabel = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/([A-Z][a-z])/g, ' $1')
    .trim();
};

const getBgColor = (category: string): string => {
  switch (category) {
    case 'very-high': return 'emerald-100';
    case 'high': return 'blue-100';
    case 'medium': return 'amber-100';
    case 'low': return 'red-100';
    case 'easy': return 'emerald-100';
    case 'moderate': return 'blue-100';
    case 'challenging': return 'amber-100';
    case 'significant': return 'red-100';
    default: return 'gray-100';
  }
};

const getTextColor = (category: string): string => {
  switch (category) {
    case 'very-high': return 'emerald-700';
    case 'high': return 'blue-700';
    case 'medium': return 'amber-700';
    case 'low': return 'red-700';
    case 'easy': return 'emerald-700';
    case 'moderate': return 'blue-700';
    case 'challenging': return 'amber-700';
    case 'significant': return 'red-700';
    default: return 'gray-700';
  }
};

export default JobSpecificResult; 