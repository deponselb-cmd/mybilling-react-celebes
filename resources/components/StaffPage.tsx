import { UserCheck, Shield, Mail, Key } from 'lucide-react';

export default function StaffPage() {
  const staff = [
    { name: 'Admin Utama', role: 'Super Admin', email: 'admin@celebes.id', status: 'Active' },
    { name: 'Teknisi Lapangan', role: 'Technician', email: 'field@celebes.id', status: 'Active' },
    { name: 'Support CS', role: 'Support', email: 'cs@celebes.id', status: 'Offline' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-brand-text uppercase tracking-tighter">Staff Management</h2>
        <button className="bg-brand-primary hover:scale-[1.02] active:scale-95 text-white px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-brand-primary/30">Invite Staff</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((s, i) => (
          <div key={i} className="glass-card glass-card-hover p-6 rounded-3xl relative overflow-hidden group border border-brand-border">
            <div className={`absolute top-0 right-0 w-24 h-24 ${s.status === 'Active' ? 'bg-emerald-500/10' : 'bg-brand-text-muted/10'} rounded-bl-full transition-all group-hover:scale-110`} />
            <div className="flex items-center gap-4 mb-6 relative">
              <div className="w-14 h-14 bg-brand-surface border border-brand-border rounded-2xl flex items-center justify-center font-black text-brand-primary text-xl shadow-inner group-hover:scale-110 transition-transform">
                {s.name[0]}
              </div>
              <div>
                <h4 className="text-base font-black text-brand-text uppercase tracking-tight">{s.name}</h4>
                <p className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest leading-none mt-1">{s.role}</p>
              </div>
            </div>
            <div className="space-y-4 relative">
              <div className="flex items-center gap-3 text-xs text-brand-text-muted font-bold">
                <div className="p-1.5 bg-brand-surface border border-brand-border rounded-lg">
                  <Mail size={14} className="text-brand-primary" />
                </div>
                {s.email}
              </div>
              <div className="flex items-center gap-3 text-xs text-brand-text-muted font-bold">
                <div className="p-1.5 bg-brand-surface border border-brand-border rounded-lg">
                  <Shield size={14} className="text-brand-primary" />
                </div>
                Access Level: <span className="text-brand-text">Full</span>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-brand-border pt-5 relative">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${s.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-brand-text-muted'}`} />
                <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest">{s.status}</span>
              </div>
              <button className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all">Permissions</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
