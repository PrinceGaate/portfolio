import React from 'react';

interface PanelProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({ label, children, className = '' }) => (
  <section aria-label={label} className={`terminal-panel flex flex-col border-primary/20 ${className}`}>
    <div className="px-3 py-1.5 border-b border-primary/20 text-[10px] text-primary/70 tracking-widest shrink-0 font-bold">
      {label}
    </div>
    <div className="flex-1 p-3">{children}</div>
  </section>
);
