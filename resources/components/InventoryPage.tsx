import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { InventoryItem } from '../types';
import { Package, Plus, Trash2, Edit2, Search, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'inventory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InventoryItem));
      setItems(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredItems = items.filter(i => 
    i.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-text">Inventory Control</h2>
          <p className="text-xs text-brand-text-muted mt-1 font-bold">Manage network gear and consumer hardware</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center gap-2 bg-brand-surface border border-brand-border text-brand-text-muted px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:text-brand-text hover:border-brand-text transition-all active:scale-95">
            <ShoppingCart size={16} />
            POS Mode
          </button>
          <button className="flex items-center justify-center gap-2 bg-brand-primary hover:scale-[1.02] active:scale-95 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/20">
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted" size={16} />
        <input 
          type="text" 
          placeholder="Search inventory by name or SKU..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-brand-surface border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-text outline-none focus:border-brand-primary transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="glass-card glass-card-hover p-6 rounded-2xl group border border-brand-border/10">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-brand-primary/10 rounded-xl border border-brand-primary/10 shadow-inner group-hover:scale-110 transition-transform">
                <Package className="text-brand-primary" size={24} />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                <button className="p-1.5 bg-brand-surface hover:bg-brand-primary border border-brand-border rounded-lg text-[10px] font-black uppercase tracking-widest text-brand-text hover:text-white transition-all">Edit</button>
                <button className="p-1.5 bg-brand-surface hover:bg-red-500 border border-brand-border rounded-lg text-[10px] font-black uppercase tracking-widest text-brand-text hover:text-white transition-all">Del</button>
              </div>
            </div>
            <h4 className="text-sm font-black text-brand-text uppercase tracking-tight mb-1 group-hover:text-brand-primary transition-colors">{item.itemName}</h4>
            <p className="text-[10px] text-brand-text-muted font-black tracking-widest mb-6 font-mono">{item.sku}</p>
            
            <div className="flex justify-between items-end border-t border-brand-border/50 pt-4">
              <div>
                <p className="text-[9px] uppercase text-brand-text-muted font-black tracking-widest mb-1 leading-none">In Stock</p>
                <p className={`text-lg font-black tracking-tighter ${item.quantity <= 5 ? 'text-red-500' : 'text-emerald-500'}`}>
                  {item.quantity} <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Units</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase text-brand-text-muted font-black tracking-widest mb-1 leading-none">Unit Price</p>
                <p className="text-sm font-black text-brand-text">{formatCurrency(item.unitPrice)}</p>
              </div>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && !loading && (
          <div className="col-span-full py-24 text-center glass-card border-2 border-dashed border-brand-border rounded-3xl mt-4">
            <div className="w-20 h-20 bg-brand-surface border border-brand-border rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Package className="text-brand-text-muted opacity-30" size={40} />
            </div>
            <p className="text-brand-text-muted text-sm font-black uppercase tracking-widest">Store Inventory Empty</p>
            <p className="text-brand-text-muted text-[10px] font-bold uppercase tracking-widest mt-2 opacity-60">Ready to populate new stocks</p>
          </div>
        )}
      </div>
    </div>
  );
}
