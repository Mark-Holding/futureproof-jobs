import React from 'react';
import SkillCorrelationMatrix from './skill-composition/SkillCorrelationMatrix';
import IndustrySkillRadars from './skill-composition/IndustrySkillRadars';
import SkillImpactAnalysis from './skill-composition/SkillImpactAnalysis';
import SkillPortfolioBuilder from './skill-composition/SkillPortfolioBuilder';
import EmergingSkillCombinations from './skill-composition/EmergingSkillCombinations';
import SkillDevelopmentResources from './skill-composition/SkillDevelopmentResources';

const SkillCompositionTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <SkillCorrelationMatrix />
      <IndustrySkillRadars />
      <SkillImpactAnalysis />
      <SkillPortfolioBuilder />
      <EmergingSkillCombinations />
      <SkillDevelopmentResources />
    </div>
  );
};

export default SkillCompositionTab; 