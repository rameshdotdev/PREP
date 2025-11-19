import React, { useState, useEffect } from 'react';
import { Clock, Flag, CheckCircle, ChevronRight, ChevronLeft, XOctagon, Sun, Moon } from 'lucide-react';

interface TestRunnerProps {
  onExit: () => void;
  isDark?: boolean;
  toggleTheme?: () => void;
}

const MOCK_QUESTIONS = [
  { 
    id: 'q1', 
    text: 'GENERAL KNOWLEDGE: Which Article of the Indian Constitution deals with the "Abolition of Untouchability"?', 
    options: ['Article 16', 'Article 17', 'Article 18', 'Article 23'], 
    correct: 1 
  },
  { 
    id: 'q2', 
    text: 'QUANTITATIVE APTITUDE: If x + 1/x = 2, then find the value of x^100 + 1/x^100.', 
    options: ['0', '1', '2', '100'], 
    correct: 2 
  },
  { 
    id: 'q3', 
    text: 'GENERAL SCIENCE: Which cell organelle is known as the "Powerhouse of the Cell"?', 
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Lysosome'], 
    correct: 2 
  },
  { 
    id: 'q4', 
    text: 'CURRENT AFFAIRS: Who is the current Chief of Defence Staff (CDS) of India?', 
    options: ['Gen. Anil Chauhan', 'Gen. Bipin Rawat', 'Gen. MM Naravane', 'Adm. R Hari Kumar'], 
    correct: 0 
  },
  { 
    id: 'q5', 
    text: 'REASONING: Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?', 
    options: ['(1/3)', '(1/8)', '(2/8)', '(1/16)'], 
    correct: 1 
  },
];

