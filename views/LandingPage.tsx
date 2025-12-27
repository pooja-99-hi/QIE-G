
import React from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { useApp } from '../App';

const LandingPage: React.FC = () => {
  const { setView } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Cinematic Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-emerald-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="z-10 flex flex-col items-center text-center px-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] mb-12 animate-float">
          <ShieldCheck className="text-slate-950 w-10 h-10" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tighter text-white">
          QIE <span className="text-emerald-500">GUARDIAN</span>
        </h1>
        
        <p className="text-lg text-slate-500 mb-12 max-w-lg font-medium tracking-tight">
          The definitive security layer for the QIE Network. 
          Real-time intelligence for decentralized assets.
        </p>

        <button 
          onClick={() => setView('login')}
          className="group relative px-12 py-6 bg-white text-slate-950 font-black rounded-[32px] text-xl transition-all hover:scale-[1.05] hover:shadow-[0_0_80px_rgba(255,255,255,0.1)] active:scale-95 flex items-center gap-4"
        >
          Initialize Protocol
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-24 flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">
          <span>Mainnet v2.5.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          <span>Secured by QSIE</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
