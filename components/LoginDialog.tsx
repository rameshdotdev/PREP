import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Activity } from 'lucide-react';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate network request and auth handshake
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      ></div>

      {/* Dialog Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Decorative Top Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent"></div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-mono font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-500" />
                AUTHENTICATE
              </h2>
              <p className="text-xs font-mono text-zinc-500 mt-2 tracking-wider uppercase">
                Identify yourself to access the core
              </p>
            </div>
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-zinc-200 dark:border-zinc-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                <Activity className="absolute inset-0 m-auto w-6 h-6 text-emerald-500 animate-pulse" />
              </div>
              <div className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
                <p className="animate-pulse">ESTABLISHING_SECURE_UPLINK...</p>
                <p className="text-[10px] text-zinc-400 mt-1">VERIFYING_CREDENTIALS</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-sm border border-zinc-100 dark:border-zinc-800 text-center">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 font-mono">
                  SELECT_IDENTITY_PROVIDER
                </p>
                
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 px-4 py-3 rounded-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group relative overflow-hidden"
                >
                  {/* Google Logo SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="font-medium">Sign in with Google</span>
                </button>
              </div>

              <div className="flex items-center gap-2 justify-center text-[10px] font-mono text-zinc-400">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>ENCRYPTED CONNECTION // 256-BIT</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
