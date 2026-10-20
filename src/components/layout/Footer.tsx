import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface text-primary font-label-md text-label-md fixed bottom-0 left-0 w-full z-50 flex justify-center items-center py-2 border-t border-primary/30 phosphor-glow hover:text-primary-fixed-dim transition-colors cursor-terminal">
      [ ENTER ] EXECUTE &nbsp;&nbsp; [ ESC ] BACK &nbsp;&nbsp;
    </footer>
  );
};
