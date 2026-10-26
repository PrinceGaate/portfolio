import React from 'react';

export type MascotExpression = 'DEFAULT' | 'BLINK' | 'CURIOUS' | 'WATCHING' | 'HAPPY' | 'SURPRISED' | 'SLEEPY' | 'EXCITED';

interface MascotFaceProps {
  expression: MascotExpression;
  eyeRef?: React.RefObject<HTMLDivElement | null>;
}

export const MascotFace: React.FC<MascotFaceProps> = ({ expression, eyeRef }) => {
  const renderEyes = () => {
    switch (expression) {
      case 'BLINK':
      case 'SLEEPY':
        return (
          <div className="flex gap-2.5">
            <div className="w-1.5 h-0.5 bg-gray-300" />
            <div className="w-1.5 h-0.5 bg-gray-300" />
          </div>
        );
      case 'HAPPY':
      case 'EXCITED':
        return (
          <div className="flex gap-2 text-primary font-bold leading-none" style={{ fontSize: '10px' }}>
            <span>^</span>
            <span>^</span>
          </div>
        );
      case 'CURIOUS':
        return (
          <div className="flex gap-2 items-end">
            <div className="w-1.5 h-1.5 bg-gray-200" />
            <div className="w-2 h-2 bg-primary" />
          </div>
        );
      case 'SURPRISED':
        return (
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-gray-200 rounded-sm" />
            <div className="w-2 h-2 bg-gray-200 rounded-sm" />
          </div>
        );
      default:
        // DEFAULT / WATCHING
        return (
          <div className="flex gap-2.5">
            <div className="w-1.5 h-1.5 bg-gray-200" />
            <div className="w-1.5 h-1.5 bg-gray-200" />
          </div>
        );
    }
  };

  const renderMouth = () => {
    if (expression === 'HAPPY' || expression === 'EXCITED') {
      return <div className="w-2 h-1 bg-gray-200 mt-1 rounded-sm" />;
    }
    if (expression === 'SURPRISED') {
      return <div className="w-1.5 h-1.5 bg-gray-300 mt-1 rounded-full" />;
    }
    if (expression === 'CURIOUS') {
      return <div className="w-1.5 h-0.5 bg-gray-400 mt-1" />;
    }
    if (expression === 'SLEEPY') {
      return null;
    }
    return <div className="w-3 h-0.5 bg-gray-400 mt-1" />;
  };

  return (
    <div className="relative w-14 h-14 flex flex-col items-center justify-center bg-transparent">
      {/* Decorative sparse particles/sparks */}
      <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-primary/60 animate-pulse" />
      <div className="absolute top-3 right-1 w-1 h-1 bg-gray-400/30 animate-pulse" style={{ animationDelay: '300ms' }} />
      <div className="absolute bottom-2 left-1 w-1 h-1 bg-primary/40 animate-pulse" style={{ animationDelay: '700ms' }} />
      <div className="absolute bottom-4 right-2 w-0.5 h-0.5 bg-gray-300/50 animate-pulse" style={{ animationDelay: '100ms' }} />

      {/* Floating Z's for Sleepy */}
      {expression === 'SLEEPY' && (
        <>
          <div className="absolute -top-1 right-1 text-primary text-[8px] animate-pulse">z</div>
          <div className="absolute -top-3 right-4 text-gray-400 text-[10px] animate-bounce delay-150" style={{ animationDuration: '2s' }}>Z</div>
        </>
      )}

      {/* Exclamation for excited */}
      {expression === 'EXCITED' && (
        <div className="absolute -top-2 right-1 text-primary text-[10px] font-bold animate-pulse">!</div>
      )}
      
      {/* Question mark for curious */}
      {expression === 'CURIOUS' && (
        <div className="absolute -top-2 right-1 text-primary text-[10px] font-bold animate-pulse">?</div>
      )}

      {/* Tiny side arms */}
      <div className="absolute top-1/2 left-1 -translate-y-1/2 w-1.5 h-1.5 bg-primary/50" />
      <div className="absolute top-1/2 right-1 -translate-y-1/2 w-1.5 h-1.5 bg-primary/50" />

      {/* Robot Body Construction */}
      <div className="flex flex-col items-center z-10 relative">
        {/* Antenna */}
        <div className="w-1 h-1 bg-primary/80 rounded-sm mb-0.5 animate-pulse" />
        <div className="w-0.5 h-1.5 bg-gray-500 mb-0.5" />

        {/* Main Face Box */}
        <div className="w-9 h-7 bg-[#0a0a0a] border-[1.5px] border-gray-300 flex items-center justify-center relative shadow-[0_0_10px_rgba(51,255,51,0.15)] group-hover:border-primary group-focus:border-primary transition-colors">
          
          {/* Inner face features that move slightly */}
          <div 
            ref={eyeRef}
            className="flex flex-col items-center justify-center absolute w-full h-full pointer-events-none will-change-transform"
          >
            {renderEyes()}
            {renderMouth()}
          </div>
        </div>

        {/* Base/Neck */}
        <div className="w-3 h-1 bg-gray-600 mt-0.5" />
        <div className="w-5 h-1.5 bg-primary/80 mt-0.5 shadow-[0_0_6px_rgba(51,255,51,0.4)]" />
      </div>
    </div>
  );
};
