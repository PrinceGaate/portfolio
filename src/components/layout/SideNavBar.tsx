import React from 'react';
import { SectionDirectory } from '../navigation/SectionDirectory';
import { SystemMascot } from '../mascot/SystemMascot';
import type { AppState } from '../../types/navigation';

interface SideNavBarProps {
  activeTab?: string;
  currentAppState?: AppState;
  onNavigate?: (screen: AppState) => void;
  onOpenManual?: () => void;
}

export const SideNavBar: React.FC<SideNavBarProps> = React.memo(({ 
  currentAppState = 'home', 
  onNavigate, 
  onOpenManual 
}) => {
  return (
    <aside className="hidden md:flex flex-col h-full border-r border-primary/30 bg-surface-container text-primary-fixed-dim w-[210px] lg:w-[230px] xl:w-[250px] shrink-0 transition-colors duration-150 overflow-hidden">
      {/* ── ROOT_USER Header (Strictly preserved) ── */}
      <div className="p-4 border-b border-primary/30 mb-2 select-none shrink-0">
        <div className="font-headline-sm text-headline-sm text-primary mb-1">ROOT_USER</div>
        <div className="text-primary/70 text-xs font-terminal-code">LVL_4_AUTH</div>
        <div className="text-primary/50 text-xs mt-2 italic font-terminal-code">System Administrator</div>
      </div>

      {/* ── Section Directory Navigation Panel ── */}
      <div className="flex-1 overflow-y-auto px-2 py-1 scrollbar-thin">
        <SectionDirectory
          currentScreen={currentAppState}
          onNavigate={onNavigate}
        />
      </div>

      {/* ── System Companion & Manual Button (Strictly preserved) ── */}
      <SystemMascot onOpenManual={onOpenManual} />
    </aside>
  );
});
