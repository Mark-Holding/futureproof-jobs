import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const skills = [
  { name: 'Empathy', fullMark: 5 },
  { name: 'Creativity', fullMark: 5 },
  { name: 'Complex Decision-Making', fullMark: 5 },
  { name: 'Ethical Judgment', fullMark: 5 },
  { name: 'Physical Dexterity', fullMark: 5 },
  { name: 'Social Intelligence', fullMark: 5 },
  { name: 'Cultural Competence', fullMark: 5 },
  { name: 'Cross-Disciplinary Thinking', fullMark: 5 },
];

const healthcareData = skills.map(skill => ({
  ...skill,
  value: skill.name === 'Empathy' ? 4.8 : 
         skill.name === 'Physical Dexterity' ? 4.2 :
         skill.name === 'Social Intelligence' ? 4.6 :
         skill.name === 'Ethical Judgment' ? 4.5 :
         skill.name === 'Cultural Competence' ? 4.1 :
         skill.name === 'Complex Decision-Making' ? 4.3 :
         skill.name === 'Cross-Disciplinary Thinking' ? 3.8 : 3.5
}));

const creativeData = skills.map(skill => ({
  ...skill,
  value: skill.name === 'Creativity' ? 4.9 : 
         skill.name === 'Empathy' ? 3.5 :
         skill.name === 'Physical Dexterity' ? 3.2 :
         skill.name === 'Social Intelligence' ? 4.0 :
         skill.name === 'Ethical Judgment' ? 3.2 :
         skill.name === 'Cultural Competence' ? 4.2 :
         skill.name === 'Complex Decision-Making' ? 3.8 :
         skill.name === 'Cross-Disciplinary Thinking' ? 4.7 : 3.0
}));

const skilledTradesData = skills.map(skill => ({
  ...skill,
  value: skill.name === 'Physical Dexterity' ? 4.9 : 
         skill.name === 'Empathy' ? 2.8 :
         skill.name === 'Creativity' ? 4.2 :
         skill.name === 'Social Intelligence' ? 3.0 :
         skill.name === 'Ethical Judgment' ? 3.5 :
         skill.name === 'Cultural Competence' ? 2.5 :
         skill.name === 'Complex Decision-Making' ? 4.0 :
         skill.name === 'Cross-Disciplinary Thinking' ? 3.7 : 3.0
}));

const IndustrySkillRadars: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RadarCard 
        title="Healthcare & Wellness" 
        data={healthcareData} 
        color="#3b82f6" 
        backgroundColor="rgba(59, 130, 246, 0.2)"
      />
      <RadarCard 
        title="Creative Fields" 
        data={creativeData} 
        color="#8b5cf6" 
        backgroundColor="rgba(139, 92, 246, 0.2)"
      />
      <RadarCard 
        title="Skilled Trades" 
        data={skilledTradesData} 
        color="#10b981" 
        backgroundColor="rgba(16, 185, 129, 0.2)"
      />
    </div>
  );
};

interface RadarCardProps {
  title: string;
  data: Array<{name: string; value: number; fullMark: number}>;
  color: string;
  backgroundColor: string;
}

const RadarCard: React.FC<RadarCardProps> = ({ title, data, color, backgroundColor }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold text-blue-900 mb-4 text-center">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }} />
            <Radar
              name={title}
              dataKey="value"
              stroke={color}
              fill={backgroundColor}
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex items-center text-xs">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default IndustrySkillRadars; 