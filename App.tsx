import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExamGrid } from './components/ExamGrid';
import { TestRunner } from './components/TestRunner';
import { LoginDialog } from './components/LoginDialog';
import { Dashboard } from './components/Dashboard';
import { ViewState, User } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [isDark, setIsDark] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleStartSimulation = () => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }
    setView(ViewState.RUNNER);
    window.scrollTo(0, 0);
  };

  const handleExitSimulation = () => {
    const confirmExit = window.confirm("WARNING: ABORTING SIMULATION WILL FORFEIT PROGRESS. CONFIRM?");
    if (confirmExit) {
      // Return to dashboard if logged in, else landing
      setView(user ? ViewState.DASHBOARD : ViewState.LANDING);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleLogin = () => {
    // Mock User Data
    const newUser: User = {
      id: 'USR-7782',
      name: 'Candidate_One',
      email: 'user@example.com',
      selectedExams: [] // Start empty to trigger onboarding in dashboard
    };
    setUser(newUser);
    setIsLoginOpen(false);
    setView(ViewState.DASHBOARD); // Redirect to Dashboard
  };

  const handleNavigateHome = () => {
    if (user) {
        setView(ViewState.DASHBOARD);
    } else {
        setView(ViewState.LANDING);
    }
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-800 dark:text-zinc-400 font-sans selection:bg-emerald-500 selection:text-white dark:selection:text-black relative transition-colors duration-300">
      {/* Global Scanline Effect */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-10 scanlines"></div>

      <LoginDialog 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin} 
      />

      {view === ViewState.LANDING && (
        <>
          <Navbar 
            onNavigate={handleNavigateHome} 
            isDark={isDark} 
            toggleTheme={toggleTheme} 
            onLoginClick={() => setIsLoginOpen(true)}
            user={user}
          />
          <main>
            <Hero onStart={handleStartSimulation} />
            <ExamGrid onSelect={handleStartSimulation} />
            
            <footer className="border-t border-zinc-200 dark:border-zinc-900 py-12 mt-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="font-mono text-xs text-zinc-500 dark:text-zinc-600 tracking-widest uppercase">
                  Revolt System © 2024 // All Rights Reserved // Unauthorized Access Prohibited
                </p>
              </div>
            </footer>
          </main>
        </>
      )}

      {view === ViewState.DASHBOARD && user && (
        <>
          <Navbar 
            onNavigate={handleNavigateHome} 
            isDark={isDark} 
            toggleTheme={toggleTheme} 
            onLoginClick={() => {}}
            user={user}
          />
          <Dashboard 
            user={user} 
            onUpdateUser={handleUpdateUser}
            onStartSimulation={handleStartSimulation} 
          />
        </>
      )}

      {view === ViewState.RUNNER && (
        <TestRunner onExit={handleExitSimulation} isDark={isDark} toggleTheme={toggleTheme} />
      )}
    </div>
  );
};

export default App;