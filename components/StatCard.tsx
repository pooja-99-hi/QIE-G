
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color: 'emerald' | 'blue' | 'purple' | 'rose' | 'amber';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, isPositive, icon: Icon, color }) => {
  const colorMap = {
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/5',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-rose-500/5',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-500/5',
  };

  return (
    <div className="glass p-8 rounded-[32px] border border-slate-800 hover:border-white/10 transition-all hover:-translate-y-1 group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border shadow-xl transition-all group-hover:scale-110 ${colorMap[color]}`}>
        <Icon className="w-7 h-7" />
      </div>
      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">{label}</p>
      <div className="flex items-baseline gap-3">
        <h3 className="text-2xl font-black text-white">{value}</h3>
        {change && (
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${isPositive ? 'text-emerald-400 bg-emerald-400/5' : 'text-rose-400 bg-rose-400/5'}`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
