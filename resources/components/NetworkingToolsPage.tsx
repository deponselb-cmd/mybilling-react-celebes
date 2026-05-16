import React, { useState } from 'react';
import { Terminal, Activity, Zap, Cpu, Search, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function NetworkingToolsPage() {
  const [activeTool, setActiveTool] = useState('ping');
  const [target, setTarget] = useState('8.8.8.8');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTool = () => {
    setIsRunning(true);
    setOutput([`Starting ${activeTool.toUpperCase()} to ${target}...`]);
    
    // Simulate output
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setOutput(prev => [...prev, `${activeTool.toUpperCase()} seq=${count} - 64 bytes from ${target}: time=${(Math.random() * 50).toFixed(2)}ms`]);
      if (count >= 5) {
        clearInterval(interval);
        setIsRunning(false);
        setOutput(prev => [...prev, `${activeTool.toUpperCase()} completed.`]);
      }
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          {['ping', 'traceroute', 'bandwidth', 'latency'].map(tool => (
            <button
              key={tool}
              onClick={() => setActiveTool(tool)}
              className={`w-full text-left px-5 py-3 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95 ${
                activeTool === tool 
                ? 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary shadow-brand-primary/5' 
                : 'bg-brand-surface border-brand-border text-brand-text-muted hover:text-brand-text'
              }`}
            >
              {tool}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="glass-card p-6 rounded-2xl shadow-sm border border-brand-border/10">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted" size={16} />
                <input 
                  type="text" 
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="Target IP or Domain..."
                  className="w-full bg-brand-bg border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-text outline-none focus:border-brand-primary font-mono"
                />
              </div>
              <button 
                onClick={runTool}
                disabled={isRunning}
                className="bg-brand-primary hover:scale-[1.02] active:scale-95 text-white px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 shadow-lg shadow-brand-primary/20"
              >
                Execute
              </button>
            </div>

            <div className="mt-6 bg-[#0a0f1d] rounded-xl p-5 font-mono text-xs text-brand-primary h-64 overflow-y-auto border border-brand-border/20 shadow-inner custom-scrollbar">
              {output.length === 0 ? <span className="opacity-50 italic">{'> Ready for command...'}</span> : output.map((line, i) => (
                <p key={i} className="mb-1.5 leading-relaxed tracking-tight">{line}</p>
              ))}
              {isRunning && <span className="animate-pulse bg-brand-primary/50 px-1 inline-block h-3 w-1.5 ml-1" />}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-xl border border-brand-border">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={14} className="text-emerald-500" />
                <p className="text-[8px] font-black uppercase text-brand-text-muted tracking-widest">Packet Loss</p>
              </div>
              <p className="text-xl font-black text-brand-text tracking-tighter">0.0%</p>
            </div>
            <div className="glass-card p-4 rounded-xl border border-brand-border">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className="text-brand-primary" />
                <p className="text-[8px] font-black uppercase text-brand-text-muted tracking-widest">Avg Jitter</p>
              </div>
              <p className="text-xl font-black text-brand-text tracking-tighter">2.4ms</p>
            </div>
            <div className="glass-card p-4 rounded-xl border border-brand-border">
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={14} className="text-brand-primary" />
                <p className="text-[8px] font-black uppercase text-brand-text-muted tracking-widest">Core Latency</p>
              </div>
              <p className="text-xl font-black text-brand-text tracking-tighter">12ms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
