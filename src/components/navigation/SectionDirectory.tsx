import React, { useState } from 'react';
import type { AppState } from '../../types/navigation';

export interface DirectorySectionItem {
  id: AppState;
  label: string;
  icon: string;
  activeIcon?: string;
  type: 'folder' | 'file';
  description?: string;
}

interface SectionDirectoryProps {
  currentScreen?: AppState;
  onNavigate?: (screen: AppState) => void;
  onItemClick?: () => void;
  className?: string;
}

const SECTIONS: DirectorySectionItem[] = [
  { id: 'projects', label: 'PROJECTS', icon: 'folder', activeIcon: 'folder_open', type: 'folder' },
  { id: 'skills', label: 'SKILLS', icon: 'folder', activeIcon: 'folder_open', type: 'folder' },
  { id: 'about', label: 'ABOUT_ME', icon: 'folder', activeIcon: 'folder_open', type: 'folder' },
  { id: 'certifications', label: 'CERTIFICATIONS', icon: 'workspace_premium', activeIcon: 'workspace_premium', type: 'file' },
  { id: 'resume', label: 'RESUME.TXT', icon: 'description', activeIcon: 'description', type: 'file' },
  { id: 'contact', label: 'CONTACT', icon: 'folder', activeIcon: 'folder_open', type: 'folder' },
];

export const SectionDirectory: React.FC<SectionDirectoryProps> = React.memo(({
  currentScreen = 'home',
  onNavigate,
  onItemClick,
  className = '',
}) => {
  const [isTreeExpanded, setIsTreeExpanded] = useState(true);

  const handleSelect = (screen: AppState) => {
    if (onNavigate) {
      onNavigate(screen);
    }
    if (onItemClick) {
      onItemClick();
    }
  };

  const isHomeActive = currentScreen === 'home';

  return (
    <nav 
      className={`flex flex-col select-none font-terminal-code ${className}`}
      aria-label="File Explorer Section Directory"
    >
      {/* ── Top Pinned Quick-Access: Home ── */}
      <div className="mb-1">
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className={`group relative w-full flex items-center gap-2 py-1.5 px-2.5 rounded-xs text-left transition-colors text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
            isHomeActive
              ? 'bg-primary/20 text-primary font-bold shadow-[inset_0_0_10px_rgba(51,255,51,0.12)] border border-primary/30'
              : 'text-primary/70 hover:text-primary hover:bg-primary/10 border border-transparent'
          }`}
          aria-current={isHomeActive ? 'page' : undefined}
          aria-label="Navigate to Home root directory"
        >
          {/* Windows 11 style vertical accent indicator pill */}
          <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3.5 rounded-r-full transition-all ${
              isHomeActive
                ? 'bg-primary shadow-[0_0_8px_#33ff33] opacity-100'
                : 'bg-transparent opacity-0 group-hover:bg-primary/40 group-hover:opacity-100'
            }`}
            aria-hidden="true"
          />

          <span
            className={`material-symbols-outlined text-[17px] shrink-0 transition-colors ${
              isHomeActive ? 'text-primary phosphor-glow' : 'text-primary/70 group-hover:text-primary'
            }`}
            style={isHomeActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            aria-hidden="true"
          >
            home
          </span>

          <span className={`text-xs tracking-wider truncate ${isHomeActive ? 'phosphor-glow font-bold' : ''}`}>
            Home
          </span>
        </button>
      </div>

      {/* ── Subtle Divider ── */}
      <div className="border-t border-primary/20 my-1.5 mx-1" role="separator" />

      {/* ── Expandable Root Drive / Account Node ── */}
      <div className="flex flex-col">
        <div className="flex items-center w-full">
          <button
            type="button"
            onClick={() => setIsTreeExpanded(!isTreeExpanded)}
            className="group w-full flex items-center gap-1.5 py-1 px-1.5 text-primary/80 hover:text-primary hover:bg-primary/5 rounded-xs transition-colors text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            aria-expanded={isTreeExpanded}
            aria-label="Toggle PRINCE_OS directory tree"
          >
            {/* Tree expansion chevron */}
            <span 
              className="material-symbols-outlined text-[16px] text-primary/60 group-hover:text-primary transition-transform shrink-0"
              aria-hidden="true"
            >
              {isTreeExpanded ? 'expand_more' : 'chevron_right'}
            </span>

            {/* Drive / Root storage icon */}
            <span 
              className="material-symbols-outlined text-[16px] text-primary/80 group-hover:text-primary shrink-0"
              aria-hidden="true"
            >
              hard_drive
            </span>

            {/* Tree Root Label */}
            <span className="font-bold text-[11px] tracking-wider text-primary/90 group-hover:text-primary truncate">
              PRINCE_OS (C:)
            </span>
          </button>
        </div>

        {/* ── Tree Children: Section Folders ── */}
        {isTreeExpanded && (
          <ul 
            className="pl-3 pt-1 flex flex-col gap-0.5 border-l border-primary/15 ml-3"
            role="tree"
          >
            {SECTIONS.map((item) => {
              const isActive = currentScreen === item.id;
              const displayIcon = isActive && item.activeIcon ? item.activeIcon : item.icon;

              return (
                <li key={item.id} role="none">
                  <button
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={`group relative w-full flex items-center gap-1.5 py-1 px-1.5 rounded-xs text-left transition-colors text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                      isActive
                        ? 'bg-primary/20 text-primary font-bold shadow-[inset_0_0_10px_rgba(51,255,51,0.12)] border border-primary/30'
                        : 'text-primary/70 hover:text-primary hover:bg-primary/10 border border-transparent'
                    }`}
                    role="treeitem"
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {/* Windows 11 style left accent indicator */}
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3.5 rounded-r-full transition-all ${
                        isActive
                          ? 'bg-primary shadow-[0_0_8px_#33ff33] opacity-100'
                          : 'bg-transparent opacity-0 group-hover:bg-primary/40 group-hover:opacity-100'
                      }`}
                      aria-hidden="true"
                    />

                    {/* Small chevron '>' indicator matching Windows File Explorer tree view */}
                    <span
                      className={`material-symbols-outlined text-[12px] shrink-0 transition-colors ${
                        isActive ? 'text-primary' : 'text-primary/30 group-hover:text-primary/70'
                      }`}
                      aria-hidden="true"
                    >
                      chevron_right
                    </span>

                    {/* Folder / Document icon */}
                    <span
                      className={`material-symbols-outlined text-[16px] shrink-0 transition-colors ${
                        isActive ? 'text-primary phosphor-glow' : 'text-primary/70 group-hover:text-primary'
                      }`}
                      style={item.type === 'folder' && isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      aria-hidden="true"
                    >
                      {displayIcon}
                    </span>

                    {/* Section label */}
                    <span className={`text-[11px] tracking-wider truncate ${isActive ? 'phosphor-glow font-bold' : ''}`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
});
