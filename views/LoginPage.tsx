
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Globe, Smartphone, ArrowLeft, Loader2, Cpu } from 'lucide-react';
import { useApp } from '../App';
import { MOCK_PERSONAS } from '../constants';

const LoginPage: React.FC = () => {
  const { login, setView } = useApp();
  const [isConnecting, setIsConnecting] = useState(false);
  const [personaName, setPersonaName] = useState('');

  useEffect(() => {
    const lastIndex = parseInt(localStorage.getItem('persona_index') || '0');
    const nextIndex = (lastIndex + 1) % MOCK_PERSONAS.length;
    setPersonaName(MOCK_PERSONAS[nextIndex].name);
  }, []);

  const handleAuth = () => {
    setIsConnecting(true);
    setTimeout(() => {
      login();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <button 
        onClick={() => setView('landing')}
        className="absolute top-8 left-8 text-slate-500 hover:text-white flex items-center gap-2 transition-colors z-10 font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="w-full max-w-md glass p-10 rounded-[40px] z-10 text-center relative border border-white/5 shadow-2xl">
        {isConnecting && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl rounded-[40px] flex flex-col items-center justify-center z-20 animate-in fade-in duration-300">
            <Loader2 className="w-16 h-16 text-emerald-400 animate-spin mb-8" />
            <p className="text-emerald-400 font-black tracking-[0.3em] uppercase text-[10px] mb-2">Protocol Identification</p>
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <p className="text-white font-bold text-sm">{personaName}</p>
            </div>
            <p className="mt-8 text-slate-500 text-xs font-medium animate-pulse">Establishing Secure Socket Bridge...</p>
          </div>
        )}

        <div className="w-24 h-24 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-inner">
          <ShieldCheck className="text-emerald-400 w-12 h-12" />
        </div>

        <h2 className="text-4xl font-black mb-2 tracking-tight">Access Gateway</h2>
        <p className="text-slate-500 mb-12 text-sm font-medium">Authentication for QIE Guardian Mainnet Ops.</p>

        <div className="space-y-4">
          <button 
            onClick={handleAuth}
            className="w-full py-5 px-6 bg-emerald-500 text-slate-950 font-black rounded-2xl flex items-center justify-between group transition-all hover:scale-[1.02] shadow-xl shadow-emerald-500/10"
          >
            <span className="flex items-center gap-4">
              <Globe className="w-6 h-6" />
              Web3 Wallet Bridge
            </span>
            <div className="px-3 py-1 rounded-full bg-slate-950/10 text-[9px] font-black uppercase tracking-widest border border-slate-950/10">Prod</div>
          </button>

          <button 
            onClick={handleAuth}
            className="w-full py-5 px-6 bg-slate-900 border border-slate-800 text-white font-bold rounded-2xl flex items-center gap-4 hover:bg-slate-800 transition-all"
          >
            <Smartphone className="w-6 h-6 text-slate-500" />
            Biometric Key Vault
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Network Status: <span className="text-emerald-500">Nominal</span></p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-slate-500 font-bold text-xs hover:text-white transition-colors">Docs</a>
            <a href="#" className="text-slate-500 font-bold text-xs hover:text-white transition-colors">Emergency</a>
            <a href="#" className="text-slate-500 font-bold text-xs hover:text-white transition-colors">Uptime</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
