import React, { useState } from 'react';
import { Network, Server, HardDrive, RefreshCw, Zap, Cpu, Search, AlertTriangle } from 'lucide-react';

export default function MikroTikPage() {
  const [activeTab, setActiveTab] = useState('interfaces');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center border border-brand-primary/20 shadow-inner">
            <Server className="text-brand-primary" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-brand-text tracking-tight">CCR1036-12G-4S</h2>
            <p className="text-[10px] text-brand-text-muted uppercase font-black tracking-widest">RouterOS v7.1.3 • Up 142 Days</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleSync}
            className="flex items-center gap-2 bg-brand-surface border border-brand-border px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-brand-text-muted hover:text-brand-primary transition-all shadow-sm active:scale-95"
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
            {isSyncing ? 'Syncing...' : 'Fetch Metrics'}
          </button>
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-red-500/20 active:scale-95">
            Terminals
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'CPU Load', value: '12%', icon: Cpu, color: 'brand-primary' },
          { label: 'Memory', value: '4.2GB / 16GB', icon: HardDrive, color: 'sky-500' },
          { label: 'Active PPPoE', value: '2,482', icon: Zap, color: 'amber-500' },
          { label: 'Throughput', value: '8.4 Gbps', icon: Network, color: 'emerald-500' },
        ].map((stat, i) => (
          <div key={i} className="glass-card glass-card-hover p-4 rounded-2xl shadow-sm border border-brand-border">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-1.5 bg-${stat.color.split('-')[0]}-500/10 rounded-lg`}>
                <stat.icon size={14} className={`text-${stat.color}`} />
              </div>
              <p className="text-[10px] font-black uppercase text-brand-text-muted tracking-widest font-mono">{stat.label}</p>
            </div>
            <p className="text-xl font-black text-brand-text uppercase tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden shadow-sm border border-brand-border">
        <div className="border-b border-brand-border flex bg-brand-surface/30">
          {['interfaces', 'ppp-secrets', 'firewall', 'queues'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${
                activeTab === tab ? 'text-brand-primary' : 'text-brand-text-muted hover:text-brand-text'
              }`}
            >
              {tab.replace('-', ' ')}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-primary shadow-[0_-2px_8px_rgba(99,102,241,0.5)]" />}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[9px] uppercase tracking-widest text-brand-text-muted font-black border-b border-brand-border">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3 text-right">Throughput</th>
                  <th className="px-4 py-3 text-right">Packets/s</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="hover:bg-brand-primary/5 transition-colors group">
                    <td className="px-4 py-4 text-xs font-bold text-brand-text">sfp-sfpplus{i+1}</td>
                    <td className="px-4 py-4 text-[10px] text-brand-text-muted font-black uppercase tracking-widest">SFP Video</td>
                    <td className="px-4 py-4 text-right text-xs font-mono font-black text-brand-primary">{(Math.random() * 200).toFixed(1)} Mbps</td>
                    <td className="px-4 py-4 text-right text-xs font-mono font-bold text-brand-text-muted">{(Math.random() * 50).toFixed(1)}k</td>
                    <td className="px-4 py-4 text-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mx-auto shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
