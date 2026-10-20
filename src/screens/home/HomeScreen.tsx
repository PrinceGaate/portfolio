import React from 'react';
import { CommandPrompt } from '../../components/terminal/CommandPrompt';
import type { AppState } from '../../types/navigation';

export const HomeScreen: React.FC<{ onNavigate: (screen: AppState) => void }> = ({ onNavigate }) => {
  const folders = [
    { id: 'projects', label: 'PROJECTS', icon: 'folder' },
    { id: 'skills', label: 'SKILLS', icon: 'folder' },
    { id: 'about', label: 'ABOUT_ME', icon: 'folder' },
    { id: 'certifications', label: 'CERTIFICATIONS', icon: 'workspace_premium' },
    { id: 'contact', label: 'CONTACT', icon: 'folder' },
    { id: 'resume', label: 'RESUME.TXT', icon: 'description' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Welcome Banner */}
      <div className="terminal-panel terminal-panel-active p-6 phosphor-glow shrink-0">
        <h1 className="font-headline-lg text-headline-lg mb-2 uppercase">WELCOME, USER</h1>
        <p className="font-terminal-code text-terminal-code text-primary/80 flex items-center">
          &gt; Select a directory to continue
        </p>
      </div>
      
      {/* Desktop Grid */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 p-4 overflow-y-auto content-start">
        {folders.map(folder => (
          <button 
            key={folder.id}
            onClick={() => onNavigate(folder.id as AppState)}
            className="flex flex-col items-center justify-center p-4 gap-4 terminal-panel hover:bg-primary/10 transition-colors group focus:outline-none focus:ring-1 focus:ring-primary h-32"
          >
            <span className="material-symbols-outlined text-[64px] group-hover:phosphor-glow" style={{ fontVariationSettings: "'FILL' 1" }}>
              {folder.icon}
            </span>
            <span className="font-terminal-code text-terminal-code group-hover:bg-primary group-hover:text-on-primary px-2 py-1 uppercase">
              {folder.label}
            </span>
          </button>
        ))}
      </div>
      
      {/* Footer Command Prompt */}
      <CommandPrompt onNavigate={onNavigate} />
    </div>
  );
};
