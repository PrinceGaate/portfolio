import { useState, useEffect, useCallback, useRef } from 'react';
import { HeroScreen } from './screens/hero/HeroScreen';
import { BootScreen } from './screens/boot/BootScreen';
import { HomeScreen } from './screens/home/HomeScreen';
import { AboutScreen } from './screens/about/AboutScreen';
import { ContactScreen } from './screens/contact/ContactScreen';
import { SkillsScreen } from './screens/skills';
import { ProjectsScreen } from './screens/projects';
import { ResumeScreen } from './screens/resume';
import { CertificationsScreen } from './screens/certifications';
import { OSLayout } from './components/layout/OSLayout';
import { MascotGuide } from './components/mascot/MascotGuide';
import { overlayManager } from './utils/overlayManager';
import type { AppState } from './types/navigation';

const VALID_HASH_SCREENS: AppState[] = [
  'home',
  'projects',
  'skills',
  'about',
  'certifications',
  'resume',
  'contact',
  'methods',
  'terminal'
];

function getInitialState(): AppState {
  if (typeof window === 'undefined') return 'hero';
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (VALID_HASH_SCREENS.includes(hash as AppState)) {
    return hash as AppState;
  }
  return 'hero';
}

function App() {
  const [appState, setAppState] = useState<AppState>(getInitialState);
  const [manualOpen, setManualOpen] = useState(false);

  const navStackRef = useRef<AppState[]>([]);
  const appStateRef = useRef<AppState>(appState);
  appStateRef.current = appState;

  // Initialize browser history and attach popstate handler
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentHash = window.location.hash.replace(/^#\/?/, '').toLowerCase() as AppState;

    if (VALID_HASH_SCREENS.includes(currentHash)) {
      if (currentHash !== 'home') {
        navStackRef.current = ['home', currentHash];
        // Populate history stack so Android Back from direct URL returns to 'home'
        window.history.replaceState({ screen: 'home' }, '', '#home');
        window.history.pushState({ screen: currentHash }, '', `#${currentHash}`);
      } else {
        navStackRef.current = ['home'];
        window.history.replaceState({ screen: 'home' }, '', '#home');
      }
    } else {
      navStackRef.current = ['hero'];
      window.history.replaceState({ screen: 'hero' }, '', window.location.pathname + window.location.search);
    }

    const handlePopState = (event: PopStateEvent) => {
      // 1. If this popstate was triggered by a programmatic overlay close or should dismiss an overlay:
      if (overlayManager.handlePopState()) {
        return;
      }

      // 2. Otherwise, perform internal screen navigation:
      const stateScreen = event.state?.screen as AppState | undefined;
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase() as AppState;

      let targetScreen: AppState = 'home';
      if (stateScreen && VALID_HASH_SCREENS.includes(stateScreen)) {
        targetScreen = stateScreen;
      } else if (VALID_HASH_SCREENS.includes(hash)) {
        targetScreen = hash;
      } else if (!hash || hash === 'hero' || stateScreen === 'hero') {
        targetScreen = 'hero';
      }

      // Update in-app stack
      const stack = navStackRef.current;
      if (stack.length > 1 && stack[stack.length - 1] === appStateRef.current) {
        stack.pop();
      }

      setAppState(targetScreen);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Forward navigation initiated from UI or command prompt
  const handleNavigate = useCallback((screen: AppState) => {
    if (screen === appState) return;

    if (screen === 'boot') {
      setAppState('boot');
      return;
    }

    // Dismiss any open overlays when navigating to a new screen
    overlayManager.dismissAll();

    // Update in-app stack
    const stack = navStackRef.current;
    if (stack.length === 0 || stack[stack.length - 1] !== screen) {
      stack.push(screen);
    }

    // Update browser history: pushState creates history entry for Android/browser Back
    if (appState === 'hero' || appState === 'boot') {
      // Transitioning into the OS from boot/hero replaces state to prevent navigating back to boot sequence
      window.history.replaceState({ screen }, '', `#${screen}`);
    } else if (screen === 'hero') {
      window.history.pushState({ screen: 'hero' }, '', window.location.pathname + window.location.search);
    } else {
      window.history.pushState({ screen }, '', `#${screen}`);
    }

    setAppState(screen);
  }, [appState]);

  // Unified OS-Style Back Behavior: ESC is the back navigation
  const handleBack = useCallback(() => {
    // If at hero or boot, Escape does nothing
    if (appState === 'hero' || appState === 'boot') return;

    // If already at root home, stay on home (never exit the OS via Escape)
    if (appState === 'home') return;

    // Go back in browser history if possible so history and screen remain in sync
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      handleNavigate('home');
    }
  }, [appState, handleNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
        setManualOpen(prev => !prev);
        return;
      }

      if (e.key === 'Escape') {
        if (e.defaultPrevented) return;
        if (manualOpen) {
          e.preventDefault();
          setManualOpen(false);
          return;
        }

        // If a modal, dialog, or overlay is open, dismiss the overlay first without navigating away
        if (overlayManager.hasOpenOverlays() || (typeof document !== 'undefined' && document.querySelector('[role="dialog"]'))) {
          return;
        }

        e.preventDefault();
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack, manualOpen]);

  const getActiveTab = (state: AppState) => {
    switch (state) {
      case 'home':
        return 'DIRECTORY';
      case 'projects':
        return 'PROJECTS';
      case 'skills':
        return 'SKILLS';
      case 'about':
        return 'ABOUT_ME';
      case 'methods':
        return 'METHODS';
      case 'resume':
        return 'RESUME.TXT';
      case 'contact':
        return 'CONTACT';
      case 'certifications':
        return 'CERTIFICATIONS';
      default:
        return 'DIRECTORY';
    }
  };

  if (appState === 'hero') {
    return <HeroScreen onConnect={() => setAppState('boot')} />;
  }

  if (appState === 'boot') {
    return <BootScreen onComplete={() => handleNavigate('home')} />;
  }

  // OS Desktop States
  const renderOSContent = () => {
    switch (appState) {
      case 'home':
      case 'terminal': // Default terminal falls back to home for now
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'about':
        return <AboutScreen onNavigate={handleNavigate} />;
      case 'skills':
        return <SkillsScreen onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactScreen onNavigate={handleNavigate} />;
      case 'projects':
        return <ProjectsScreen onNavigate={handleNavigate} />;
      case 'resume':
        return <ResumeScreen onNavigate={handleNavigate} />;
      case 'certifications':
        return <CertificationsScreen onNavigate={handleNavigate} />;
      default:
        // Placeholder for future screens
        return (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="terminal-panel terminal-panel-active p-6 phosphor-glow shrink-0">
              <h1 className="font-headline-lg text-headline-lg mb-2 uppercase">{appState} SYSTEM</h1>
              <p className="font-terminal-code text-terminal-code text-primary/80 flex items-center">
                &gt; This module is currently under construction.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <OSLayout 
      activeSidebarTab={getActiveTab(appState)} 
      appState={appState}
      onNavigate={handleNavigate}
      onOpenManual={() => setManualOpen(true)}
    >
      {renderOSContent()}
      {manualOpen && <MascotGuide onClose={() => setManualOpen(false)} />}
    </OSLayout>
  );
}

export default App;
