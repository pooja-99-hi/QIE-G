
import React from 'react';
import { ShieldCheck, ChevronRight, Zap, Lock, Globe, Users } from 'lucide-react';
import { useApp } from '../App';

const LandingPage: React.FC = () => {
  const { setView } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <nav className="w-full max-w-7xl px-8 py-8 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="text-slate-950 w-6 h-6" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-xl leading-tight">QIE Guardian</h1>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Protocol v2.4</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Protocol</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
          <a href="#" className="hover:text-white transition-colors">Ecosystem</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
        </div>
        <button 
          onClick={() => setView('login')}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center gap-2 group"
        >
          Launch App
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-40 z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 mb-8 animate-float">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Securing $4.2B in Assets</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
          Next-Generation <br />
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Web3 Firewall.</span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
          The ultimate guardian for your digital wealth. Real-time threat detection, 
          AI-powered contract scanning, and transaction interception across all EVM chains.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full max-w-md">
          <button 
            onClick={() => setView('login')}
            className="flex-1 bg-white text-slate-950 font-black px-8 py-5 rounded-2xl text-lg transition-all hover:scale-[1.02] shadow-xl"
          >
            Get Started Free
          </button>
          <button className="flex-1 bg-slate-900 border border-slate-800 text-white font-bold px-8 py-5 rounded-2xl text-lg transition-all hover:bg-slate-800">
            View Stats
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-2">
              <Zap className="text-emerald-400 w-6 h-6" />
            </div>
            <p className="text-sm font-bold">Ultra Fast</p>
            <p className="text-xs text-slate-500">2s Analysis</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-2">
              <Lock className="text-blue-400 w-6 h-6" />
            </div>
            <p className="text-sm font-bold">Air-Tight</p>
            <p className="text-xs text-slate-500">Bank-grade Encryption</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-2">
              <Globe className="text-purple-400 w-6 h-6" />
            </div>
            <p className="text-sm font-bold">Multichain</p>
            <p className="text-xs text-slate-500">24+ Networks</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-2">
              <Users className="text-rose-400 w-6 h-6" />
            </div>
            <p className="text-sm font-bold">Trusted</p>
            <p className="text-xs text-slate-500">50k+ Protected Wallets</p>
          </div>
        </div>
      </main>
      
      <footer className="w-full py-12 border-t border-slate-900 mt-20 text-center text-slate-600 text-sm z-10">
        &copy; 2024 QIE Guardian Protocol. Securely powering the decentralized future.
      </footer>
    </div>
  );
};

export default LandingPage;
