import React, { useState, useEffect, useRef } from 'react';
import { TerminalLog } from '../types';
import { executeTerminalCommand } from '../services/geminiService';
import { Send, Cpu } from 'lucide-react';

export const TerminalWidget: React.FC = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<TerminalLog[]>([
    { type: 'system', content: 'INITIALIZING REVOLT KERNEL...', timestamp: new Date().toLocaleTimeString() },
    { type: 'system', content: 'CONNECTION ESTABLISHED. AWAITING INPUT.', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input;
    setInput('');
    
    // Add User Input Log
    setLogs(prev => [...prev, { type: 'input', content: cmd, timestamp: new Date().toLocaleTimeString() }]);
    
    setLoading(true);
    // Call AI
    const response = await executeTerminalCommand(cmd);
    setLoading(false);

    // Add System Response Log
    setLogs(prev => [...prev, { type: 'output', content: response, timestamp: new Date().toLocaleTimeString() }]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-sm overflow-hidden shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 text-left">
      {/* Terminal Header */}
      <div className="h-8 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-800 flex items-center px-3 justify-between transition-colors duration-300">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500"></div>
        </div>
        <div className="text-[10px] font-mono text-zinc-500 tracking-widest">ROOT@REVOLT:~</div>
        <Cpu className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />
      </div>

      {/* Terminal Body */}
      <div className="h-64 p-4 overflow-y-auto font-mono text-xs sm:text-sm space-y-2 scrollbar-thin bg-zinc-50/50 dark:bg-black/50 transition-colors duration-300">
        {logs.map((log, idx) => (
          <div key={idx} className={`flex gap-2 ${log.type === 'input' ? 'text-fuchsia-600 dark:text-fuchsia-500' : log.type === 'system' ? 'text-zinc-400 dark:text-zinc-500' : 'text-emerald-600 dark:text-emerald-500'}`}>
            <span className="opacity-50 shrink-0">[{log.timestamp}]</span>
            <span>{log.type === 'input' ? '>' : '#'}</span>
            <span className={log.type === 'output' ? 'animate-pulse-fast' : ''}>{log.content}</span>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 text-emerald-600 dark:text-emerald-500">
            <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
            <span>#</span>
            <span className="animate-pulse">PROCESSING_DATA_PACKET...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleCommand} className="border-t border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-black p-2 flex items-center gap-2 transition-colors duration-300">
        <span className="text-emerald-600 dark:text-emerald-500 font-mono pl-2">{'>'}</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-zinc-800 dark:text-zinc-300 font-mono text-sm placeholder-zinc-400 dark:placeholder-zinc-700"
          placeholder="./execute_command.sh"
          autoFocus
        />
        <button type="submit" className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded text-zinc-400 dark:text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};