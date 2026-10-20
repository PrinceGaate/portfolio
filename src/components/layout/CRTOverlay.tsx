import React from 'react';

interface CRTOverlayProps {
  children: React.ReactNode;
}

export const CRTOverlay: React.FC<CRTOverlayProps> = ({ children }) => {
  return (
    <div className="crt-container flex flex-col cursor-terminal">
      <div className="scanlines"></div>
      <div className="crt-overlay"></div>
      {children}
    </div>
  );
};
