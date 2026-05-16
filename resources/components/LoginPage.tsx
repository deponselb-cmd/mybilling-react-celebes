import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '../locales/LanguageContext';

export default function LoginPage() {
  const { t } = useTranslation();
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-brand-bg text-brand-text overflow-hidden relative theme-midnight">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-10 glass-card rounded-[2.5rem] shadow-2xl z-10 border-brand-primary/10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-brand-surface rounded-[2rem] flex items-center justify-center mb-6 border border-brand-border shadow-xl shadow-brand-primary/5">
            <ShieldCheck className="text-brand-primary" size={40} />
          </div>
          <h1 className="text-4xl font-black text-brand-text mb-2 tracking-tighter uppercase italic">{t('loginTitle')}</h1>
          <p className="text-brand-text-muted text-[10px] font-black uppercase tracking-[0.2em] opacity-60 leading-none">{t('loginSubtitle')}</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-4 bg-brand-primary text-white font-black uppercase tracking-widest py-4 px-6 rounded-2xl transition-all shadow-2xl shadow-brand-primary/40 border border-brand-primary/50 hover:scale-[1.03] active:scale-95"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 invert dark:invert-0" />
            {t('signInWithGoogle')}
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-border/50 text-center">
          <p className="text-[10px] text-brand-text-muted uppercase font-black tracking-[0.2em] mb-4 opacity-50 leading-none">{t('platformStatus')}</p>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
            <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest leading-none">{t('infrastructureOnline')}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
