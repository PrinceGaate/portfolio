import React from 'react';
import type { SkillCategoryData } from '../../screens/skills/skillsData';
import { SkillCard } from './SkillCard';
import { Panel } from '../ui/Panel';

interface SkillCategoryCardProps {
  category: SkillCategoryData;
}

export const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({ category }) => {
  return (
    <Panel label={`${category.id} / ${category.title}`} className="group relative h-full">
      <div className="relative z-10 flex flex-col h-full min-w-0">
        {/* Description — fixed min-height so all categories reserve the same space */}
        <p className="text-gray-400 font-terminal-code text-[11px] leading-relaxed mb-3 min-h-[36px]">
          {category.description}
        </p>

        {/* Skills Grid: uniform 5-column CSS grid ensuring identical dimensions for all cards */}
        <div className="skill-category-grid">
          {category.items.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </Panel>
  );
};
