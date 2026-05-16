import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Customer } from '../types';
import L from 'leaflet';
import { Search, Layers, Navigation } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { useTranslation } from '../locales/LanguageContext';

const createCustomIcon = (status: string) => {
  const color = status === 'active' ? '#10b981' : (status === 'isolated' ? '#ef4444' : '#f59e0b');
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background:${color};width:24px;height:24px;border-radius:50%;border:4px solid white;box-shadow:0 0 10px rgba(0,0,0,0.4);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapLocatorPage() {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-2.5489, 118.0149]); // Center of Indonesia
  const [zoom, setZoom] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'customers'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Customer));
      setCustomers(data.filter(c => c.lat && c.lng));
    });
    return () => unsubscribe();
  }, []);

  const handleFocusCustomer = (customer: Customer) => {
    if (customer.lat && customer.lng) {
      setMapCenter([customer.lat, customer.lng]);
      setZoom(15);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder={t('findCustomer')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border rounded-xl pl-10 pr-4 py-2 text-sm text-brand-text outline-none focus:border-indigo-500 transition-colors shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setMapCenter([-2.5489, 118.0149]); setZoom(5); }} className="p-2 bg-brand-surface border border-brand-border rounded-lg text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors shadow-sm">
            <Layers size={18} />
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-500/20">
            <Navigation size={14} />
            {t('recenter')}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
        {/* Sidebar List */}
        <div className="lg:col-span-1 glass-card border border-brand-border/10 rounded-2xl flex flex-col overflow-hidden shadow-sm">
          <div className="p-4 border-b border-brand-border/50 bg-brand-surface/30">
            <h3 className="text-[10px] font-black uppercase text-brand-text-muted tracking-widest leading-none">{t('activeLocations')} ({filteredCustomers.length})</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {filteredCustomers.length === 0 ? (
              <div className="p-8 text-center text-brand-text-muted text-[10px] uppercase font-black tracking-widest opacity-40 italic">
                No geo-tagged customers found.
              </div>
            ) : (
              filteredCustomers.map(c => (
                <button 
                  key={c.id}
                  onClick={() => handleFocusCustomer(c)}
                  className="w-full text-left p-4 rounded-xl hover:bg-brand-primary/5 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                  <p className="text-sm font-black text-brand-text uppercase tracking-tight group-hover:text-brand-primary transition-colors">{c.name}</p>
                  <p className="text-[10px] text-brand-text-muted mt-1 truncate font-bold">{c.address}</p>
                  <div className="flex items-center gap-2 mt-3 overflow-hidden">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
                    <span className="text-[9px] uppercase font-black text-brand-text-muted tracking-widest truncate leading-none">{c.plan}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Map View */}
        <div className="lg:col-span-3 glass-card border border-brand-border rounded-3xl relative overflow-hidden shadow-sm group">
          <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={true} className="z-0">
            <ChangeView center={mapCenter} zoom={zoom} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredCustomers.map(c => (
              <Marker key={c.id} position={[c.lat!, c.lng!]} icon={createCustomIcon(c.status)}>
                <Popup>
                  <div className="min-w-[220px] p-1 font-sans">
                    <h4 className="font-black text-brand-text uppercase tracking-tight mb-1">{c.name}</h4>
                    <p className="text-[10px] text-brand-text-muted mb-3 font-bold">{c.address}</p>
                    <div className="grid grid-cols-2 gap-4 border-t border-brand-border/50 pt-3">
                      <div>
                        <p className="text-[8px] text-brand-text-muted uppercase font-black tracking-widest mb-1">{t('status')}</p>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${c.status === 'active' ? 'text-emerald-500' : 'text-red-500'}`}>{c.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] text-brand-text-muted uppercase font-black tracking-widest mb-1">Amount</p>
                        <p className="text-[10px] font-black text-brand-primary">{formatCurrency(c.invoiceAmount)}</p>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Overlay Badge */}
          <div className="absolute bottom-6 right-6 z-[1000] glass-card border border-brand-border/30 p-5 rounded-3xl backdrop-blur-2xl shadow-2xl transition-all group-hover:scale-110">
            <p className="text-[10px] font-black uppercase text-brand-text-muted mb-3 tracking-widest leading-none">Live Node Status</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />
                <span className="text-[10px] font-black text-brand-text uppercase tracking-widest leading-none">42 Up</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_#ef4444]" />
                <span className="text-[10px] font-black text-brand-text uppercase tracking-widest leading-none">1 Alert</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
