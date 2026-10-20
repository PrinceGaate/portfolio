import React from 'react';
import { AnalogLayout } from '../../components/layout/AnalogLayout';

interface HeroScreenProps {
  onConnect: () => void;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({ onConnect }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onConnect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onConnect]);

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
        <div className="text-center w-full max-w-4xl flex flex-col items-center gap-2 mb-8">
          <h1 
            className="font-headline-lg text-[64px] leading-none text-cyan-primary-container uppercase tracking-tighter glitch-text unstable-glow" 
            data-text="PRINCE GAATE"
          >
            PRINCE GAATE
          </h1>
          <h2 className="font-terminal-code text-terminal-code text-cyan-primary-container/40 tracking-[0.3em] uppercase text-xs mt-2">
            SOFTWARE DEVELOPER <span className="mx-2 opacity-50">///</span> FULL-STACK DEVELOPER
          </h2>
          <div className="mt-8">
            <button 
              onClick={onConnect}
              autoFocus
              className="px-8 py-2 border border-cyan-primary-container/30 text-cyan-primary-container/70 font-terminal-code text-xs uppercase tracking-widest hover:bg-cyan-primary-container/15 hover:text-cyan-primary-container hover:border-cyan-primary-container transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 cursor-crosshair focus:outline-none focus:ring-1 focus:ring-cyan-primary-container"
            >
              <span className="material-symbols-outlined text-sm">link</span>
              ESTABLISH CONNECTION [ENTER]
            </button>
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
