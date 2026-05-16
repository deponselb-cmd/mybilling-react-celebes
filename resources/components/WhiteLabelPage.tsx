import React, { useState } from 'react';
import { Palette, Globe, Image as ImageIcon, CheckCircle2, Save } from 'lucide-react';

export default function WhiteLabelPage() {
  const [config, setConfig] = useState({
    companyName: 'Celebes Synergi',
    primaryColor: '#6366f1',
    portalDomain: 'portal.synergi.id',
    footerText: 'Powered by Celebes Synergi',
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-text">White Label Branding</h2>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:scale-[1.02] active:scale-95 text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/20">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl shadow-sm space-y-6 border border-brand-border">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="text-brand-primary" size={20} />
            <h3 className="text-sm font-black uppercase tracking-tight text-brand-text">Visual Identity</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-black text-brand-text-muted tracking-widest mb-1.5 block">Company Name</label>
              <input 
                type="text" 
                value={config.companyName}
                onChange={(e) => setConfig({...config, companyName: e.target.value})}
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-primary text-brand-text"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-black text-brand-text-muted tracking-widest mb-1.5 block">Primary Brand Color</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  value={config.primaryColor}
                  onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                  className="w-12 h-10 rounded-lg border border-brand-border bg-brand-surface cursor-pointer"
                />
                <input 
                  type="text" 
                  value={config.primaryColor}
                  onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                  className="flex-1 bg-brand-surface border border-brand-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-primary text-brand-text font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl shadow-sm space-y-6 border border-brand-border">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="text-brand-primary" size={20} />
            <h3 className="text-sm font-black uppercase tracking-tight text-brand-text">Customer Portal</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-black text-brand-text-muted tracking-widest mb-1.5 block">Domain Name</label>
              <input 
                type="text" 
                value={config.portalDomain}
                onChange={(e) => setConfig({...config, portalDomain: e.target.value})}
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-primary transition-all text-brand-text"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-black text-brand-text-muted tracking-widest mb-1.5 block">Portal Footer</label>
              <input 
                type="text" 
                value={config.footerText}
                onChange={(e) => setConfig({...config, footerText: e.target.value})}
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-primary transition-all text-brand-text"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl shadow-sm border border-brand-border">
        <h3 className="text-sm font-black uppercase tracking-tight text-brand-text mb-6">Logo Upload</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="border-2 border-dashed border-brand-border rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all cursor-pointer group shadow-inner">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
              <ImageIcon size={24} />
            </div>
            <p className="text-[10px] font-black uppercase text-brand-text-muted tracking-widest">Dark Mode Logo</p>
          </div>
          <div className="border-2 border-dashed border-brand-border rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all cursor-pointer group shadow-inner">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
              <ImageIcon size={24} />
            </div>
            <p className="text-[10px] font-black uppercase text-brand-text-muted tracking-widest">Light Mode Logo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
