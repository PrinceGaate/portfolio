import React from 'react';
import { SkillCard } from './SkillCard';
import type { Skill } from './SkillCard';

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
}

export const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills }) => {
  if (!skills.length) return null;

  return (
    <div className="mb-10 w-full min-w-0">
      <div className="flex items-center mb-6">
        <h2 className="text-primary font-headline-sm text-lg sm:text-xl uppercase tracking-widest">{title}</h2>
        <div className="flex-1 h-px bg-primary/20 ml-4 shadow-[0_0_5px_rgba(51,255,51,0.2)]"></div>
      </div>
      
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full min-w-0 items-stretch">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
};
