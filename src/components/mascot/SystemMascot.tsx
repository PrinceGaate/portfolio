import React, { useState, useEffect, useRef } from 'react';
import { MascotFace } from './MascotFace';
import type { MascotExpression } from './MascotFace';
import { MascotGuide } from './MascotGuide';
import { isMobileDevice } from '../../utils/device';

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
  
  // Cached dimensions to prevent synchronous layout recalculations
  const zoneBoundsRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
  }>({ left: 0, top: 0, width: 0, height: 0, centerX: 0, centerY: 0 });

  const currentBodyOffset = useRef({ x: 0, y: 0 });
  const currentEyeOffset = useRef({ x: 0, y: 0 });
  const targetBodyRef = useRef({ x: 0, y: 0 });
  const targetEyeRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const isLoopRunningRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = isMobileDevice();

    const updateZoneBounds = () => {
      if (!zoneRef.current) return;
      const rect = zoneRef.current.getBoundingClientRect();
      zoneBoundsRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      };
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

    // On touch/mobile devices or when prefers-reduced-motion is true:
    // Do NOT run mouse tracking or continuous RAF loop.
    if (prefersReduced || isMobile) {
      scheduleRandomExpression();
      return () => {
        if (expressionTimerRef.current) clearTimeout(expressionTimerRef.current);
      };
    }

    // Initialize cached bounds
    updateZoneBounds();
    window.addEventListener('resize', updateZoneBounds, { passive: true });

    const stepAnimation = (time: number) => {
      if (!mascotRef.current || !eyeRef.current) {
        isLoopRunningRef.current = false;
        return;
      }

      const dt = Math.min(time - (lastTimeRef.current || time), 50);
      lastTimeRef.current = time;

      const lerpFactorBody = 1 - Math.exp(-dt * 0.005);
      const lerpFactorEye = 1 - Math.exp(-dt * 0.01);

      const targetBody = targetBodyRef.current;
      const targetEye = targetEyeRef.current;

      currentBodyOffset.current.x += (targetBody.x - currentBodyOffset.current.x) * lerpFactorBody;
      currentBodyOffset.current.y += (targetBody.y - currentBodyOffset.current.y) * lerpFactorBody;

      currentEyeOffset.current.x += (targetEye.x - currentEyeOffset.current.x) * lerpFactorEye;
      currentEyeOffset.current.y += (targetEye.y - currentEyeOffset.current.y) * lerpFactorEye;

      mascotRef.current.style.transform = `translate3d(${currentBodyOffset.current.x.toFixed(2)}px, ${currentBodyOffset.current.y.toFixed(2)}px, 0)`;
      eyeRef.current.style.transform = `translate3d(${currentEyeOffset.current.x.toFixed(2)}px, ${currentEyeOffset.current.y.toFixed(2)}px, 0)`;

      // Check if settled to stop running RAF loop
      const bodyDiff = Math.abs(targetBody.x - currentBodyOffset.current.x) + Math.abs(targetBody.y - currentBodyOffset.current.y);
      const eyeDiff = Math.abs(targetEye.x - currentEyeOffset.current.x) + Math.abs(targetEye.y - currentEyeOffset.current.y);

      if (bodyDiff < 0.05 && eyeDiff < 0.05) {
        // Snapped to resting position, pause RAF loop
        isLoopRunningRef.current = false;
        animationFrameRef.current = null;
        return;
      }

      animationFrameRef.current = requestAnimationFrame(stepAnimation);
    };

    const wakeAnimationLoop = () => {
      if (!isLoopRunningRef.current) {
        isLoopRunningRef.current = true;
        lastTimeRef.current = performance.now();
        animationFrameRef.current = requestAnimationFrame(stepAnimation);
      }
    };

    const resetIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        isIdleRef.current = true;
        setExpression('SLEEPY');
        targetBodyRef.current = { x: 0, y: 0 };
        targetEyeRef.current = { x: 0, y: 0 };
        wakeAnimationLoop();
      }, 7000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;

      if (isIdleRef.current) {
        isIdleRef.current = false;
        setExpression('DEFAULT');
      }
      resetIdle();

      const bounds = zoneBoundsRef.current;
      if (bounds.width === 0) {
        updateZoneBounds();
      }

      if (!isIdleRef.current && bounds.width > 0) {
        const isMouseInSidebar = 
          e.clientX >= bounds.left - 20 && 
          e.clientX <= bounds.left + bounds.width + 20;

        if (isMouseInSidebar) {
          const dx = e.clientX - bounds.centerX;
          const dy = e.clientY - bounds.centerY;

          const maxTravelX = Math.max(0, bounds.width / 2 - 40);
          const maxTravelY = Math.max(0, bounds.height / 2 - 50);

          targetBodyRef.current.x = Math.max(-maxTravelX, Math.min(maxTravelX, dx * 0.4));
          targetBodyRef.current.y = Math.max(-maxTravelY, Math.min(maxTravelY, dy * 0.4));
        } else {
          targetBodyRef.current.x = 0;
          targetBodyRef.current.y = 0;
        }

        // Eye tracking calculations using cached center
        const mascotCenterX = bounds.centerX + currentBodyOffset.current.x;
        const mascotCenterY = bounds.centerY + currentBodyOffset.current.y;
        const edx = e.clientX - mascotCenterX;
        const edy = e.clientY - mascotCenterY;
        const dist = Math.hypot(edx, edy);

        if (dist > 0) {
          const maxEyeOffset = 3;
          targetEyeRef.current.x = (edx / dist) * Math.min(dist / 40, maxEyeOffset);
          targetEyeRef.current.y = (edy / dist) * Math.min(dist / 40, maxEyeOffset);
        } else {
          targetEyeRef.current.x = 0;
          targetEyeRef.current.y = 0;
        }

        wakeAnimationLoop();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    resetIdle();
    scheduleRandomExpression();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateZoneBounds);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (expressionTimerRef.current) clearTimeout(expressionTimerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      isLoopRunningRef.current = false;
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