export const TestRunner: React.FC<TestRunnerProps> = ({ onExit, isDark, toggleTheme }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: number}>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes for a real mock feel
  const [flagged, setFlagged] = useState<string[]>([]);

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isCriticalTime = timeLeft < 300; // Less than 5 mins

  const handleOptionSelect = (optIndex: number) => {
    setSelectedOptions(prev => ({...prev, [MOCK_QUESTIONS[currentQIndex].id]: optIndex}));
  };

  const toggleFlag = () => {
    const qId = MOCK_QUESTIONS[currentQIndex].id;
    setFlagged(prev => prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-800 dark:text-zinc-300 flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Green Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* Header / Status Bar */}
      <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur flex items-center justify-between px-6 z-20 relative transition-colors duration-300">
        <div className="flex items-center gap-4">
          <div className="font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-widest">MOCK_TEST: <span className="text-emerald-600 dark:text-emerald-500">GEN_AWARENESS_01</span></div>
        </div>
        
        <div className={`
          flex items-center gap-3 font-mono text-xl font-bold px-4 py-1 rounded-sm border transition-colors duration-300
          ${isCriticalTime 
            ? 'text-red-600 dark:text-red-500 border-red-500/50 bg-red-50 dark:bg-red-950/20 animate-pulse' 
            : 'text-emerald-600 dark:text-emerald-500 border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/20'}
        `}>
          <Clock className="w-5 h-5" />
          {formatTime(timeLeft)}
        </div>

        <div className="flex items-center gap-4">
           {toggleTheme && (
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
           )}
          <button 
            onClick={onExit}
            className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-red-600 dark:hover:text-red-500 transition-colors uppercase tracking-wider"
          >
            <XOctagon className="w-4 h-4" />
            Abort Exam
          </button>
        </div>
      </header>

      {/* Main Interface */}
      <main className="flex-1 flex z-20 relative">
        
        {/* Question Sidebar */}
        <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-4 hidden lg:block transition-colors duration-300">
          <h3 className="font-mono text-xs text-zinc-500 mb-4 tracking-widest uppercase">Question Palette</h3>
          <div className="grid grid-cols-4 gap-2">
            {MOCK_QUESTIONS.map((q, idx) => {
              const isAnswered = selectedOptions[q.id] !== undefined;
              const isFlagged = flagged.includes(q.id);
              const isCurrent = idx === currentQIndex;
              
              let bgClass = 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500';
              if (isCurrent) bgClass = 'ring-1 ring-emerald-500 text-emerald-600 dark:text-emerald-500 bg-zinc-50 dark:bg-zinc-900';
              else if (isFlagged) bgClass = 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-600 text-yellow-600 dark:text-yellow-500';
              else if (isAnswered) bgClass = 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-600 text-emerald-600 dark:text-emerald-500';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`
                    h-10 w-10 rounded-sm border flex items-center justify-center font-mono text-sm transition-all
                    ${bgClass}
                  `}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <div className="w-3 h-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-600"></div> Answered
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <div className="w-3 h-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-600"></div> Mark for Review
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <div className="w-3 h-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"></div> Not Visited
            </div>
          </div>
        </aside>

        {/* Question Area */}
        <section className="flex-1 p-6 lg:p-12 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            
            {/* Question Card */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm p-1 shadow-lg dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-colors duration-300">
               {/* Card Header Strip */}
               <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-transparent mb-6"></div>
               
               <div className="px-6 pb-8">
                 <div className="flex justify-between items-start mb-6">
                   <span className="font-mono text-emerald-600 dark:text-emerald-500 text-sm tracking-widest">Q_ID: {MOCK_QUESTIONS[currentQIndex].id.toUpperCase()}</span>
                   <button 
                      onClick={toggleFlag}
                      className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider border px-3 py-1 rounded-sm transition-all
                        ${flagged.includes(MOCK_QUESTIONS[currentQIndex].id) 
                          ? 'border-yellow-500 text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' 
                          : 'border-zinc-300 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400 dark:hover:border-zinc-600'}
                      `}
                   >
                     <Flag className="w-3 h-3" />
                     {flagged.includes(MOCK_QUESTIONS[currentQIndex].id) ? 'Marked for Review' : 'Mark for Review'}
                   </button>
                 </div>

                 <h2 className="text-xl lg:text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-8 leading-relaxed transition-colors duration-300">
                   {MOCK_QUESTIONS[currentQIndex].text}
                 </h2>

                 <div className="space-y-4">
                   {MOCK_QUESTIONS[currentQIndex].options.map((option, idx) => {
                     const isSelected = selectedOptions[MOCK_QUESTIONS[currentQIndex].id] === idx;
                     return (
                       <div 
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        className={`
                          relative p-4 border rounded-sm cursor-pointer transition-all group
                          ${isSelected 
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 shadow-md dark:shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
                            : 'bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'}
                        `}
                       >
                         <div className="flex items-center gap-4">
                           <div className={`
                             w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                             ${isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-400 dark:border-zinc-600 group-hover:border-zinc-600 dark:group-hover:border-zinc-400'}
                           `}>
                             {isSelected && <div className="w-2 h-2 bg-white dark:bg-black rounded-full"></div>}
                           </div>
                           <span className={`font-sans text-sm ${isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>{option}</span>
                         </div>
                         {/* Decorative corner for selected */}
                         {isSelected && (
                           <div className="absolute top-0 right-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-transparent border-r-emerald-500"></div>
                         )}
                       </div>
                     );
                   })}
                 </div>
               </div>
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 flex justify-between items-center">
              <button 
                onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
                disabled={currentQIndex === 0}
                className="flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-xs hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> PREVIOUS
              </button>

              {currentQIndex === MOCK_QUESTIONS.length - 1 ? (
                 <button className="flex items-center gap-2 px-8 py-3 bg-emerald-600 dark:bg-emerald-600 text-white dark:text-black font-mono font-bold text-xs hover:bg-emerald-500 transition-colors shadow-lg dark:shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                 <CheckCircle className="w-4 h-4" /> SUBMIT_TEST
               </button>
              ) : (
                <button 
                  onClick={() => setCurrentQIndex(Math.min(MOCK_QUESTIONS.length - 1, currentQIndex + 1))}
                  className="flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-xs hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-500 transition-all"
                >
                  NEXT <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};