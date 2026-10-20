import React from 'react';

export const AnalogLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="analog-theme min-h-screen selection:bg-cyan-primary-container selection:text-cyan-surface" style={{ transform: "translate(0.4px, -1.4px) skewX(0.4deg)" }}>
      <div className="analog-crt-overlay"></div>
      <div className="vignette"></div>
      <div className="screen-curve min-h-screen flex flex-col p-[2%] lg:p-[4%]">
        {children}
      </div>
    </div>
  );
};
