import React, { useEffect, useState } from 'react';
import { TestResult } from '../types';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Target, 
  Share2, 
  LayoutDashboard,
  Download,
  RotateCcw
} from 'lucide-react';

interface ResultCardProps {
  result: TestResult;
  onHome: () => void;
  onRetry: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onHome, onRetry }) => {
  const [animateScore, setAnimateScore] = useState(0);

  useEffect(() => {
    // Simple animation for the score counter
    const duration = 1500;
    const steps = 60;
    const increment = result.score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= result.score) {
        setAnimateScore(result.score);
        clearInterval(timer);
      } else {
        setAnimateScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [result.score]);

  const getGrade = (score: number) => {
    if (score >= 90) return { label: 'ELITE', color: 'text-fuchsia-500' };
    if (score >= 75) return { label: 'SUPERIOR', color: 'text-emerald-500' };
    if (score >= 50) return { label: 'PASSABLE', color: 'text-yellow-500' };
    return { label: 'CRITICAL FAILURE', color: 'text-red-500' };
  };

  const grade = getGrade(result.score);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.score / 100) * circumference;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-800 dark:text-zinc-300 flex items-center justify-center p-4 md:p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[size:40px_40px] bg-grid-pattern-light dark:bg-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="w-full max-w-4xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-sm relative z-10 animate-in fade-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto">
        
        {/* Header Strip */}
        <div className="h-2 w-full bg-gradient-to-r from-fuchsia-600 via-purple-500 to-emerald-500 sticky top-0 z-20"></div>

        <div className="p-6 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-[10px] font-mono rounded text-zinc-500">
                  SESSION_ID: 0X-{Math.floor(Math.random() * 10000)}
                </div>
                <div className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-[10px] font-mono rounded text-zinc-500">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-mono font-black text-zinc-900 dark:text-white tracking-tight">MISSION DEBRIEF</h1>
              <p className="font-mono text-sm text-zinc-500 mt-1 uppercase tracking-widest">Performance Analysis Module</p>
            </div>
            
            <div className="text-left md:text-right w-full md:w-auto bg-zinc-50 dark:bg-zinc-900/30 md:bg-transparent p-3 md:p-0 rounded-sm border md:border-none border-zinc-200 dark:border-zinc-800">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Overall Grade</div>
              <div className={`text-2xl md:text-3xl font-black font-mono ${grade.color} tracking-tighter`}>{grade.label}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Radial Score Chart */}
            <div className="flex flex-col items-center justify-center relative py-4">
              <div className="relative w-56 h-56 md:w-64 md:h-64">
                <svg className="w-full h-full -rotate-90 transform">
                  {/* Background Circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius} // Use percent based or fit to container in improved version, but fixed here for simplicity
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-zinc-100 dark:text-zinc-900"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="butt"
                    className="text-emerald-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl md:text-6xl font-black font-mono text-zinc-900 dark:text-white tracking-tighter">
                    {animateScore}%
                  </span>
                  <span className="text-xs font-mono text-zinc-500 uppercase mt-2">System Score</span>
                </div>
              </div>
            </div>

            {/* Detailed Stats Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              
              {/* Correct */}
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-5 md:p-6 border-l-4 border-emerald-500 rounded-r-sm">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-mono text-zinc-500 uppercase">Correct</span>
                </div>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {result.correctAnswers} <span className="text-base font-normal text-zinc-400">/ {result.totalQuestions}</span>
                </div>
              </div>

              {/* Wrong */}
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-5 md:p-6 border-l-4 border-red-500 rounded-r-sm">
                <div className="flex items-center gap-3 mb-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-xs font-mono text-zinc-500 uppercase">Incorrect</span>
                </div>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {result.wrongAnswers}
                </div>
              </div>

              {/* Unattempted */}
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-5 md:p-6 border-l-4 border-zinc-400 rounded-r-sm">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-zinc-400" />
                  <span className="text-xs font-mono text-zinc-500 uppercase">Unattempted</span>
                </div>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {result.unattempted}
                </div>
              </div>

              {/* Accuracy & Time */}
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-5 md:p-6 border-l-4 border-fuchsia-500 rounded-r-sm">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-fuchsia-500" />
                      <span className="text-xs font-mono text-zinc-500 uppercase">Accuracy</span>
                    </div>
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">{Math.round(result.accuracy)}%</div>
                  </div>
                  <div className="text-right">
                     <div className="flex items-center justify-end gap-2 mb-2">
                      <Clock className="w-4 h-4 text-fuchsia-500" />
                      <span className="text-xs font-mono text-zinc-500 uppercase">Time</span>
                    </div>
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {Math.floor(result.timeTaken / 60)}<span className="text-sm">m</span> {result.timeTaken % 60}<span className="text-sm">s</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col-reverse md:flex-row gap-4 justify-between">
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 md:py-2 text-xs font-mono border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors rounded-sm">
                <Share2 className="w-4 h-4" /> <span className="md:hidden lg:inline">SHARE_RESULT</span>
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 md:py-2 text-xs font-mono border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors rounded-sm">
                <Download className="w-4 h-4" /> <span className="md:hidden lg:inline">EXPORT_PDF</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <button 
                onClick={onRetry}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-mono text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all rounded-sm"
              >
                <RotateCcw className="w-4 h-4" /> RETRY_MISSION
              </button>
              <button 
                onClick={onHome}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white dark:text-black font-mono text-sm font-bold hover:bg-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/25 rounded-sm"
              >
                <LayoutDashboard className="w-4 h-4" /> DASHBOARD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};