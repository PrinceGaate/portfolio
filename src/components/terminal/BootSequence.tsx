import React, { useState, useEffect } from 'react';

const BOOT_LOGS = [
  "PRINCE.OS BIOS v1.0.0",
  "> CORE SYSTEM INITIALIZATION...",
  "> MEMORY ALLOCATION ........ OK",
  "> LOADING PROTOCOLS...",
  "> NETWORK LINK ............. OK",
  "> DATA STREAM .............. OK",
  "> ENCRYPTION LAYER ......... OK",
  "> ACCESS GRANTED",
  "> SYSTEM READY"
];

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    let currentIndex = 0;
    
    const nextLine = () => {
      if (currentIndex < BOOT_LOGS.length) {
        setLines(prev => [...prev, BOOT_LOGS[currentIndex]]);
        currentIndex++;
        // Randomize delay for realistic feel
        const delay = Math.random() * 300 + 200; 
        setTimeout(nextLine, delay);
      } else {
        setTimeout(onComplete, 800);
      }
    };
    
    const timeout = setTimeout(nextLine, 400);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="flex-1 w-full h-full p-container-padding z-40 relative flex flex-col justify-start items-start">
      <div className="font-terminal-code text-body-lg text-primary phosphor-glow space-y-2">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        {lines.length < BOOT_LOGS.length && (
          <div className="inline-block w-3 h-5 bg-primary cursor-blink ml-1 align-middle mb-1"></div>
        )}
      </div>
    </div>
  );
};
