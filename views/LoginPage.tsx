
import React, { useState } from 'react';
import { ShieldCheck, Mail, Smartphone, Globe, ArrowLeft, Loader2, Lock } from 'lucide-react';
import { useApp } from '../App';
import { MOCK_PERSONAS } from '../constants';

const LoginPage: React.FC = () => {
  const { login, setView } = useApp();
  const [isConnecting, setIsConnecting] = useState(false);
  const [personaName, setPersonaName] = useState('');

  const handleAuth = (type: string) => {
    // For demo: show which persona is about to be logged in
    const lastIndex = parseInt(localStorage.getItem('persona_index') || '0');
    const nextIndex = (lastIndex + 1) % MOCK_PERSONAS.length;
    setPersonaName(MOCK_PERSONAS[nextIndex].name);
    
    setIsConnecting(true);
    setTimeout(() => {
      login();
      setIsConnecting(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <button 
        onClick={() => setView('landing')}
        className="absolute top-8 left-8 text-slate-500 hover:text-white flex items-center gap-2 transition-colors z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="w-full max-w-md glass p-10 rounded-[40px] z-10 text-center relative">
        {isConnecting && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl rounded-[40px] flex flex-col items-center justify-center z-20">
            <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-6" />
            <p className="text-emerald-400 font-black tracking-[0.2em] uppercase text-[10px] mb-2">Establishing Secure Bridge</p>
            <p className="text-white font-bold text-sm">Identifying: {personaName}...</p>
          </div>
        )}

        <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <ShieldCheck className="text-emerald-400 w-12 h-12" />
        </div>

        <h2 className="text-3xl font-black mb-2">Protocol Access</h2>
        <p className="text-slate-400 mb-10">Select an identity gateway to enter the Guardian environment.</p>

        <div className="space-y-4">
          <button 
            onClick={() => handleAuth('wallet')}
            className="w-full py-5 px-6 bg-white text-slate-950 font-black rounded-2xl flex items-center justify-between group transition-all hover:scale-[1.02] shadow-xl"
          >
            <span className="flex items-center gap-4">
              <Globe className="w-6 h-6 text-blue-600" />
              Web3 Wallet Gateway
            </span>
            <div className="px-3 py-1 rounded-full bg-slate-100 text-[9px] text-slate-500 font-black uppercase tracking-widest">Secure</div>
          </button>

          <button 
            onClick={() => handleAuth('google')}
            className="w-full py-5 px-6 bg-slate-900 border border-slate-800 text-white font-bold rounded-2xl flex items-center gap-4 hover:bg-slate-800 transition-all"
          >
            <img src="https://www.google.com/favicon.ico" className="w-6 h-6 grayscale" alt="Google" />
            Social Recovery Login
          </button>

          <button 
            onClick={() => handleAuth('biometric')}
            className="w-full py-5 px-6 bg-slate-900 border border-slate-800 text-white font-bold rounded-2xl flex items-center gap-4 hover:bg-slate-800 transition-all"
          >
            <Smartphone className="w-6 h-6 text-slate-500" />
            Biometric Vault Key
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-900 flex flex-col gap-1 items-center">
          <p className="text-slate-600 text-xs">Environment: Production v2.5.0</p>
          <a href="#" className="text-emerald-400 font-bold text-sm hover:underline">Request Emergency Recovery</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
