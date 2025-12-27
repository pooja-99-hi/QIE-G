
import React, { useState } from 'react';
import { ShieldCheck, Globe, Smartphone, ArrowLeft, Loader2, Cpu, User as UserIcon } from 'lucide-react';
import { useApp } from '../App';

const LoginPage: React.FC = () => {
  const { loginWithIdentity, setView } = useApp();
  const [isConnecting, setIsConnecting] = useState(false);
  const [nameInput, setNameInput] = useState('');

  const generateRandomName = () => {
    const prefixes = ['OPERATOR', 'GHOST', 'PHANTOM', 'SHIELD', 'TITAN'];
    const id = Math.floor(1000 + Math.random() * 9000);
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]}-${id}`;
  };

  const handleAuth = (method: string) => {
    const finalName = nameInput.trim() || generateRandomName();
    setIsConnecting(true);
    
    // Simulate professional connection delay
    setTimeout(() => {
      loginWithIdentity(finalName);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <button 
        onClick={() => setView('landing')}
        className="absolute top-8 left-8 text-slate-500 hover:text-white flex items-center gap-2 transition-colors z-10 font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        Return
      </button>

      <div className="w-full max-w-md glass p-10 rounded-[48px] z-10 relative border border-white/5 shadow-2xl">
        {isConnecting && (
          <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl rounded-[48px] flex flex-col items-center justify-center z-20 animate-in fade-in duration-500">
            <Loader2 className="w-16 h-16 text-emerald-400 animate-spin mb-8" />
            <p className="text-emerald-400 font-black tracking-[0.4em] uppercase text-[10px] mb-4">Establishing Secure Node Link</p>
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <p className="text-white font-bold text-sm">{nameInput.trim() || 'GENERATING IDENTITY...'}</p>
            </div>
          </div>
        )}

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-inner">
            <ShieldCheck className="text-emerald-400 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tight">Access Gateway</h2>
          <p className="text-slate-500 text-sm font-medium">Verify credentials for Guardian Mainnet.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Operator Identifier</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
              <input 
                type="text" 
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter Name or Leave Blank for Random"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all text-sm font-medium text-white placeholder:text-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => handleAuth('wallet')}
              className="w-full py-5 px-6 bg-emerald-500 text-slate-950 font-black rounded-[24px] flex items-center justify-between group transition-all hover:scale-[1.02] shadow-xl shadow-emerald-500/10"
            >
              <span className="flex items-center gap-4">
                <Globe className="w-6 h-6" />
                Web3 Wallet Bridge
              </span>
              <div className="px-2 py-1 rounded-lg bg-slate-950/10 text-[8px] font-black uppercase tracking-widest border border-slate-950/10">Prod</div>
            </button>

            <button 
              onClick={() => handleAuth('biometric')}
              className="w-full py-5 px-6 bg-slate-900 border border-slate-800 text-white font-bold rounded-[24px] flex items-center gap-4 hover:bg-slate-800 transition-all"
            >
              <Smartphone className="w-6 h-6 text-slate-500" />
              Biometric Key Vault
            </button>
            
            <button 
              onClick={() => handleAuth('guest')}
              className="w-full py-4 text-slate-600 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
            >
              Direct Guest Entry
            </button>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-900 text-center">
          <p className="text-slate-700 text-[9px] font-black uppercase tracking-[0.3em]">Guardian Protocol Isolation Tier 1</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
