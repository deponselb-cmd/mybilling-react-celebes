import React, { useState } from 'react';
import { CreditCard, Wallet, Landmark, ShieldCheck, ExternalLink, Settings, Plus } from 'lucide-react';

export default function PaymentGatewayPage() {
  const [gateways] = useState([
    { name: 'Midtrans', status: 'Active', methodCount: 12, uptime: '99.98%', logo: 'https://files.readme.io/9796075-midtrans-logo.png' },
    { name: 'Xendit', status: 'Active', methodCount: 8, uptime: '99.95%', logo: 'https://docs.xendit.co/img/xendit-logo.png' },
    { name: 'Stripe', status: 'Draft', methodCount: 0, uptime: 'N/A', logo: 'https://images.ctfassets.net/7thn88o1a7p1/779836511679051/e00a200778c85f7ea1228227b61f9d0c/stripe-logo.png' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-text">Payment Systems</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:scale-[1.02] active:scale-95 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/20">
          <Plus size={14} /> Add Provider
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gateways.map(g => (
          <div key={g.name} className="glass-card glass-card-hover p-6 rounded-2xl relative group shadow-sm border border-brand-border/10">
            <div className="flex justify-between items-start mb-8">
              <div className="h-8 grayscale group-hover:grayscale-0 transition-all">
                <img src={g.logo} alt={g.name} className="h-full object-contain" />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm ${
                g.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]' : 'bg-brand-surface text-brand-text-muted border-brand-border'
              }`}>
                {g.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest leading-none">
                <span className="text-brand-text-muted">Active Methods</span>
                <span className="text-brand-text">{g.methodCount} Channels</span>
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest leading-none border-t border-brand-border/50 pt-3">
                <span className="text-brand-text-muted">Service Uptime</span>
                <span className="text-emerald-500 shadow-sm">{g.uptime}</span>
              </div>
            </div>

            <div className="mt-8 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand-primary/5 border border-brand-primary/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm active:scale-95">
                <Settings size={14} /> Configure
              </button>
              <button className="p-2.5 bg-brand-surface border border-brand-border rounded-xl text-brand-text-muted hover:text-brand-primary transition-all active:scale-95">
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 rounded-3xl shadow-sm border border-brand-border">
        <h3 className="text-sm font-black uppercase tracking-tight text-brand-text mb-8 flex items-center gap-3">
          <ShieldCheck size={24} className="text-emerald-500" />
          Security Compliance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-14 h-14 bg-brand-surface border border-brand-border rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:border-brand-primary/50 transition-all shadow-inner">
              <CreditCard size={24} className="text-brand-primary" />
            </div>
            <p className="text-[10px] uppercase font-black text-brand-text-muted mb-1 tracking-widest">PCI-DSS</p>
            <p className="text-xs font-black text-brand-text uppercase tracking-tight">Level 1 Certified</p>
          </div>
          <div className="text-center group">
            <div className="w-14 h-14 bg-brand-surface border border-brand-border rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:border-brand-primary/50 transition-all shadow-inner">
              <Landmark size={24} className="text-brand-primary" />
            </div>
            <p className="text-[10px] uppercase font-black text-brand-text-muted mb-1 tracking-widest">BI Licensed</p>
            <p className="text-xs font-black text-brand-text uppercase tracking-tight">PJP Category 1</p>
          </div>
          <div className="text-center group">
            <div className="w-14 h-14 bg-brand-surface border border-brand-border rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:border-brand-primary/50 transition-all shadow-inner">
              <Wallet size={24} className="text-brand-primary" />
            </div>
            <p className="text-[10px] uppercase font-black text-brand-text-muted mb-1 tracking-widest">Encryption</p>
            <p className="text-xs font-black text-brand-text uppercase tracking-tight">AES-256 Bit GCM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
