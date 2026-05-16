import { Sliders, Bell, Globe, Lock, Cpu, Database } from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    { title: 'General Service', icon: Globe, desc: 'Name, domain, support email' },
    { title: 'Cloud Infrastructure', icon: Cpu, desc: 'API keys, Server region, Scaling' },
    { title: 'Data & Backup', icon: Database, desc: 'Export datasets, Auto-backup frequency' },
    { title: 'Notifications', icon: Bell, desc: 'WhatsApp bot, Email triggers, SMS gateway' },
    { title: 'Security', icon: Lock, desc: 'Two-factor auth, Session timeout, IP Whitelist' },
    { title: 'Custom Flows', icon: Sliders, desc: 'Onboarding steps, Prorate logic' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s, i) => (
          <button key={i} className="flex items-center gap-6 p-6 glass-card glass-card-hover rounded-2xl border border-brand-border/10 transition-all text-left group shadow-sm">
            <div className="p-4 bg-brand-surface border border-brand-border rounded-2xl group-hover:scale-110 group-hover:border-brand-primary/50 transition-all shadow-inner">
              <s.icon size={24} className="text-brand-primary" />
            </div>
            <div>
              <h4 className="text-sm font-black text-brand-text uppercase tracking-tight mb-1 transition-colors group-hover:text-brand-primary">{s.title}</h4>
              <p className="text-xs text-brand-text-muted font-bold">{s.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="glass-card p-8 rounded-3xl border border-brand-border shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest text-brand-text-muted mb-8 text-center opacity-70">System Health Monitor</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'API Latency', value: '42ms', color: 'emerald-500' },
            { label: 'DB Connections', value: '12 Active', color: 'brand-primary' },
            { label: 'Gateway Sync', value: 'Synced', color: 'cyan-500' },
            { label: 'Core Version', value: 'v2.4.1', color: 'brand-text-muted' },
          ].map((stat, i) => (
            <div key={i} className="text-center relative">
              {i < 3 && <div className="hidden md:block absolute top-1/2 right-0 w-px h-8 bg-brand-border/50 -translate-y-1/2" />}
              <p className="text-[9px] text-brand-text-muted font-black uppercase mb-2 tracking-widest leading-none">{stat.label}</p>
              <p className={`text-sm font-black text-brand-text uppercase tracking-tighter ${stat.color.startsWith('brand') ? `text-${stat.color}` : `text-${stat.color}`} transition-colors`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
