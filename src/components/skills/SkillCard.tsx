import React from 'react';

export interface Skill {
  id: string;
  name: string;
  category: string;
  logo?: string;
  textFallback?: string;
  description?: string;
}

interface SkillCardProps {
  skill: Skill;
  compact?: boolean;
}
export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <div 
      className="block w-full min-w-0 h-full focus-visible:outline-none focus:ring-1 focus:ring-primary box-border"
      tabIndex={0}
      role="article"
      aria-label={`${skill.name} skill`}
      title={skill.name}
    >
      <div className="skill-card group cursor-default">
        {/* ── Fixed-Dimension Dedicated Icon Wrapper (Always 24px x 24px, centered) ── */}
        <div className="skill-card-icon-area">
          {skill.logo && !skill.logo.startsWith('data:image/svg+xml;utf8,') ? (
            <img 
              src={skill.logo} 
              alt={`${skill.name} logo`} 
              className="max-h-full max-w-full w-auto h-auto object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-200 block select-none pointer-events-none"
              loading="lazy"
            />
          ) : skill.logo && skill.logo.startsWith('data:image/svg+xml;utf8,') ? (
            <div 
              className="w-full h-full flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity duration-200 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-full [&>svg]:max-w-full [&>svg]:object-contain"
              dangerouslySetInnerHTML={{ 
                __html: decodeURIComponent(skill.logo.replace('data:image/svg+xml;utf8,', '')) 
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary/80 font-bold text-[10px] border border-primary/25 bg-primary/10 rounded-sm">
              {skill.textFallback || skill.name.charAt(0)}
            </div>
          )}
        </div>
        
        {/* ── Uniform Fixed-Height Label Area (Reserved 16px, exact 6px gap from icon wrapper) ── */}
        <div className="skill-card-label-area">
          <h3 className="skill-card-label text-gray-400 font-terminal-code text-[8px] sm:text-[9px] group-hover:text-primary transition-colors duration-200">
            {skill.name}
          </h3>
        </div>
      </div>
    </div>
  );
};
