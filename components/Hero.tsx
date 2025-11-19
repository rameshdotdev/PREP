import React from 'react';
import { TerminalWidget } from './TerminalWidget';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <header className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-[size:50px_50px] bg-grid-pattern-light dark:bg-grid-pattern opacity-20 z-0 pointer-events-none transition-all duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-zinc-50 dark:from-black dark:via-transparent dark:to-black z-0 pointer-events-none transition-all duration-300"></div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="inline-block mb-6 px-3 py-1 border border-fuchsia-500/30 bg-fuchsia-500/10 rounded-sm">
          <span className="font-mono text-xs text-fuchsia-600 dark:text-fuchsia-400 tracking-[0.3em] animate-pulse">ADMISSIONS_OPEN_2025</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-600 mb-6 leading-[0.9] drop-shadow-sm dark:drop-shadow-none transition-all duration-300">
          DOMINATE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-400 dark:to-emerald-700 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] dark:drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">THE RANK</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-12 transition-colors duration-300">
          High-fidelity mock simulations, PYQs, and adaptive learning algorithms for competitive exams. 
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="text-zinc-700 dark:text-zinc-200 font-mono text-xs mx-1 p-1 bg-zinc-200 dark:bg-zinc-900 rounded-sm transition-colors duration-300">UPSC CSE</span>
            <span className="text-zinc-700 dark:text-zinc-200 font-mono text-xs mx-1 p-1 bg-zinc-200 dark:bg-zinc-900 rounded-sm transition-colors duration-300">SSC CGL</span>
            <span className="text-zinc-700 dark:text-zinc-200 font-mono text-xs mx-1 p-1 bg-zinc-200 dark:bg-zinc-900 rounded-sm transition-colors duration-300">JEE MAINS</span>
            <span className="text-zinc-700 dark:text-zinc-200 font-mono text-xs mx-1 p-1 bg-zinc-200 dark:bg-zinc-900 rounded-sm transition-colors duration-300">NEET UG</span>
          </div>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-emerald-500 text-white dark:text-black font-mono font-bold tracking-widest hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 clip-path-slant"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
          >
            ATTEMPT_MOCK_TEST
          </button>
          <button className="px-8 py-4 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-mono text-sm hover:border-zinc-500 dark:hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            BROWSE_PYQS
          </button>
        </div>

        <TerminalWidget />
      </div>
    </header>
  );
};