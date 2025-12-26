
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRightLeft, 
  ShieldCheck, 
  Info, 
  Activity,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Search,
  Zap,
  ChevronRight,
  ShieldQuestion,
  AlertTriangle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { PENDING_TRANSACTIONS, MOCK_USER } from '../constants';
import { Transaction, TransactionAnalysis } from '../types';

const TransactionFirewall: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(PENDING_TRANSACTIONS);
  const [showHistory, setShowHistory] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([
    { id: 'tx_old_1', type: 'Approval', target: '0x33...44', amount: '100 USDC', status: 'Rejected', risk: 'high', time: '2h ago' },
    { id: 'tx_old_2', type: 'Transfer', target: '0x11...22', amount: '2.5 ETH', status: 'Approved', risk: 'low', time: '5h ago' },
  ]);

  const handleAnalyze = async (id: string) => {
    setAnalyzingId(id);
    try {
      const tx = transactions.find(t => t.id === id);
      if (!tx) return;
      
      const response = await fetch('/api/firewall/analyze', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ tx })
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      setTransactions(prev => prev.map(t => 
        t.id === id ? { ...t, status: 'analyzing', analysis: data.analysis } : t
      ));
    } catch (e) {
      console.error(e);
      alert("Firewall analysis failed. Network error.");
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    const tx = transactions.find(t => t.id === id);
    if (!tx) return;
    
    setHistory([{
      ...tx,
      status: action === 'approve' ? 'Approved' : 'Rejected',
      time: 'Just now'
    }, ...history]);

    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const simulateNewTx = () => {
    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'Interaction',
      target: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      amount: '0 QIE',
      value: '0',
      risk: 'high',
      threats: ['Phishing pattern detected'],
      timestamp: 'Just now',
      status: 'pending'
    };
    setTransactions([newTx, ...transactions]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black mb-1">Transaction Firewall</h2>
          <p className="text-slate-500">Guardian real-time interception via production backend API.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={simulateNewTx}
            className="px-6 py-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Simulate New Tx
          </button>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className={`px-6 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${showHistory ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
          >
            <HistoryIcon className="w-4 h-4" />
            {showHistory ? 'Pending Queue' : 'Activity Log'}
          </button>
        </div>
      </div>

      {!showHistory ? (
        <div className="space-y-6">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <div key={tx.id} className="glass rounded-[32px] border border-slate-800 overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center flex-shrink-0 shadow-2xl ${
                      tx.risk === 'high' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      <ArrowRightLeft className="w-8 h-8" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-black text-xl text-white">{tx.type} Request</h3>
                        <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] ${
                          tx.risk === 'high' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {tx.risk} Risk
                        </span>
                      </div>
                      <p className="text-slate-500 mono text-xs mb-4">Target: {tx.target}</p>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50">
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Amount</p>
                          <p className="font-bold text-white text-sm">{tx.amount}</p>
                        </div>
                        <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50">
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Time</p>
                          <p className="font-bold text-white text-sm">{tx.timestamp}</p>
                        </div>
                        <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50">
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                          <p className={`font-bold text-sm uppercase ${tx.analysis ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {tx.analysis ? 'Verified' : 'Pending Scan'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-fit flex flex-col gap-3">
                      {!tx.analysis ? (
                        <button 
                          onClick={() => handleAnalyze(tx.id)}
                          disabled={analyzingId === tx.id}
                          className="w-full lg:px-8 py-4 bg-white text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                          {analyzingId === tx.id ? <RefreshCw className="w-5 h-5 animate-spin" /> : <ShieldQuestion className="w-5 h-5" />}
                          {analyzingId === tx.id ? 'Analyzing...' : 'Deep Scan Now'}
                        </button>
                      ) : (
                        <div className="flex gap-3">
                           <button 
                            onClick={() => handleAction(tx.id, 'reject')}
                            className="flex-1 lg:px-8 py-4 bg-slate-900 border border-slate-800 hover:bg-rose-500/10 hover:text-rose-400 font-black rounded-2xl transition-all flex items-center justify-center gap-2"
                          >
                            <XCircle className="w-5 h-5" /> Reject
                          </button>
                          <button 
                            onClick={() => handleAction(tx.id, 'approve')}
                            className={`flex-1 lg:px-8 py-4 text-slate-950 font-black rounded-2xl transition-all flex items-center justify-center gap-2 ${
                              tx.analysis.action === 'BLOCK' ? 'bg-slate-800 text-slate-500 grayscale' : 'bg-emerald-500 hover:bg-emerald-400'
                            }`}
                            disabled={tx.analysis.action === 'BLOCK'}
                          >
                            <CheckCircle className="w-5 h-5" /> Approve
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {tx.analysis && (
                    <div className="mt-8 pt-8 border-t border-slate-800 animate-slide-up grid grid-cols-1 lg:grid-cols-2 gap-8">
                       <div className="bg-slate-900/20 rounded-3xl p-6 border border-slate-800/50">
                          <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3 text-amber-500" /> Critical Insights
                          </h4>
                          <ul className="space-y-3">
                            {tx.analysis.warnings.map((w, i) => (
                              <li key={i} className="flex gap-3 text-xs text-rose-400">
                                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                                <span className="font-medium">{w}</span>
                              </li>
                            ))}
                            {tx.analysis.recommendations.map((r, i) => (
                              <li key={i} className="flex gap-3 text-xs text-blue-400">
                                <Info className="w-4 h-4 flex-shrink-0" />
                                <span className="font-medium">{r}</span>
                              </li>
                            ))}
                          </ul>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="glass rounded-[48px] p-20 text-center flex flex-col items-center border border-slate-800">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mb-8" />
              <h3 className="text-2xl font-black text-white mb-2">Queue Clear</h3>
              <p className="text-slate-500 mb-8">No pending transaction threats detected.</p>
              <button onClick={simulateNewTx} className="px-8 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl font-bold text-sm">Simulate Protocol Trigger</button>
            </div>
          )}
        </div>
      ) : (
        <div className="glass rounded-[32px] overflow-hidden border border-slate-800">
          <div className="divide-y divide-slate-800/50">
            {history.map(h => (
              <div key={h.id} className="p-8 hover:bg-white/5 flex justify-between items-center transition-all">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${h.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {h.status === 'Approved' ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{h.type} to {h.target}</p>
                    <p className="text-xs text-slate-500">{h.time} • Gas: 21,000 Gwei</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-white">{h.amount}</p>
                  <p className={`text-[10px] font-black uppercase mt-1 ${h.status === 'Approved' ? 'text-emerald-400' : 'text-rose-400'}`}>{h.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFirewall;
