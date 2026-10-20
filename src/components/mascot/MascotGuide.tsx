import React, { useEffect, useCallback } from 'react';

interface MascotGuideProps {
  onClose: () => void;
}

export const MascotGuide: React.FC<MascotGuideProps> = ({ onClose }) => {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [handleKey]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="PRINCE.OS System Guide"
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 10000 }} // Above Mascot
      onClick={onClose}
    >
      {/* Dimmed backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative terminal-panel p-4 flex flex-col gap-4 w-full max-w-sm border-primary/50 shadow-[0_0_30px_rgba(51,255,51,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-primary/20 pb-2">
          <div className="text-primary tracking-widest text-[11px] font-bold">
            PRINCE.OS // SYSTEM GUIDE
          </div>
          <button
            autoFocus
            onClick={onClose}
            className="text-primary/60 hover:text-primary focus:outline-none focus:text-primary transition-colors text-[10px]"
            aria-label="Close guide"
          >
            [ X ]
          </button>
        </div>

        <div className="flex flex-col gap-3 text-gray-300 text-[11px] font-terminal-code leading-relaxed">
          <div className="flex gap-2 items-center text-primary/70 mb-1 text-[10px]">
            <span>&gt;</span>
            <span>SYSTEM INSTRUCTIONS</span>
          </div>

          <ul className="flex flex-col gap-2">
            <li className="flex gap-3">
              <span className="text-gray-500 w-20 shrink-0">[ ↑ ↓ ]</span>
              <span>Navigate lists & items</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-500 w-20 shrink-0">[ ENTER ]</span>
              <span>Execute / Open selected item</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-500 w-20 shrink-0">[ ESC ]</span>
              <span>Back to home / Close modal</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-500 w-20 shrink-0">[ F1 ]</span>
              <span>Toggle this User Manual</span>
            </li>
          </ul>

          <div className="mt-2 text-gray-400 space-y-1.5 border-t border-primary/10 pt-3">
            <div className="text-[10px] text-primary/70 font-bold uppercase tracking-widest">
              Available Modules:
            </div>
            <p className="text-[10px] text-gray-400 leading-normal">
              Projects, Skills, About Me, Certifications, Resume, Contact.
            </p>
            <p className="text-[10px] text-gray-500 leading-normal pt-1">
              Terminal: Type commands like <code className="text-primary/80">skills</code>, <code className="text-primary/80">projects</code>, <code className="text-primary/80">home</code>, or <code className="text-primary/80">help</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
