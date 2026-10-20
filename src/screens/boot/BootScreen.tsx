import React, { useState, useEffect } from 'react';
import { AnalogLayout } from '../../components/layout/AnalogLayout';

const BOOT_LOGS = [
  { text: "> CORE SYSTEMS INITIALIZATION...", type: "normal" },
  { text: "> MEMORY ALLOCATION: 0x00F8A2... OK", type: "normal" },
  { text: "> LOADING PROTOCOLS...", type: "normal" },
  { text: "[OK] NEURAL_LINK.SYS", type: "success" },
  { text: "[OK] DATA_STREAM.BIN", type: "success" },
  { text: "[WARN] ENCRYPTION LAYER UNSTABLE", type: "warn" },
  { text: "> BYPASSING SECURITY...", type: "normal" }
];

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<number>(0);
  const [showPrompt, setShowPrompt] = useState(false);
  
  useEffect(() => {
    if (lines < BOOT_LOGS.length) {
      const delay = Math.random() * 300 + 100;
      const timeout = setTimeout(() => setLines(prev => prev + 1), delay);
      return () => clearTimeout(timeout);
    } else if (!showPrompt) {
      const timeout = setTimeout(() => setShowPrompt(true), 600);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(onComplete, 3500); // Wait for typing animation
      return () => clearTimeout(timeout);
    }
  }, [lines, showPrompt, onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  return (
    <AnalogLayout>
      <nav className="flex justify-between items-center w-full px-grid-unit h-12 border-b border-cyan-primary-container/20 mb-grid-unit shrink-0 z-50 scanline-shift">
        <div className="font-headline-sm text-headline-sm text-cyan-primary-container/80 uppercase tracking-tighter unstable-glow text-sm">
          PRINCE.OS // <span className="opacity-50">NODE_001</span>
        </div>
        <div className="flex gap-4 opacity-50">
          <span className="material-symbols-outlined text-cyan-primary-container text-sm">network_wifi</span>
          <span className="material-symbols-outlined text-cyan-primary-container text-sm">battery_5_bar</span>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center gap-margin-desktop overflow-hidden mt-margin-mobile lg:mt-0 p-container-padding scanline-shift z-40">
        <div className="w-full max-w-3xl cyan-terminal-panel-active box-glow overflow-hidden flex flex-col h-[400px] relative">
          <div className="window-header font-terminal-code text-terminal-code font-bold px-4 py-1.5 flex justify-between items-center text-xs opacity-90">
            <span className="tracking-widest">/ROOT/BIN/BOOT_SEQ.EXE</span>
            <button
              onClick={onComplete}
              title="Skip boot animation"
              className="text-[10px] tracking-widest opacity-70 hover:opacity-100 text-cyan-primary-fixed border border-cyan-primary-container/30 px-1.5 py-0.5 hover:bg-cyan-primary-container/20 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-primary-container"
            >
              [SKIP ESC]
            </button>
          </div>
          <div className="p-container-padding font-terminal-code text-terminal-code text-cyan-primary-container overflow-y-auto flex-grow flex flex-col gap-2 relative z-10">
            
            {BOOT_LOGS.slice(0, lines).map((log, i) => (
              <div 
                key={i} 
                className={`text-xs ${
                  log.type === 'normal' ? 'opacity-50' : 
                  log.type === 'success' ? 'opacity-70 text-cyan-primary-container/80' : 
                  'opacity-70 text-cyan-primary-container/50 glitch-text'
                }`}
                data-text={log.type === 'warn' ? log.text : undefined}
              >
                {log.text}
              </div>
            ))}

            {showPrompt && (
              <>
                <div className="my-4 dithered-fill h-px w-full opacity-40"></div>
                <div className="typing-effect text-cyan-primary-fixed analog-phosphor-glow w-max max-w-full text-sm">
                  &gt; ACCESS GRANTED. LOADING SYSTEM.
                </div>
                <div className="mt-4 flex gap-2 items-center">
                  <span className="text-cyan-primary-container/80 text-sm">root@prince:~#</span>
                  <span className="w-2.5 h-4 bg-cyan-primary-fixed blink inline-block shadow-[0_0_6px_#e2ede6]"></span>
                </div>
              </>
            )}
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
            <span className="material-symbols-outlined" style={{ fontSize: '240px' }}>terminal</span>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center px-6 py-3 border-t border-cyan-primary-container/10">
        <div className="font-terminal-code text-xs text-cyan-primary-container/40 uppercase tracking-widest">
          SYS.V.2.1.4 <span className="opacity-50 ml-2">///</span> 1984
        </div>
        <div className="flex gap-6 font-terminal-code text-xs text-cyan-primary-container/40 uppercase tracking-widest">
          <span className="hover:text-cyan-primary-container/90 cursor-crosshair transition-colors duration-300">EXE</span>
          <span className="hover:text-cyan-primary-container/90 cursor-crosshair transition-colors duration-300">ABT</span>
          <span className="hover:text-cyan-primary-container/90 cursor-crosshair transition-colors duration-300">HLP</span>
        </div>
      </footer>
    </AnalogLayout>
  );
};
