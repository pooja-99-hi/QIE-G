
import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  AlertCircle, 
  Zap, 
  Globe, 
  ShieldQuestion, 
  Activity, 
  ArrowRight,
  TrendingDown,
  ShieldAlert as AlertIcon
} from 'lucide-react';
import { INITIAL_THREATS } from '../constants';
import { Threat } from '../types';

const LiveThreatFeed: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>(INITIAL_THREATS);

  useEffect(() => {
    const threatTypes: Threat['type'][] = ['Phishing', 'DDoS', 'Flashloan', 'Liquidity', 'Exploit'];
    const messages = [
      "Malicious contract 0xdead...beef blacklisted globally.",
      "Flashloan spike on Polygon V2 - monitoring arbitrage flow.",
      "Suspected reentrancy pattern in new token launch 'SHIBA-QIE'.",
      "Large liquidity removal detected on pool 0x44a1...92.",
      "Social engineering campaign active: 'Guardian Support' scam."
    ];

    const interval = setInterval(() => {
      const isHigh = Math.random() > 0.8;
      const newThreat: Threat = {
        id: Math.random().toString(36).substr(2, 9),
        type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
        severity: isHigh ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: 'Just now'
      };
      setThreats(prev => [newThreat, ...prev].slice(0, 6));
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: Threat['type']) => {
    switch(type) {
      case 'Phishing': return Globe;
      case 'Flashloan': return Zap;
      case 'DDoS': return AlertCircle;
      case 'Liquidity': return TrendingDown;
      default: return AlertIcon;
    }
  };

  return (
    <div className="glass rounded-[32px] p-8 border border-slate-800 h-full flex flex-col shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-lg flex items-center gap-3">
          <Activity className="w-5 h-5 text-emerald-400" />
          Global Security Intel
        </h3>
        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Realtime
        </span>
      </div>

      <div className="space-y-5 flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/40 pointer-events-none z-10" />
        {threats.map((threat) => {
          const Icon = getIcon(threat.type);
          return (
            <div key={threat.id} className="group flex gap-5 p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 animate-slide-up">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                threat.severity === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                threat.severity === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                     threat.severity === 'high' ? 'text-rose-400' : 'text-slate-500'
                  }`}>{threat.type}</span>
                  <span className="text-[10px] text-slate-600 font-bold">{threat.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-medium">{threat.message}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-8 py-4 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border-t border-white/5 group">
        Explore Cyber Threat Map
        <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  );
};

export default LiveThreatFeed;
