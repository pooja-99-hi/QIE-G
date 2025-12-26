
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import PortfolioChart from '../components/PortfolioChart';
import ContractScanner from '../components/ContractScanner';
import TransactionFirewall from '../components/TransactionFirewall';
import LiveThreatFeed from '../components/LiveThreatFeed';
import { useApp } from '../App';
import { MOCK_ASSETS, MOCK_VALIDATORS, INSURANCE_POOLS } from '../constants';
import { 
  Bell, 
  Search, 
  Plus, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle, 
  TrendingUp, 
  Filter as FilterIcon, 
  Zap,
  X,
  CreditCard,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  User as UserIcon,
  Settings as SettingsIcon,
  Download,
  AlertTriangle,
  History,
  Lock,
  ChevronRight,
  Info,
  ArrowRight,
  BarChart3,
  Dna,
  Layers,
  ShieldQuestion,
  RefreshCw,
  Clock,
  Briefcase
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [insuranceValue, setInsuranceValue] = useState(50000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'vault' | 'stake' | 'exit' | null>(null);
  const [stakeAmount, setStakeAmount] = useState(1000);
  const [riskProfile, setRiskProfile] = useState<'SAFE' | 'BALANCED' | 'AGGRESSIVE'>('BALANCED');
  
  // Dynamic greeting logic
  const getGreeting = () => {
    if (currentUser.name.includes('Sterling')) return "Systems online, Architect Sterling.";
    if (currentUser.name.includes('Vance')) return "Market Intel synchronized, Researcher Vance.";
    if (currentUser.name.includes('Thorne')) return "Validators responding, Commander Thorne.";
    return `Welcome back, ${currentUser.name.split(' ')[0]}`;
  };

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Malicious Swap Blocked', desc: 'Attempted drain of 12.4 ETH intercepted on DEX V2.', time: '1m ago', unread: true },
    { id: 2, title: 'Staking Reward', desc: 'Received 45.2 QIE from Genesis Validator.', time: '2h ago', unread: true },
    { id: 3, title: 'Security Audit Complete', desc: 'Scan of 0x742d...f44e passed with a score of 98/100.', time: '5h ago', unread: false },
  ]);

  const openModal = (type: 'vault' | 'stake' | 'exit') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const filteredAssets = useMemo(() => {
    return MOCK_ASSETS.filter(a => 
      a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleAction = (msg: string) => alert(msg);

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up">
      <div className="lg:col-span-2 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Net Value" value="$37,350.42" change="12.5%" isPositive icon={TrendingUp} color="emerald" />
          <StatCard label="Protected Layers" value="8/8" change="Active" isPositive icon={ShieldCheck} color="blue" />
          <StatCard label="Threat Intercepts" value="4" change="Today" isPositive icon={ShieldAlert} color="rose" />
        </div>
        
        <div className="glass p-8 rounded-[32px] border border-slate-800">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Protection Coverage</p>
              <h3 className="text-3xl font-black text-white">Security History</h3>
            </div>
            <div className="flex gap-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
              {['1D', '7D', '1M', 'ALL'].map((p) => (
                <button key={p} className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${p === '7D' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-white'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <PortfolioChart />
        </div>

        <div className="glass p-8 rounded-[32px] border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Priority Holdings</h3>
            <button onClick={() => setActiveTab('portfolio')} className="text-emerald-400 text-sm font-bold flex items-center gap-1 hover:underline">
              Full Inventory <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {filteredAssets.slice(0, 4).map((asset) => (
              <div key={asset.symbol} className="p-4 bg-slate-900/30 rounded-2xl border border-slate-800/50 hover:bg-slate-900/50 transition-all flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-2xl">{asset.icon}</div>
                  <div>
                    <p className="font-bold text-white">{asset.symbol}</p>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{asset.chain} Network</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-100">${asset.value.toLocaleString()}</p>
                  <p className={`text-xs font-black ${asset.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <LiveThreatFeed />
        <div className="glass p-8 rounded-[32px] border border-slate-800 relative overflow-hidden group bg-rose-500/[0.02]">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertTriangle className="w-32 h-32 text-rose-500" />
          </div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            Firewall Alerts
          </h3>
          <div className="space-y-4 relative z-10">
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
              <p className="text-sm font-bold text-amber-300">Stale Approval Found</p>
              <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">DEX Router 0x8a...e1 has unlimited allowance. Risks: Bridge Drain.</p>
              <button onClick={() => handleAction("Approval revoked!")} className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[10px] uppercase rounded-xl transition-all">Revoke Instantly</button>
            </div>
            <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
              <p className="text-sm font-bold text-rose-300">Phishing Pattern Detected</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Guardian AI blocked a transaction to known drainer address 0xdead...beef.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'scanner': return <ContractScanner />;
      case 'firewall': return <TransactionFirewall />;
      case 'portfolio': 
        return (
          <div className="animate-slide-up space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass p-6 rounded-3xl text-center">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Asset Entities</p>
                <p className="text-3xl font-black">8 Assets</p>
              </div>
              <div className="glass p-6 rounded-3xl text-center">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Inter-Op Networks</p>
                <p className="text-3xl font-black">4 Chains</p>
              </div>
              <div className="glass p-6 rounded-3xl text-center border-emerald-500/30">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Safety Index</p>
                <p className="text-3xl font-black text-emerald-400">98.4%</p>
              </div>
              <button 
                onClick={() => openModal('exit')}
                className="bg-rose-500 hover:bg-rose-400 p-6 rounded-3xl text-slate-950 font-black flex flex-col items-center justify-center transition-all group shadow-xl shadow-rose-500/10"
              >
                <X className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                Emergency Liquidation
              </button>
            </div>
            
            <div className="glass rounded-[32px] overflow-hidden border border-slate-800">
               <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
                 <h3 className="text-xl font-bold">Secured Inventory</h3>
                 <div className="flex gap-4">
                   <button onClick={() => handleAction("Exporting Log...")} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-sm font-bold text-slate-300 hover:text-white transition-all"><Download className="w-4 h-4" /> CSV</button>
                   <button onClick={() => handleAction("Protocol Asset Entry...")} className="flex items-center gap-2 px-6 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm hover:bg-emerald-400 transition-all"><Plus className="w-4 h-4" /> Add Asset</button>
                 </div>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead className="bg-slate-950/50">
                      <tr className="text-left text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-800">
                        <th className="px-8 py-5">Entity</th>
                        <th className="px-8 py-5">Network Context</th>
                        <th className="px-8 py-5">Balance</th>
                        <th className="px-8 py-5 text-right">Value USD</th>
                        <th className="px-8 py-5 text-right">Protection Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {MOCK_ASSETS.map((asset) => (
                        <tr key={asset.symbol} className="group hover:bg-slate-900/30 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <span className="text-2xl">{asset.icon}</span>
                              <div>
                                <p className="font-bold text-white">{asset.name}</p>
                                <p className="text-xs text-slate-500 mono">{asset.symbol}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400 tracking-wider">
                              {asset.chain} MAINNET
                            </span>
                          </td>
                          <td className="px-8 py-6 text-sm font-medium mono text-slate-300">{asset.balance}</td>
                          <td className="px-8 py-6 text-right font-bold text-white">${asset.value.toLocaleString()}</td>
                          <td className="px-8 py-6 text-right font-black">
                            <span className="px-3 py-1 rounded-lg text-emerald-400 bg-emerald-400/5 text-[9px] uppercase tracking-widest border border-emerald-500/10">
                              Verified
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
        );
      case 'validators': return <div className="text-center p-20 glass rounded-[48px] border border-slate-800"><p className="text-slate-500 font-bold">Redirecting to Validator Fleet Intelligence...</p></div>;
      case 'insurance': return <div className="text-center p-20 glass rounded-[48px] border border-slate-800"><p className="text-slate-500 font-bold">Initializing Underwriting Engine...</p></div>;
      case 'settings': return <div className="text-center p-20 glass rounded-[48px] border border-slate-800"><p className="text-slate-500 font-bold">Opening Protocol Preferences...</p></div>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex pl-64 overflow-hidden relative">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="fixed bottom-0 left-64 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="h-24 glass flex items-center justify-between px-10 sticky top-0 z-30 border-b border-white/5">
          <div className="flex-1 max-w-xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 transition-colors group-focus-within:text-emerald-400" />
            <input 
              type="text" 
              placeholder="Search assets, threats, or node status... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm transition-all placeholder:text-slate-600 font-medium"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">QIE Net Ops</span>
                <span className="text-sm font-bold text-emerald-400">Stable • 12ms Block</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
            </div>

            <div className="flex items-center gap-4 relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`w-12 h-12 rounded-2xl border border-slate-800 flex items-center justify-center transition-all relative ${showNotifications ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-950" />
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-800 group cursor-pointer" onClick={() => setActiveTab('settings')}>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors leading-none mb-1">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500 font-bold mono leading-none tracking-tighter">{currentUser.wallet}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-800 group-hover:border-emerald-500/50 transition-all p-0.5 shadow-lg">
                  <img src={currentUser.avatar} alt="Profile" className="w-full h-full rounded-[14px] object-cover" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-10 max-w-7xl mx-auto w-full flex-1">
          <div className="mb-12 flex flex-col md:flex-row justify-between md:items-end gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Protocol Shield Active</span>
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight capitalize">
                {activeTab === 'overview' ? getGreeting() : activeTab.replace('_', ' ')}
              </h2>
            </div>
            {activeTab === 'overview' && (
              <div className="flex gap-4">
                <button 
                  onClick={() => handleAction("Loading Global Threat Map...")}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                >
                  <History className="w-4 h-4" /> Activity Log
                </button>
                <button 
                  onClick={() => openModal('vault')}
                  className="flex items-center gap-2 px-8 py-3 bg-emerald-500 text-slate-950 rounded-2xl text-sm font-black hover:scale-[1.02] transition-all shadow-xl shadow-emerald-500/10"
                >
                  <Plus className="w-4 h-4" /> New Security Vault
                </button>
              </div>
            )}
          </div>

          <div className="min-h-[calc(100vh-250px)]">
            {renderContent()}
          </div>

          <footer className="mt-20 py-12 border-t border-slate-900 flex justify-between items-center text-slate-600 text-[10px] font-bold uppercase tracking-widest">
            <p>&copy; 2024 QIE Guardian Protocol v2.5.0-RC1</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-emerald-500 transition-colors">Audit Reports</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Risk Policy</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Network Status</a>
            </div>
          </footer>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-lg glass p-10 rounded-[48px] border border-white/10 relative animate-slide-up shadow-[0_0_100px_rgba(16,185,129,0.05)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 hover:bg-white/5 rounded-2xl transition-all">
              <X className="w-6 h-6 text-slate-500" />
            </button>
            
            <div className="text-center mb-10">
              <div className={`w-20 h-20 rounded-3xl mx-auto mb-8 flex items-center justify-center ${
                modalType === 'vault' ? 'bg-blue-500/10 text-blue-400' : 
                modalType === 'stake' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                {modalType === 'vault' ? <Lock className="w-10 h-10" /> : 
                 modalType === 'stake' ? <TrendingUp className="w-10 h-10" /> : <ShieldAlert className="w-10 h-10" />}
              </div>
              <h3 className="text-3xl font-black text-white mb-3">
                {modalType === 'vault' ? 'Deploy Asset Vault' : 
                 modalType === 'stake' ? 'Consensus Delegation' : 'Protocol Safe-Exit'}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                {modalType === 'vault' ? 'Bank-grade cold storage with 24h time-lock and multi-sig guardian protection.' : 
                 modalType === 'stake' ? 'Secure the QIE Mainnet layers and earn estimated 12.8% APY rewards.' : 
                 'Emergency liquidation will clear all positions and bridge funds to your primary recovery address.'}
              </p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 font-bold rounded-[24px] transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  handleAction(`Transaction broadcast to network: ${modalType?.toUpperCase()}`);
                  setIsModalOpen(false);
                }}
                className={`flex-[2] py-5 font-black rounded-[24px] transition-all shadow-2xl flex items-center justify-center gap-3 ${
                  modalType === 'exit' ? 'bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-rose-500/20' : 
                  'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                }`}
              >
                {modalType === 'exit' ? <ShieldAlert className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                Confirm on QIE Mainnet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
