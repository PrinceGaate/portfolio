import React, { useState, useEffect, useRef } from 'react';
import { MascotFace } from './MascotFace';
import type { MascotExpression } from './MascotFace';
import { MascotGuide } from './MascotGuide';

interface SystemMascotProps {
  onOpenManual?: () => void;
}

export const SystemMascot: React.FC<SystemMascotProps> = ({ onOpenManual }) => {
  const [expression, setExpression] = useState<MascotExpression>('DEFAULT');
  const [guideOpen, setGuideOpen] = useState(false);
  
  const zoneRef = useRef<HTMLDivElement | null>(null);
  const mascotRef = useRef<HTMLButtonElement | null>(null);
  const eyeRef = useRef<HTMLDivElement | null>(null);
  
  const mousePosRef = useRef({ x: 0, y: 0 });
  const idleTimerRef = useRef<number | null>(null);
  const expressionTimerRef = useRef<number | null>(null);
  const isIdleRef = useRef(false);
  
  const currentBodyOffset = useRef({ x: 0, y: 0 });
  const currentEyeOffset = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame: number;

    const resetIdle = () => {
      isIdleRef.current = false;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        isIdleRef.current = true;
        setExpression('SLEEPY');
      }, 7000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      resetIdle();
      setExpression(prev => (prev === 'SLEEPY' ? 'DEFAULT' : prev));
    };

    const scheduleRandomExpression = () => {
      const waitTime = Math.random() * 5000 + 5000;
      expressionTimerRef.current = window.setTimeout(() => {
        if (!isIdleRef.current) {
          const rand = Math.random();
          let nextExp: MascotExpression = 'DEFAULT';
          if (rand < 0.15) nextExp = 'BLINK';
          else if (rand < 0.3) nextExp = 'CURIOUS';
          else if (rand < 0.45) nextExp = 'HAPPY';
          else if (rand < 0.6) nextExp = 'SURPRISED';
          else if (rand < 0.75) nextExp = 'EXCITED';
          
          setExpression(nextExp);
          
          setTimeout(() => {
            setExpression(prev => (prev === nextExp ? 'DEFAULT' : prev));
          }, nextExp === 'BLINK' ? 200 : 1500);
        }
        scheduleRandomExpression();
      }, waitTime);
    };

    if (!prefersReduced) {
      window.addEventListener('mousemove', handleMouseMove);
      resetIdle();
      scheduleRandomExpression();

      const updateMascot = (time: number) => {
        if (!zoneRef.current || !mascotRef.current || !eyeRef.current) {
          animationFrame = requestAnimationFrame(updateMascot);
          return;
        }

        const zoneRect = zoneRef.current.getBoundingClientRect();
        const mascotRect = mascotRef.current.getBoundingClientRect();
        
        // Neutral position is center of the zone
        const zoneCenterX = zoneRect.left + zoneRect.width / 2;
        const zoneCenterY = zoneRect.top + zoneRect.height / 2;
        
        let targetBodyX = 0;
        let targetBodyY = 0;
        let targetEyeX = 0;
        let targetEyeY = 0;

        if (!isIdleRef.current) {
          const isMouseInSidebar = 
            mousePosRef.current.x >= zoneRect.left - 20 && 
            mousePosRef.current.x <= zoneRect.right + 20;

          if (isMouseInSidebar) {
            // Mouse is in or very near sidebar, move body towards mouse
            const dx = mousePosRef.current.x - zoneCenterX;
            const dy = mousePosRef.current.y - zoneCenterY;
            
            // Constrain movement so it NEVER leaves the zone.
            // Leave some padding so it doesn't touch the borders.
            const maxTravelX = Math.max(0, (zoneRect.width - mascotRect.width) / 2 - 16);
            const maxTravelY = Math.max(0, (zoneRect.height - mascotRect.height) / 2 - 40); // extra padding for manual button
            
            targetBodyX = Math.max(-maxTravelX, Math.min(maxTravelX, dx * 0.5));
            targetBodyY = Math.max(-maxTravelY, Math.min(maxTravelY, dy * 0.5));
          } else {
            // Mouse outside sidebar: gently return body to center
            targetBodyX = 0;
            targetBodyY = 0;
          }

          // Eyes track mouse regardless, but subtly
          const currentMascotCenterX = zoneCenterX + currentBodyOffset.current.x;
          const currentMascotCenterY = zoneCenterY + currentBodyOffset.current.y;
          
          const edx = mousePosRef.current.x - currentMascotCenterX;
          const edy = mousePosRef.current.y - currentMascotCenterY;
          const dist = Math.sqrt(edx * edx + edy * edy);
          
          if (dist > 0) {
            const maxEyeOffset = 3;
            targetEyeX = (edx / dist) * Math.min(dist / 40, maxEyeOffset);
            targetEyeY = (edy / dist) * Math.min(dist / 40, maxEyeOffset);
          }
        }

        const dt = Math.min(time - lastTimeRef.current, 50);
        lastTimeRef.current = time;
        
        const lerpFactorBody = 1 - Math.exp(-dt * 0.005);
        const lerpFactorEye = 1 - Math.exp(-dt * 0.01);
        
        currentBodyOffset.current.x += (targetBodyX - currentBodyOffset.current.x) * lerpFactorBody;
        currentBodyOffset.current.y += (targetBodyY - currentBodyOffset.current.y) * lerpFactorBody;
        
        currentEyeOffset.current.x += (targetEyeX - currentEyeOffset.current.x) * lerpFactorEye;
        currentEyeOffset.current.y += (targetEyeY - currentEyeOffset.current.y) * lerpFactorEye;
        
        // Direct DOM manipulation
        mascotRef.current.style.transform = `translate(${currentBodyOffset.current.x}px, ${currentBodyOffset.current.y}px)`;
        eyeRef.current.style.transform = `translate(${currentEyeOffset.current.x}px, ${currentEyeOffset.current.y}px)`;

        animationFrame = requestAnimationFrame(updateMascot);
      };
      
      animationFrame = requestAnimationFrame(updateMascot);
    } else {
      scheduleRandomExpression();
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (expressionTimerRef.current) clearTimeout(expressionTimerRef.current);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Mascot Zone container */}
      <div 
        ref={zoneRef} 
        className="flex-1 relative flex flex-col items-center justify-center p-4 min-h-[200px] border-t border-primary/10 mt-2"
      >
        {/* Decorative corner markers for the zone */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-primary/20 pointer-events-none" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-primary/20 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-primary/20 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-primary/20 pointer-events-none" />
        
        <div className="absolute top-4 text-[9px] text-primary/30 tracking-widest pointer-events-none font-terminal-code">
          SYSTEM_COMPANION
        </div>

        {/* The interactive mascot */}
        <button
          ref={mascotRef}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            if (onOpenManual) onOpenManual();
            else setGuideOpen(true);
            setExpression('EXCITED');
            setTimeout(() => setExpression('DEFAULT'), 1500);
          }}
          aria-label="Open PRINCE.OS system guide"
          className="relative z-10 focus:outline-none rounded-sm group mb-8 cursor-pointer"
          title="System Companion"
        >
          <MascotFace expression={expression} eyeRef={eyeRef} />
        </button>

        {/* Manual Button */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            if (onOpenManual) onOpenManual();
            else setGuideOpen(true);
          }}
          className="absolute bottom-6 flex items-center gap-2 px-3 py-1.5 border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-colors focus:outline-none focus:bg-primary/10 rounded-sm cursor-pointer"
          aria-label="Open PRINCE.OS Manual"
        >
          <span className="material-symbols-outlined text-sm">menu_book</span>
          <span className="text-[10px] tracking-widest font-bold">MANUAL</span>
          <span className="text-primary/50 text-[10px] ml-1">?</span>
        </button>
      </div>

      {!onOpenManual && guideOpen && <MascotGuide onClose={() => {
        setGuideOpen(false);
        mascotRef.current?.focus();
      }} />}
    </>
  );
};
