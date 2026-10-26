import React, { useState } from 'react';
import type { AppState } from '../types/navigation';

export interface CommandRecord {
  command: string;
  output: string | React.ReactNode;
}

export const NAVIGATION_COMMANDS: readonly string[] = [
  'home',
  'projects',
  'skills',
  'about',
  'certifications',
  'certs',
  'experience',
  'resume',
  'methods',
  'contact',
  'exit'
];

export function isNavigationCommand(cmd: string): boolean {
  const trimmed = cmd.trim().toLowerCase();
  return NAVIGATION_COMMANDS.includes(trimmed);
}

export const useTerminal = (onNavigate: (screen: AppState) => void) => {
  const [history, setHistory] = useState<CommandRecord[]>([]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    let output: string | React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        output = 'Available commands: help, home, projects, skills, about, certifications, resume, contact, clear, exit';
        break;
      case 'home':
      case 'projects':
      case 'skills':
      case 'about':
      case 'certifications':
      case 'certs':
      case 'experience':
      case 'resume':
      case 'methods':
      case 'contact': {
        const targetScreen = trimmed === 'certs' 
          ? 'certifications' 
          : trimmed === 'experience' 
          ? 'about' 
          : (trimmed as AppState);
        output = `Navigating to ${targetScreen}...`;
        onNavigate(targetScreen);
        break;
      }
      case 'ai':
        output = 'PRINCE.AI subsystem initialization pending...';
        break;
      case 'exit':
        output = 'Connection terminated.';
        onNavigate('hero');
        break;
      case '':
        // Empty command does nothing
        setHistory(prev => [...prev, { command: cmd, output: '' }]);
        return;
      default:
        output = `Command not found: ${trimmed}. Type 'help' for a list of commands.`;
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  return { history, executeCommand };
};
