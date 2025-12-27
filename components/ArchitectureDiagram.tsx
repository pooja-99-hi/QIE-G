import React from 'react';

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center py-10 bg-slate-950/50 rounded-[40px] border border-slate-800">
      <svg viewBox="0 0 800 600" className="w-full max-w-2xl overflow-visible">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="layerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Top Layer: UI/UX */}
        <g transform="translate(400, 150) scale(1, 0.5) rotate(45)">
          <rect x="-150" y="-150" width="300" height="300" rx="20" fill="url(#layerGrad)" stroke="#10b981" strokeWidth="2" filter="url(#glow)" />
          <text x="0" y="0" textAnchor="middle" fill="#10b981" fontSize="24" fontWeight="bold" transform="rotate(-45) translate(0, 10)">DASHBOARD UI</text>
          
          {/* Dashboard Dots */}
          <circle cx="-100" cy="-100" r="5" fill="#10b981" />
          <circle cx="-80" cy="-100" r="5" fill="#10b981" opacity="0.5" />
          <circle cx="-60" cy="-100" r="5" fill="#10b981" opacity="0.3" />
        </g>

        {/* Connections Top to Middle */}
        <path d="M400 175 V275" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" opacity="0.5">
          <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Middle Layer: QSIE Intelligence */}
        <g transform="translate(400, 300) scale(1, 0.5) rotate(45)">
          <rect x="-150" y="-150" width="300" height="300" rx="20" fill="url(#layerGrad)" stroke="#0ea5e9" strokeWidth="2" filter="url(#glow)" />
          
          {/* Brain Icon Simulation */}
          <circle cx="0" cy="0" r="40" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2,2" />
          <text x="0" y="0" textAnchor="middle" fill="#0ea5e9" fontSize="20" fontWeight="bold" transform="rotate(-45) translate(0, 5)">QSIE ENGINE</text>
          
          {/* Circuit lines */}
          <path d="M-100 -50 H100 M-100 0 H100 M-100 50 H100" stroke="#0ea5e9" strokeWidth="1" opacity="0.3" />
        </g>

        {/* Connections Middle to Bottom */}
        <path d="M400 325 V425" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,5" opacity="0.5">
          <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Bottom Layer: QIE Mainnet */}
        <g transform="translate(400, 450) scale(1, 0.5) rotate(45)">
          <rect x="-150" y="-150" width="300" height="300" rx="20" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="2" />
          
          {/* Grid of Nodes */}
          {[-100, -50, 0, 50, 100].map(x => (
            [-100, -50, 0, 50, 100].map(y => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#1e293b" />
            ))
          ))}
          
          <text x="0" y="0" textAnchor="middle" fill="#64748b" fontSize="18" fontWeight="bold" transform="rotate(-45) translate(0, 5)">QIE BLOCKCHAIN</text>
        </g>

        {/* Explanatory Labels */}
        <g transform="translate(580, 140)">
          <text fill="#94a3b8" fontSize="12" fontWeight="bold">01. OBSERVABILITY</text>
          <text y="20" fill="#64748b" fontSize="10">Real-time Telemetry & UI</text>
        </g>
        <g transform="translate(580, 290)">
          <text fill="#94a3b8" fontSize="12" fontWeight="bold">02. INTELLIGENCE</text>
          <text y="20" fill="#64748b" fontSize="10">Semantic Intent Mapping</text>
        </g>
        <g transform="translate(580, 440)">
          <text fill="#94a3b8" fontSize="12" fontWeight="bold">03. SETTLEMENT</text>
          <text y="20" fill="#64748b" fontSize="10">QIE Mainnet RPC Bridge</text>
        </g>
      </svg>
    </div>
  );
};

export default ArchitectureDiagram;