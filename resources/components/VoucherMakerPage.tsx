import React, { useState } from 'react';
import { Ticket, Printer, Download, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function VoucherMakerPage() {
  const [vouchers, setVouchers] = useState([
    { id: '1', code: 'A9B8-C7D6', plan: '10 Mbps', duration: '24 Hours', price: 5000, status: 'unused' },
    { id: '2', code: 'X1Y2-Z3W4', plan: '20 Mbps', duration: '7 Days', price: 25000, status: 'active' },
    { id: '3', code: 'M5N6-O7P8', plan: 'Standard', duration: '30 Days', price: 150000, status: 'expired' },
  ]);

  const generateVoucher = () => {
    const newVoucher = {
      id: Math.random().toString(36).substr(2, 9),
      code: Math.random().toString(36).substr(2, 4).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase(),
      plan: 'Speedy 20',
      duration: '24 Hours',
      price: 15000,
      status: 'unused',
    };
    setVouchers([newVoucher, ...vouchers]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-text">Voucher Maker</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-surface border border-brand-border text-brand-text-muted rounded-xl text-xs font-black uppercase tracking-widest hover:text-brand-primary transition-all">
            <Download size={14} /> Batch Export
          </button>
          <button onClick={generateVoucher} className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:scale-[1.02] active:scale-95 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/20">
            <Plus size={14} /> Create Voucher
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vouchers.map(v => (
          <div key={v.id} className="glass-card glass-card-hover p-5 rounded-2xl relative overflow-hidden group shadow-sm border border-brand-border">
            <div className={`absolute top-0 right-0 w-24 h-24 ${v.status === 'unused' ? 'bg-emerald-500/10' : v.status === 'active' ? 'bg-brand-primary/10' : 'bg-red-500/10'} rounded-bl-full transition-all group-hover:scale-110`} />
            
            <div className="flex justify-between items-start mb-6 relative">
              <div className="p-3 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
                <Ticket className="text-brand-primary" size={24} />
              </div>
              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border tracking-widest shadow-sm ${
                v.status === 'unused' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]' :
                v.status === 'active' ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20 shadow-[0_0_12px_rgba(99,102,241,0.15)]' :
                'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.15)]'
              }`}>
                {v.status}
              </span>
            </div>

            <h3 className="text-lg font-mono font-black text-brand-text mb-1 tracking-widest">{v.code}</h3>
            <p className="text-xs text-brand-text-muted mb-4 font-bold uppercase tracking-tight">{v.plan} • {v.duration}</p>

            <div className="flex justify-between items-center border-t border-brand-border pt-4">
              <p className="font-black text-brand-primary tracking-tight">{formatCurrency(v.price)}</p>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-brand-primary/10 rounded-lg text-brand-text-muted hover:text-brand-primary transition-all">
                  <Printer size={14} />
                </button>
                <button className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors scale-100 hover:scale-110">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
