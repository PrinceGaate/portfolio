import React, { useState } from 'react';
import { SideNavBar } from './SideNavBar';
import { Footer } from './Footer';
import { PathHeader } from './PathHeader';
import { MobileDirectoryDrawer } from '../navigation/MobileDirectoryDrawer';
import type { AppState } from '../../types/navigation';

interface OSLayoutProps {
  children: React.ReactNode;
  activeSidebarTab?: string;
  appState?: string;
  onNavigate?: (screen: AppState) => void;
  onOpenManual?: () => void;
}

export const OSLayout: React.FC<OSLayoutProps> = ({ 
  children, 
  activeSidebarTab, 
  appState, 
  onNavigate, 
  onOpenManual 
}) => {
  const [isMobileDirectoryOpen, setIsMobileDirectoryOpen] = useState(false);

  return (
    <div className="crt-container flex flex-col cursor-terminal bg-background min-h-screen">
      <div className="os-scanlines"></div>
      <div className="os-crt-overlay"></div>
      
      <main className="flex-1 flex overflow-hidden z-30 relative w-full max-w-[1440px] mx-auto p-container-padding gap-container-padding pb-[60px]">
        {/* ── Desktop Persistent Side Navigation Bar ── */}
        <SideNavBar 
          activeTab={activeSidebarTab} 
          currentAppState={appState as AppState}
          onNavigate={onNavigate} 
          onOpenManual={onOpenManual} 
        />

        {/* ── Main Content Area ── */}
        <section className="flex-1 flex flex-col gap-gutter h-full overflow-hidden">
          {appState && (
            <PathHeader 
              appState={appState} 
              onNavigate={onNavigate} 
              onOpenManual={onOpenManual} 
              onToggleMobileDirectory={() => setIsMobileDirectoryOpen(true)}
            />
          )}
          {children}
        </section>
      </main>

      {/* ── Mobile Collapsible Directory Drawer ── */}
      <MobileDirectoryDrawer
        isOpen={isMobileDirectoryOpen}
        onClose={() => setIsMobileDirectoryOpen(false)}
        currentAppState={appState as AppState}
        onNavigate={onNavigate}
        onOpenManual={onOpenManual}
      />
      
      <Footer />
    </div>
  );
};
