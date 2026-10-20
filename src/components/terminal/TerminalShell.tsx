import React, { useState, useRef, useEffect } from 'react';
import { useTerminal } from '../../hooks/useTerminal';
import type { AppState } from '../../types/navigation';

interface TerminalShellProps {
  onNavigate: (screen: AppState) => void;
}

export const TerminalShell: React.FC<TerminalShellProps> = ({ onNavigate }) => {
  const { history, executeCommand } = useTerminal(onNavigate);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    }
  };

  return (
    <div 
      className="flex-1 w-full h-full p-container-padding z-40 relative flex flex-col font-terminal-code text-body-lg text-primary phosphor-glow overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-4 text-primary-fixed-dim">
        PRINCE.OS Terminal v1.0.0<br/>
        Type 'help' to see available commands.
      </div>

      <div className="flex flex-col space-y-2">
        {history.map((record, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="flex items-center">
              <span className="text-secondary mr-2">root@prince:~$</span>
              <span>{record.command}</span>
            </div>
            {record.output && <div className="text-on-surface-variant ml-4">{record.output}</div>}
          </div>
        ))}
      </div>

      <div className="flex items-center mt-2 relative">
        <span className="text-secondary mr-2">root@prince:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-primary focus:ring-0 p-0 m-0 cursor-terminal"
          autoFocus
        />
        {/* Fake caret overlay if needed, but native caret is fine for now */}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
