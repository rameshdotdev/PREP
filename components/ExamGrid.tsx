import React from 'react';
import { ExamCard } from '../types';
import { Lock, Activity, Users, FileText, BookOpen, TrendingUp, Award } from 'lucide-react';

const EXAMS: ExamCard[] = [
  { id: '1', title: 'UPSC_CSE_PRELIMS', code: 'IAS-25', difficulty: 'CRITICAL', participants: 54205, status: 'ACTIVE' },
  { id: '2', title: 'SSC_CGL_TIER_1', code: 'CGL-01', difficulty: 'HIGH', participants: 88540, status: 'ACTIVE' },
  { id: '3', title: 'JEE_MAINS_MOCK', code: 'ENG-09', difficulty: 'HIGH', participants: 12400, status: 'ACTIVE' },
  { id: '4', title: 'NEET_UG_BIOLOGY', code: 'MED-77', difficulty: 'MED', participants: 32100, status: 'ACTIVE' },
  { id: '5', title: 'SBI_PO_MAINS', code: 'BNK-42', difficulty: 'HIGH', participants: 15200, status: 'LOCKED' },
  { id: '6', title: 'RRB_NTPC_GK', code: 'RLY-11', difficulty: 'LOW', participants: 42000, status: 'MAINTENANCE' },
  { id: '7', title: 'GATE_CS_2025', code: 'GTE-99', difficulty: 'CRITICAL', participants: 14205, status: 'ACTIVE' },
  { id: '8', title: 'CAT_QUANT_25', code: 'IIM-22', difficulty: 'CRITICAL', participants: 9200, status: 'LOCKED' },
];

interface ExamGridProps {
  onSelect: () => void;
}

export const ExamGrid: React.FC<ExamGridProps> = ({ onSelect }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-24 relative z-10">
      <div className="flex items-end justify-between mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-4 transition-colors duration-300">
        <div>
          <h2 className="text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-widest">ACTIVE_CAMPAIGNS</h2>
          <p className="text-zinc-500 mt-2 text-sm">SELECT_TARGET_EXAM_FOR_SIMULATION</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-500">
          <Activity className="w-4 h-4" />
          <span>SERVER_LOAD: OPTIMAL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {EXAMS.map((exam) => (
          <div 
            key={exam.id}
            onClick={exam.status === 'ACTIVE' ? onSelect : undefined}
            className={`
              relative group bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 
              flex flex-col justify-between h-64
              transition-all duration-300 ease-out
              ${exam.status === 'ACTIVE' 
                ? 'hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 cursor-pointer' 
                : 'opacity-60 cursor-not-allowed grayscale'}
            `}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-zinc-300 dark:border-zinc-700 group-hover:border-emerald-500 transition-colors"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-zinc-300 dark:border-zinc-700 group-hover:border-emerald-500 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-zinc-300 dark:border-zinc-700 group-hover:border-emerald-500 transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-zinc-300 dark:border-zinc-700 group-hover:border-emerald-500 transition-colors"></div>

            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-sm">
                  {exam.title.includes('JEE') || exam.title.includes('GATE') ? <TrendingUp className="w-6 h-6 text-emerald-500" /> :
                   exam.title.includes('UPSC') ? <Award className="w-6 h-6 text-fuchsia-500" /> :
                   <FileText className="w-6 h-6 text-zinc-500" />}
                </div>
                <span className={`
                  text-[10px] font-mono border px-1.5 py-0.5 rounded-sm
                  ${exam.difficulty === 'CRITICAL' ? 'border-fuchsia-500 text-fuchsia-600 dark:text-fuchsia-500' : 
                    exam.difficulty === 'HIGH' ? 'border-amber-500 text-amber-600 dark:text-amber-500' :
                    'border-zinc-300 dark:border-zinc-700 text-zinc-500'}
                `}>
                  {exam.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate" title={exam.title}>
                {exam.title}
              </h3>
              <p className="text-xs font-mono text-zinc-500 mt-1 tracking-wider">CODE: {exam.code}</p>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2 font-mono">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{exam.participants.toLocaleString()}</span>
                </div>
                <span>{exam.status}</span>
              </div>
              
              {/* Fake Progress Bar / Load Bar */}
              <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                <div className={`h-full w-3/4 ${exam.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'} group-hover:animate-pulse`}></div>
              </div>
            </div>

            {/* Lock Overlay if locked */}
            {exam.status !== 'ACTIVE' && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-50/50 dark:bg-black/50 backdrop-blur-[1px]">
                <Lock className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};