import React from 'react';

export const TopAppBar: React.FC = () => {
  return (
    <header className="bg-surface dark:bg-surface text-primary dark:text-primary docked full-width top-0 border-b border-primary/30 flat no-shadows phosphor-glow transition-all duration-200 cursor-terminal flex justify-between items-center w-full px-container-padding h-12 z-40 relative">
      <div className="flex items-center gap-4">
        <div className="font-headline-sm text-headline-sm text-primary dark:text-primary font-bold">
          PRINCE.OS v1.0.0
        </div>
      </div>
      <div className="font-terminal-code text-terminal-code flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px]">wifi</span>
        SYSTEM ONLINE
      </div>
    </header>
  );
};
