import React, { useState, useRef, useEffect } from 'react';
import { useTerminal, isNavigationCommand } from '../../hooks/useTerminal';
import { isMobileDevice } from '../../utils/device';
import type { AppState } from '../../types/navigation';

interface CommandPromptProps {
  onNavigate: (screen: AppState) => void;
}

export const CommandPrompt: React.FC<CommandPromptProps> = ({ onNavigate }) => {
  const { history, executeCommand } = useTerminal(onNavigate);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const latestRecord = history.length > 0 ? history[history.length - 1] : null;

  useEffect(() => {
    // Only auto-focus on desktop devices to avoid opening the virtual keyboard automatically on mobile
    if (!isMobileDevice()) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim();
      if (trimmed) {
        executeCommand(trimmed);
        // Dismiss focus and hide mobile keyboard after navigation command
        if (isMobileDevice() || isNavigationCommand(trimmed)) {
          inputRef.current?.blur();
        }
      }
      setInput('');
    }
  };

  return (
    <div className="mt-auto w-full shrink-0 flex flex-col font-terminal-code">
      {/* Latest terminal output response banner */}
      {latestRecord && latestRecord.output && (
        <div 
          className="px-3 py-1.5 bg-black/80 border-t border-b border-primary/20 text-xs text-primary/90 flex items-center justify-between animate-fade-in"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-2 overflow-hidden">
            <span className="text-primary/60 shrink-0">&gt;</span>
            <span className="text-gray-300 break-words">{latestRecord.output}</span>
          </div>
          <button
            type="button"
            onClick={() => executeCommand('clear')}
            className="text-[10px] text-gray-500 hover:text-primary transition-colors ml-3 shrink-0 focus:outline-none"
            title="Clear output"
            aria-label="Clear output"
          >
            [CLEAR]
          </button>
        </div>
      )}

      {/* Command prompt input line */}
      <div 
        className="terminal-panel p-2 flex items-center border-t-0 border-l-0 border-r-0 border-b border-primary/30 w-full" 
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        <span className="font-terminal-code text-terminal-code text-primary-fixed-dim whitespace-nowrap select-none">
          PRINCE@PORTFOLIO:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help' for commands..."
          aria-label="Terminal command prompt"
          autoComplete="off"
          spellCheck="false"
          className="bg-transparent border-none outline-none flex-1 text-primary placeholder:text-primary/30 focus:ring-0 p-0 m-0 ml-2 font-terminal-code text-terminal-code cursor-terminal"
        />
      </div>
    </div>
  );
};
