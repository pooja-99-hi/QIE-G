
import React from 'react';
import { ShieldCheck, ChevronRight, Zap, Lock, Globe, Users, Github, PlayCircle, ExternalLink } from 'lucide-react';
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
          <a href="https://github.com" className="flex items-center gap-1 hover:text-white transition-colors"><Github className="w-4 h-4" /> Code</a>
          <a href="https://youtube.com" className="flex items-center gap-1 hover:text-white transition-colors"><PlayCircle className="w-4 h-4" /> Demo</a>
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
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Securing $4.2B in Assets on QIE</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
          The Semantic <br />
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">QIE Firewall.</span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
          The ultimate guardian for your digital wealth. Real-time threat detection and
          proprietary semantic intent analysis built exclusively for the QIE Network.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full max-w-md">
          <button 
            onClick={() => setView('login')}
            className="flex-1 bg-white text-slate-950 font-black px-8 py-5 rounded-2xl text-lg transition-all hover:scale-[1.02] shadow-xl"
          >
            Enter Dashboard
          </button>
          <a 
            href="https://youtube.com" 
            target="_blank"
            className="flex-1 bg-slate-900 border border-slate-800 text-white font-bold px-8 py-5 rounded-2xl text-lg transition-all hover:bg-slate-800 flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5 text-emerald-400" />
            Watch Video
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-2">
              <Zap className="text-emerald-400 w-6 h-6" />
            </div>
            <p className="text-sm font-bold">Ultra Fast</p>
            <p className="text-xs text-slate-500">QIE Native</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-2">
              <Lock className="text-blue-400 w-6 h-6" />
            </div>
            <p className="text-sm font-bold">Semantic Scan</p>
            <p className="text-xs text-slate-500">Intent Analysis</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-2">
              <Globe className="text-purple-400 w-6 h-6" />
            </div>
            <p className="text-sm font-bold">Firewall</p>
            <p className="text-xs text-slate-500">TX Interception</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-2">
              <Users className="text-rose-400 w-6 h-6" />
            </div>
            <p className="text-sm font-bold">Trusted</p>
            <p className="text-xs text-slate-500">Open Source</p>
          </div>
        </div>
      </main>
      
      <footer className="w-full py-12 border-t border-slate-900 mt-20 text-center text-slate-600 text-sm z-10">
        <div className="flex justify-center gap-8 mb-4">
            <a href="https://github.com" className="hover:text-white flex items-center gap-1 font-bold uppercase tracking-widest text-[10px]"><Github className="w-3 h-3" /> GitHub Repo</a>
            <a href="https://youtube.com" className="hover:text-white flex items-center gap-1 font-bold uppercase tracking-widest text-[10px]"><PlayCircle className="w-3 h-3" /> Demo Video</a>
            <a href="https://qie.network" className="hover:text-white flex items-center gap-1 font-bold uppercase tracking-widest text-[10px]"><ExternalLink className="w-3 h-3" /> QIE Network</a>
        </div>
        &copy; 2024 QIE Guardian Protocol. Designed for the QIE Global Hackathon.
      </footer>
    </div>
  );
};

export default LandingPage;
