import React from 'react';
import type { AppState } from '../../types/navigation';

interface PathHeaderProps {
  appState: string;
  onNavigate?: (screen: AppState) => void;
  onOpenManual?: () => void;
  onToggleMobileDirectory?: () => void;
}

export const PathHeader: React.FC<PathHeaderProps> = React.memo(({ 
  appState, 
  onNavigate, 
  onToggleMobileDirectory 
}) => {
  const getPathSegments = () => {
    switch (appState) {
      case 'home':
        return ['DIRECTORY'];
      case 'projects':
        return ['DIRECTORY', 'PROJECTS'];
      case 'skills':
        return ['DIRECTORY', 'SKILLS'];
      case 'about':
        return ['DIRECTORY', 'ABOUT_ME'];
      case 'certifications':
        return ['DIRECTORY', 'CERTIFICATIONS'];
      case 'methods':
        return ['DIRECTORY', 'METHODS'];
      case 'resume':
        return ['DIRECTORY', 'RESUME.TXT'];
      case 'contact':
        return ['DIRECTORY', 'CONTACT'];
      case 'terminal':
        return ['TERMINAL'];
      default:
        return ['DIRECTORY', appState.toUpperCase()];
    }
  };

  const segments = getPathSegments();

  return (
    <div className="shrink-0 px-1 pt-1.5 pb-0.5 flex items-center gap-1.5 border-b border-primary/20 font-terminal-code text-xs select-none">
      {/* ── Mobile Compact Directory Button [DIR] ── */}
      {onToggleMobileDirectory && (
        <button
          type="button"
          onClick={onToggleMobileDirectory}
          className="md:hidden flex items-center gap-1 px-1.5 py-0.5 mr-0.5 bg-primary/10 hover:bg-primary/25 text-primary border border-primary/40 rounded-xs transition-colors cursor-pointer text-[10px] font-bold shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-[0_0_6px_rgba(51,255,51,0.2)]"
          aria-label="Open section directory navigation"
          title="Open section directory"
        >
          <span className="material-symbols-outlined text-[13px]">folder_open</span>
          <span>DIR</span>
        </button>
      )}

      {/* Root Breadcrumb */}
      <button
        type="button"
        onClick={() => onNavigate?.('home')}
        className="text-gray-500 hover:text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
        title="Navigate to root home"
      >
        PRINCE.OS
      </button>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const isDirectorySegment = segment === 'DIRECTORY';

        return (
          <React.Fragment key={index}>
            <span className="text-gray-600">/</span>
            {isLast ? (
              <span className="text-primary phosphor-glow font-bold truncate">{segment}</span>
            ) : isDirectorySegment ? (
              <button
                type="button"
                onClick={() => onNavigate?.('home')}
                className="text-gray-400 hover:text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-xs truncate"
                title="Navigate to directory root"
              >
                {segment}
              </button>
            ) : (
              <span className="text-gray-400 truncate">{segment}</span>
            )}
          </React.Fragment>
        );
      })}

      <div className="ml-auto flex items-center gap-2 shrink-0">
        <span className="text-gray-500 text-[10px] tracking-widest hidden sm:inline">[READ-ONLY]</span>
      </div>
    </div>
  );
});
