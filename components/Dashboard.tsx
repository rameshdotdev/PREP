import React, { useState } from 'react';
import { User, ExamCard, RecommendedItem } from '../types';
import { 
  LayoutDashboard, 
  Target, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Plus, 
  Check, 
  Play, 
  Clock, 
  TrendingUp,
  Zap,
  BrainCircuit
} from 'lucide-react';

// Mock Data for Available Exams to Add
const AVAILABLE_EXAMS: ExamCard[] = [
  { id: '1', title: 'UPSC CSE', code: 'IAS-25', difficulty: 'CRITICAL', participants: 54205, status: 'ACTIVE' },
  { id: '2', title: 'SSC CGL', code: 'CGL-01', difficulty: 'HIGH', participants: 88540, status: 'ACTIVE' },
  { id: '3', title: 'JEE MAINS', code: 'ENG-09', difficulty: 'HIGH', participants: 12400, status: 'ACTIVE' },
  { id: '4', title: 'NEET UG', code: 'MED-77', difficulty: 'MED', participants: 32100, status: 'ACTIVE' },
  { id: '5', title: 'SBI PO', code: 'BNK-42', difficulty: 'HIGH', participants: 15200, status: 'ACTIVE' },
  { id: '7', title: 'GATE CS', code: 'GTE-99', difficulty: 'CRITICAL', participants: 14205, status: 'ACTIVE' },
];

// Mock Data for Recommendations linked to Exam IDs
const RECOMMENDATIONS: RecommendedItem[] = [
  { id: 'r1', title: 'Polity: Preamble & Rights', type: 'PYQ', examId: '1', difficulty: 'MED', time: '15 MIN' },
  { id: 'r2', title: 'CSAT Logic Drill 2024', type: 'DRILL', examId: '1', difficulty: 'HIGH', time: '10 MIN' },
  { id: 'r3', title: 'Modern History Mock V2', type: 'MOCK', examId: '1', difficulty: 'HIGH', time: '120 MIN' },
  { id: 'r4', title: 'Quantitative Aptitude Tier 1', type: 'PYQ', examId: '2', difficulty: 'MED', time: '60 MIN' },
  { id: 'r5', title: 'English Comprehension Set A', type: 'MOCK', examId: '2', difficulty: 'LOW', time: '45 MIN' },
  { id: 'r6', title: 'Rotational Mechanics PYQ', type: 'PYQ', examId: '3', difficulty: 'CRITICAL', time: '30 MIN' },
  { id: 'r7', title: 'Calculus Limits Speed Test', type: 'DRILL', examId: '3', difficulty: 'HIGH', time: '15 MIN' },
  { id: 'r8', title: 'Human Physiology: Digestion', type: 'PYQ', examId: '4', difficulty: 'MED', time: '20 MIN' },
  { id: 'r9', title: 'Data Interpretation (Banking)', type: 'MOCK', examId: '5', difficulty: 'HIGH', time: '40 MIN' },
  { id: 'r10', title: 'Algorithms & Data Structures', type: 'PYQ', examId: '7', difficulty: 'CRITICAL', time: '60 MIN' },
];

