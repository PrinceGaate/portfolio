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
import { CommandPrompt } from './components/terminal/CommandPrompt';

import { MascotGuide } from './components/mascot/MascotGuide';
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

  // Initialize in-app navigation stack and sync hash without polluting browser history
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentHash = window.location.hash.replace(/^#\/?/, '').toLowerCase() as AppState;

    if (VALID_HASH_SCREENS.includes(currentHash)) {
      if (currentHash !== 'home') {
        navStackRef.current = ['home', currentHash];
      } else {
        navStackRef.current = ['home'];
      }
      window.history.replaceState(null, '', `#${currentHash}`);
    } else {
      navStackRef.current = ['hero'];
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase() as AppState;
      if (VALID_HASH_SCREENS.includes(hash)) {
        setAppState((prev) => {
          if (prev !== hash) {
            const stack = navStackRef.current;
            if (stack.length === 0 || stack[stack.length - 1] !== hash) {
              stack.push(hash);
            }
            return hash;
          }
          return prev;
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Forward navigation initiated from UI or command prompt
  const handleNavigate = useCallback((screen: AppState) => {
    if (screen === appState) return;

    if (screen === 'boot') {
      setAppState('boot');
      return;
    }

    // Update in-app stack
    const stack = navStackRef.current;
    if (stack.length === 0 || stack[stack.length - 1] !== screen) {
      stack.push(screen);
    }

    // Update hash with replaceState so current screen is reflected without creating browser back history
    if (screen === 'hero') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } else {
      window.history.replaceState(null, '', `#${screen}`);
    }

    setAppState(screen);
  }, [appState]);

  // Unified OS-Style Back Behavior: ESC is the back navigation
  const handleBack = useCallback(() => {
    // If at hero or boot, Escape does nothing
    if (appState === 'hero' || appState === 'boot') return;

    // If already at root home, stay on home (never exit the OS via Escape)
    if (appState === 'home') return;

    const stack = navStackRef.current;
    let targetScreen: AppState = 'home';

    if (stack.length > 1) {
      // Pop current screen
      stack.pop();
      // Target is the previous screen in the stack
      targetScreen = stack[stack.length - 1] || 'home';
    } else {
      targetScreen = 'home';
      navStackRef.current = ['home'];
    }

    // Never navigate back to hero or boot via Escape
    if (targetScreen === 'hero' || targetScreen === 'boot') {
      targetScreen = 'home';
      navStackRef.current = ['home'];
    }

    // Update state directly and sync hash via replaceState (no window.history.back)
    setAppState(targetScreen);
    window.history.replaceState(null, '', `#${targetScreen}`);
  }, [appState]);

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

        // If a modal, dialog, or overlay is open, do not navigate away from parent screen
        if (typeof document !== 'undefined' && document.querySelector('[role="dialog"]')) {
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
            <CommandPrompt onNavigate={handleNavigate} />
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
