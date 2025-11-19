import React from 'react';
import { Terminal, Search, Wifi, Sun, Moon, LogIn, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  onNavigate: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  onLoginClick: () => void;
  user: User | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, isDark, toggleTheme, onLoginClick, user }) => {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-black/70 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo Area */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={onNavigate}
        >
          <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-sm border border-zinc-200 dark:border-zinc-800 group-hover:border-emerald-500/50 transition-colors">
            <Terminal className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-widest leading-none">REVOLT</span>
            <span className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] leading-none">SYSTEM_V.2.1</span>
          </div>
        </div>

        {/* Search / Command Input (Hidden on Mobile) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="SEARCH PYQS, TOPICS..."
              className="block w-full pl-10 pr-3 py-2 border border-zinc-300 dark:border-zinc-800 rounded-sm leading-5 bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-300 placeholder-zinc-500 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 sm:text-sm font-mono uppercase transition-all"
            />
          </div>
        </div>

        {/* Status Indicators & Theme Switcher */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Wifi className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
            <span className="hidden lg:inline">ONLINE</span>
          </div>
          
          <div className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-800"></div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
            title="Toggle Visual Mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile / Login */}
          <div className="flex items-center gap-2">
            {user ? (
              <div 
                className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onNavigate}
              >
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-zinc-900 dark:text-white">{user.name}</div>
                  <div className="text-[10px] font-mono text-zinc-500">ID: {user.id}</div>
                </div>
                <div className="w-8 h-8 rounded-sm bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-500">
                  <LayoutDashboard className="w-4 h-4" />
                </div>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors shadow-lg"
              >
                <LogIn className="w-3 h-3" />
                <span>LOGIN</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};