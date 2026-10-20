import React from 'react';
import { SystemMascot } from '../mascot/SystemMascot';

import type { AppState } from '../../types/navigation';

interface SideNavBarProps {
  activeTab?: string;
  onNavigate?: (screen: AppState) => void;
  onOpenManual?: () => void;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({ activeTab = 'DIRECTORY', onOpenManual }) => {
  const tabs = [
    { id: activeTab, icon: 'folder_open' },
  ];

  return (
    <aside className="hidden md:flex flex-col h-full border-r border-primary/30 bg-surface-container text-primary-fixed-dim w-[18%] min-w-[180px] shrink-0 transition-colors duration-150">
      <div className="p-4 border-b border-primary/30 mb-4 select-none">
        <div className="font-headline-sm text-headline-sm text-primary mb-1">ROOT_USER</div>
        <div className="text-primary/70 text-xs font-terminal-code">LVL_4_AUTH</div>
        <div className="text-primary/50 text-xs mt-2 italic font-terminal-code">System Administrator</div>
      </div>
      <nav className="overflow-y-auto flex flex-col pb-4 select-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors duration-150 ${
                isActive 
                  ? 'bg-primary text-on-primary font-bold' 
                  : 'text-primary/70'
              }`}
            >
              <span className="material-symbols-outlined">{tab.icon}</span>
              <span className="font-terminal-code text-sm">{tab.id}</span>
            </div>
          );
        })}
      </nav>
      <SystemMascot onOpenManual={onOpenManual} />
    </aside>
  );
};
