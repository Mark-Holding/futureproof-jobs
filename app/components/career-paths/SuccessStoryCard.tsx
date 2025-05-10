interface SkillBarProps {
  skill: string;
  percentage: number;
  isBefore: boolean;
}

const SkillBar = ({ skill, percentage, isBefore }: SkillBarProps) => {
  const barColor = isBefore ? 'bg-blue-500' : 'bg-green-500';
  
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm text-gray-700 mb-1">
        <span>{skill}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div 
          className={`h-full rounded-full ${barColor}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

interface BeforeAfterSkillsProps {
  before: {
    role: string;
    skills: Array<{ name: string; level: number }>;
  };
  after: {
    role: string;
    skills: Array<{ name: string; level: number }>;
  };
}

const BeforeAfterSkills = ({ before, after }: BeforeAfterSkillsProps) => (
  <div className="mt-6">
    <h4 className="font-semibold text-blue-900 mb-4">Skill Transformation</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h5 className="font-medium text-gray-700 mb-3">Before: {before.role}</h5>
        {before.skills.map((skill, index) => (
          <SkillBar 
            key={index} 
            skill={skill.name} 
            percentage={skill.level} 
            isBefore={true} 
          />
        ))}
      </div>
      <div>
        <h5 className="font-medium text-gray-700 mb-3">After: {after.role}</h5>
        {after.skills.map((skill, index) => (
          <SkillBar 
            key={index} 
            skill={skill.name} 
            percentage={skill.level} 
            isBefore={false} 
          />
        ))}
      </div>
    </div>
  </div>
);

interface SuccessStoryCardProps {
  name: string;
  initials: string;
  fromRole: string;
  toRole: string;
  pathwayType: string;
  narrative: string[];
  beforeAfterSkills: BeforeAfterSkillsProps;
}

export default function SuccessStoryCard({
  name,
  initials,
  fromRole,
  toRole,
  pathwayType,
  narrative,
  beforeAfterSkills
}: SuccessStoryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold mr-3">
              {initials}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{name}</div>
              <div className="text-sm text-gray-600">
                {fromRole} <span className="text-green-600 mx-2">→</span> <span className="text-blue-700 font-medium">{toRole}</span>
              </div>
            </div>
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
            {pathwayType}
          </div>
        </div>
        
        <div className="text-gray-700 text-sm">
          {narrative.map((paragraph, index) => (
            <p key={index} className="mb-3">{paragraph}</p>
          ))}
        </div>
        
        <BeforeAfterSkills 
          before={beforeAfterSkills.before} 
          after={beforeAfterSkills.after} 
        />
      </div>
    </div>
  );
} 