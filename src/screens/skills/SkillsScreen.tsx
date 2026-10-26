import React, { useRef, useEffect } from 'react';
import type { AppState } from '../../types/navigation';
import { SkillCategoryCard } from '../../components/skills';
import { Panel } from '../../components/ui/Panel';
import { categoriesData } from './skillsData';

interface SkillsScreenProps {
  onNavigate: (screen: AppState) => void;
}

export const SkillsScreen: React.FC<SkillsScreenProps> = () => {
  const totalSkills = categoriesData.reduce((acc, cat) => acc + cat.items.length, 0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fix for "OPENS FROM BOTTOM" bug
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden font-terminal-code text-gray-300 text-xs">
      
      {/* ── Exec lines ── */}
      <div className="shrink-0 px-1 pt-1.5 pb-0.5 text-[11px] text-gray-400 flex flex-col gap-0.5 border-b border-primary/10 mb-2">
        <span><span className="text-primary mr-1.5">&gt;</span>execute ./skills.exe</span>
        <span className="text-gray-500 text-[10px]">Loading skill parameters... Done.</span>
      </div>

      {/* ── Scrollable content ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-3 p-1 pb-4 pr-2">
        
        {/* Status Panel */}
        <Panel label="SYSTEM_DIAGNOSTICS">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-1">
            <div>
              <h1 className="text-gray-100 font-bold tracking-widest uppercase leading-none mb-1.5" style={{ fontSize: '1.25rem', letterSpacing: '0.15em' }}>
                SKILLS.EXE
              </h1>
              <p className="text-gray-400 tracking-[0.1em] text-[11px]">
                Technologies, tools, and real-world skills I use to build, learn, and grow.
              </p>
            </div>
            
            <div className="flex gap-4 text-[10px] tracking-widest">
              <div className="flex flex-col gap-1 border-l border-primary/20 pl-3">
                <span className="text-gray-500">CATEGORIES</span>
                <span className="text-primary/90 font-bold">{categoriesData.length < 10 ? `0${categoriesData.length}` : categoriesData.length}</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-primary/20 pl-3">
                <span className="text-gray-500">TOTAL_SKILLS</span>
                <span className="text-primary/90 font-bold">{totalSkills}</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-primary/20 pl-3">
                <span className="text-gray-500">STATUS</span>
                <span className="text-primary/90 font-bold animate-pulse">LEARNING</span>
              </div>
            </div>
          </div>
        </Panel>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 items-stretch">
          {categoriesData.map((category) => (
            <SkillCategoryCard 
              key={category.id} 
              category={category} 
            />
          ))}
        </div>

        {/* Terminal cursor */}
        <div className="flex items-center gap-1.5 text-gray-500 px-0.5 text-[11px] mt-1">
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );
};
