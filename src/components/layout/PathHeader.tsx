import React from 'react';
import type { AppState } from '../../types/navigation';

interface PathHeaderProps {
  appState: string;
  onNavigate?: (screen: AppState) => void;
  onOpenManual?: () => void;
}

export const PathHeader: React.FC<PathHeaderProps> = ({ appState }) => {
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
      <span className="text-gray-500">PRINCE.OS</span>
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;

        return (
          <React.Fragment key={index}>
            <span className="text-gray-600">/</span>
            {isLast ? (
              <span className="text-primary phosphor-glow font-bold">{segment}</span>
            ) : (
              <span className="text-gray-400">{segment}</span>
            )}
          </React.Fragment>
        );
      })}

      <div className="ml-auto flex items-center gap-2">
        <span className="text-gray-500 text-[10px] tracking-widest hidden sm:inline">[READ-ONLY]</span>
      </div>
    </div>
  );
};