interface DashboardProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onStartSimulation: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onUpdateUser, onStartSimulation }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TARGETS' | 'ANALYTICS'>('OVERVIEW');

  const toggleExamSelection = (examId: string) => {
    const currentExams = user.selectedExams || [];
    let newExams;
    if (currentExams.includes(examId)) {
      newExams = currentExams.filter(id => id !== examId);
    } else {
      newExams = [...currentExams, examId];
    }
    onUpdateUser({ ...user, selectedExams: newExams });
  };

  // Filter recommendations based on user's selected exams
  const userRecommendations = RECOMMENDATIONS.filter(item => user.selectedExams.includes(item.examId));

  // If user has no exams selected, force the view to TARGETS to onboard them
  const isConfiguring = user.selectedExams.length === 0 || activeTab === 'TARGETS';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-800 dark:text-zinc-300 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-20 lg:w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between sticky top-16 h-[calc(100vh-4rem)] z-30">
        <div className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('OVERVIEW')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all font-mono text-sm ${activeTab === 'OVERVIEW' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden lg:inline">COMMAND_CENTER</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('TARGETS')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all font-mono text-sm ${activeTab === 'TARGETS' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}`}
          >
            <Target className="w-4 h-4" />
            <span className="hidden lg:inline">TARGET_PROTOCOLS</span>
          </button>

          <button 
            onClick={() => setActiveTab('ANALYTICS')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all font-mono text-sm ${activeTab === 'ANALYTICS' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden lg:inline">PERFORMANCE</span>
          </button>
        </div>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
           <div className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer transition-colors">
             <Settings className="w-4 h-4" />
             <span className="hidden lg:inline font-mono text-sm">SYSTEM_CONFIG</span>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto h-[calc(100vh-4rem)]">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl md:text-3xl font-mono font-bold text-zinc-900 dark:text-white tracking-tight">
              WELCOME_BACK, {user.name.split('_')[0]}
            </h1>
            <p className="text-zinc-500 text-sm font-mono mt-1">
              SYSTEM STATUS: <span className="text-emerald-500">OPTIMAL</span> // PREP STREAK: <span className="text-white bg-zinc-800 px-1 rounded">12 DAYS</span>
            </p>
          </div>
          {!isConfiguring && (
            <button 
              onClick={() => setActiveTab('TARGETS')}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-mono border border-zinc-300 dark:border-zinc-700 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <Plus className="w-3 h-3" />
              ADD_EXAM
            </button>
          )}
        </div>

        {isConfiguring ? (
          /* --- TARGET SELECTION VIEW --- */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 p-6 bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-900 dark:to-black rounded-sm border border-zinc-800 text-white">
              <h2 className="text-xl font-mono font-bold mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-500" />
                CONFIGURE TARGET PROTOCOLS
              </h2>
              <p className="text-zinc-400 text-sm max-w-2xl">
                Select the competitive exams you are preparing for. The system will reconfigure its recommendation engine to provide relevant Previous Year Questions (PYQs) and Mock Simulations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AVAILABLE_EXAMS.map((exam) => {
                const isSelected = user.selectedExams.includes(exam.id);
                return (
                  <div 
                    key={exam.id}
                    onClick={() => toggleExamSelection(exam.id)}
                    className={`
                      relative cursor-pointer group border rounded-sm p-6 transition-all duration-300
                      ${isSelected 
                        ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                        : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'}
                    `}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded-sm ${isSelected ? 'bg-emerald-500 text-white' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500'}`}>
                        {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </div>
                      <span className={`font-mono text-[10px] px-2 py-1 rounded-full border ${isSelected ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500'}`}>
                        {exam.participants.toLocaleString()} ASPIRANTS
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100">{exam.title}</h3>
                    <p className="text-xs font-mono text-zinc-500 mt-1">{exam.code} // {exam.difficulty}</p>

                    {isSelected && (
                      <div className="absolute inset-0 border-2 border-emerald-500 rounded-sm pointer-events-none animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>

            {user.selectedExams.length > 0 && activeTab === 'TARGETS' && (
              <div className="mt-8 flex justify-end">
                 <button 
                   onClick={() => setActiveTab('OVERVIEW')}
                   className="px-8 py-3 bg-emerald-600 text-white dark:text-black font-bold font-mono text-sm hover:bg-emerald-500 transition-colors shadow-lg"
                 >
                   INITIALIZE_DASHBOARD_MODULE
                 </button>
              </div>
            )}
          </div>
        ) : (
          /* --- OVERVIEW VIEW --- */
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 rounded-sm">
                <div className="flex items-center gap-3 text-zinc-500 mb-2 font-mono text-xs">
                  <BrainCircuit className="w-4 h-4" />
                  <span>AVG_ACCURACY</span>
                </div>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">78.4%</div>
                <div className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +2.4% this week
                </div>
              </div>
              
              <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 rounded-sm">
                <div className="flex items-center gap-3 text-zinc-500 mb-2 font-mono text-xs">
                  <Zap className="w-4 h-4" />
                  <span>SPEED_INDEX</span>
                </div>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">42s</div>
                <div className="text-xs text-zinc-500 mt-1">Avg time per question</div>
              </div>

              <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 rounded-sm">
                <div className="flex items-center gap-3 text-zinc-500 mb-2 font-mono text-xs">
                  <Target className="w-4 h-4" />
                  <span>QUESTIONS_SOLVED</span>
                </div>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">1,240</div>
                <div className="text-xs text-emerald-500 mt-1">Top 15% of candidates</div>
              </div>
            </div>

            {/* Recommendations Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                   <BookOpen className="w-4 h-4 text-emerald-500" />
                   RECOMMENDED_MISSIONS
                 </h3>
                 <span className="text-xs font-mono text-zinc-500">BASED ON YOUR TARGETS</span>
              </div>

              {userRecommendations.length === 0 ? (
                <div className="p-8 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-sm text-center">
                  <p className="text-zinc-500 font-mono text-sm">NO DATA PACKETS FOUND. ADJUST TARGET PROTOCOLS.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {userRecommendations.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all group cursor-pointer rounded-sm"
                    >
                       <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-sm flex items-center justify-center border ${item.type === 'PYQ' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400' : item.type === 'MOCK' ? 'bg-fuchsia-50 dark:bg-fuchsia-900/20 border-fuchsia-200 dark:border-fuchsia-800 text-fuchsia-600 dark:text-fuchsia-400' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400'}`}>
                           {item.type === 'PYQ' ? 'PQ' : item.type === 'MOCK' ? 'MK' : 'DR'}
                         </div>
                         <div>
                           <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                             {item.title}
                           </h4>
                           <div className="flex items-center gap-3 mt-1">
                             <span className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-900 rounded text-zinc-500">
                               {AVAILABLE_EXAMS.find(e => e.id === item.examId)?.title}
                             </span>
                             <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                               <Clock className="w-3 h-3" /> {item.time}
                             </span>
                           </div>
                         </div>
                       </div>
                       
                       <button 
                         onClick={onStartSimulation}
                         className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:text-black transition-all"
                       >
                         <Play className="w-4 h-4 fill-current" />
                       </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Recent Activity Log (Visual Filler) */}
            <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black p-4 rounded-sm font-mono text-xs">
              <div className="text-zinc-400 mb-2">SYSTEM_LOG // RECENT_ACTIVITY</div>
              <div className="space-y-1 text-zinc-500 dark:text-zinc-600">
                 <p>> USER_LOGIN [SUCCESS] - {new Date().toLocaleTimeString()}</p>
                 <p>> SYNC_EXAM_DATA... [COMPLETE]</p>
                 <p>> FETCHING NEW PYQS FOR [UPSC_CSE]... FOUND 12 NEW PACKETS</p>
                 <p>> OPTIMIZING STUDY PATH... [DONE]</p>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};