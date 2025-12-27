import React from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Wallet, 
  Activity, 
  ShieldAlert, 
  LogOut,
  Zap,
  Layers
} from 'lucide-react';
import { useApp } from '../App';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { logout } = useApp();

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'scanner', icon: ShieldCheck, label: 'Contract Scanner' },
    { id: 'portfolio', icon: Wallet, label: 'Portfolio' },
    { id: 'firewall', icon: ShieldAlert, label: 'TX Firewall' },
    { id: 'architecture', icon: Layers, label: 'Architecture' },
    { id: 'validators', icon: Activity, label: 'Validators' },
    { id: 'insurance', icon: Zap, label: 'Insurance' },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 h-full flex flex-col glass fixed left-0 top-0 z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <ShieldCheck className="text-slate-950 w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">QIE</h1>
          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Guardian</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-emerald-400' : 'group-hover:scale-110 transition-transform'}`} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-400/5 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;