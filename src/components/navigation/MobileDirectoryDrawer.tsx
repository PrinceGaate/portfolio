import React, { useEffect } from 'react';
import { SectionDirectory } from './SectionDirectory';
import { useOverlay } from '../../hooks/useOverlay';
import type { AppState } from '../../types/navigation';

interface MobileDirectoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentAppState?: AppState;
  onNavigate?: (screen: AppState) => void;
  onOpenManual?: () => void;
}

export const MobileDirectoryDrawer: React.FC<MobileDirectoryDrawerProps> = ({
  isOpen,
  onClose,
  currentAppState = 'home',
  onNavigate,
  onOpenManual,
}) => {
  // Register with overlay manager so Android gesture / hardware Back closes the drawer
  useOverlay(isOpen, onClose, 'mobile-section-directory');

  // Handle ESC key press specifically when drawer is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex" role="dialog" aria-modal="true" aria-label="Section Navigation Drawer">
      {/* ── Dark CRT Backdrop with click-to-dismiss ── */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Slide-Out Drawer Panel ── */}
      <aside className="relative z-10 w-[280px] max-w-[85vw] h-full bg-surface-container border-r border-primary/40 shadow-[0_0_40px_rgba(0,0,0,0.95)] flex flex-col p-4 overflow-hidden animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-3 border-b border-primary/30 mb-3 select-none">
          <div className="flex flex-col">
            <span className="font-headline-sm text-sm text-primary font-bold tracking-wider">
              PRINCE.OS // DIR
            </span>
            <span className="text-[10px] text-primary/60 font-terminal-code">
              ROOT_USER [LVL_4_AUTH]
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 px-2 py-1 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/40 rounded-xs text-[10px] font-terminal-code transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            aria-label="Close directory drawer"
          >
            <span>[ESC]</span>
            <span className="material-symbols-outlined text-[13px]">close</span>
          </button>
        </div>

        {/* Directory Navigation Tree */}
        <div className="flex-1 overflow-y-auto pr-1">
          <SectionDirectory
            currentScreen={currentAppState}
            onNavigate={onNavigate}
            onItemClick={onClose}
          />
        </div>

        {/* Drawer Footer with Quick Manual Guide Access */}
        <div className="pt-3 border-t border-primary/20 mt-2 flex flex-col gap-2 select-none shrink-0 font-terminal-code">
          {onOpenManual && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenManual();
              }}
              className="w-full flex items-center justify-center gap-2 py-1.5 px-3 bg-primary/5 hover:bg-primary/15 text-primary border border-primary/30 rounded-xs text-xs font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              aria-label="Open PRINCE.OS System Manual"
            >
              <span className="material-symbols-outlined text-[14px]">menu_book</span>
              <span>SYSTEM MANUAL [?]</span>
            </button>
          )}

          <div className="text-[9px] text-primary/40 text-center tracking-widest uppercase">
            SEC_AUTH // SYSTEM_ONLINE
          </div>
        </div>
      </aside>
    </div>
  );
};
