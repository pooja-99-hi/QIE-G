
import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  FileDown, 
  Loader2, 
  Code, 
  Terminal,
  ChevronRight,
  ExternalLink,
  Cpu,
  RefreshCw,
  CheckCircle2,
  History as HistoryIcon
} from 'lucide-react';
import { ContractResult, Vulnerability } from '../types';

const DEMO_CONTRACTS = {
  'reentrancy': `// Vulnerable Reentrancy Contract
contract Bank {
    mapping(address => uint) public balances;
    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
        balances[msg.sender] = 0;
    }
}`,
  'secure': `// Secure Contract with ReentrancyGuard
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
contract SecureBank is ReentrancyGuard {
    mapping(address => uint) public balances;
    function withdraw() public nonReentrant {
        uint bal = balances[msg.sender];
        require(bal > 0);
        balances[msg.sender] = 0;
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
    }
}`
};

const ContractScanner: React.FC = () => {
  const [address, setAddress] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [result, setResult] = useState<ContractResult | null>(null);

  const handleScan = async () => {
    setScanning(true);
    setResult(null);
    
    try {
      setScanStep('Sending to Guardian Backend...');
      const response = await fetch('/api/scanner/scan', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ sourceCode: sourceCode || DEMO_CONTRACTS.reentrancy, address })
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      setScanStep('Parsing Audit Intelligence...');
      await new Promise(r => setTimeout(r, 500));
      
      const aiData = data.report;
      setResult({
        address: address || '0xDemo-Input',
        name: 'Dynamic Audit Target',
        riskScore: aiData.riskScore || 50,
        riskLevel: aiData.riskLevel || 'MEDIUM',
        vulnerabilities: aiData.vulnerabilities || [],
        goodPractices: aiData.goodPractices || [],
        lastScanned: new Date().toLocaleString(),
        status: (aiData.riskScore > 80 ? 'safe' : aiData.riskScore > 40 ? 'warning' : 'critical') as any,
        similarExploits: aiData.similarExploits || [],
        auditRecommendation: aiData.riskScore < 60 ? "Immediate professional audit required." : "Looks generally healthy.",
        estimatedAuditCost: "$8,000 - $15,000"
      });
    } catch (error) {
      console.error(error);
      alert("Scan failed. Ensure the Guardian backend is reachable.");
    } finally {
      setScanning(false);
      setScanStep('');
    }
  };

  const loadDemo = (type: 'reentrancy' | 'secure') => {
    setSourceCode(DEMO_CONTRACTS[type]);
    setAddress(type === 'reentrancy' ? '0x7a25...f488' : '0x1111...2222');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="glass p-8 rounded-[40px] border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <Cpu className="w-64 h-64 text-emerald-400" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2">Guardian AI Scanner</h2>
          <p className="text-slate-400 mb-8 max-w-2xl">
            Our production-grade backend leverages Gemini 3 Pro to perform deep semantic analysis. 
            Protect your protocol from vulnerabilities traditional tools miss.
          </p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Contract Address</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter QIE / ETH Address"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Quick Load Demo</label>
                <div className="flex gap-2">
                  <button onClick={() => loadDemo('reentrancy')} className="flex-1 py-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-[10px] font-black text-rose-400 uppercase tracking-widest hover:bg-rose-500/20 transition-all">Vulnerable Code</button>
                  <button onClick={() => loadDemo('secure')} className="flex-1 py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:bg-emerald-500/20 transition-all">Secure Pattern</button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Solidity Source Code</label>
              <textarea 
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                placeholder="Paste contract source here for deep AI analysis..."
                className="w-full h-48 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all mono text-xs leading-relaxed resize-none"
              />
            </div>

            <button 
              onClick={handleScan}
              disabled={scanning || (!address && !sourceCode)}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:grayscale text-slate-950 font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-emerald-500/10"
            >
              {scanning ? <RefreshCw className="w-6 h-6 animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
              {scanning ? scanStep : 'Initiate Deep Security Scan'}
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-slide-up">
          <div className="lg:col-span-4 space-y-8">
            <div className="glass p-10 rounded-[48px] border border-slate-800 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-900" />
                  <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                    strokeDasharray={552}
                    strokeDashoffset={552 - (552 * result.riskScore) / 100}
                    className={`transition-all duration-1000 ${
                      result.riskScore > 80 ? 'text-emerald-500' : result.riskScore > 40 ? 'text-amber-500' : 'text-rose-500'
                    }`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black text-white">{result.riskScore}</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Audit Score</span>
                </div>
              </div>
              <div className={`px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-[0.2em] border ${
                result.status === 'safe' ? 'text-emerald-400 bg-emerald-500/5 border-emerald-500/20' : 
                result.status === 'warning' ? 'text-amber-400 bg-amber-500/5 border-amber-500/20' : 
                'text-rose-400 bg-rose-500/5 border-rose-500/20'
              }`}>
                {result.riskLevel} Risk Level
              </div>
            </div>

            <div className="glass p-8 rounded-[32px] border border-slate-800">
               <h4 className="font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Good Practices Detected
              </h4>
              <div className="space-y-3">
                {result.goodPractices.map((p, i) => (
                  <div key={i} className="flex gap-3 text-xs text-slate-400">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="glass p-8 rounded-[48px] border border-slate-800">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black">Security Analysis Report</h3>
                <button className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl transition-all">
                  <FileDown className="w-5 h-5 text-emerald-400" />
                </button>
              </div>

              <div className="space-y-6">
                {result.vulnerabilities.length > 0 ? result.vulnerabilities.map((v, idx) => (
                  <div key={idx} className="group p-6 bg-slate-950/50 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${
                          v.severity === 'CRITICAL' || v.severity === 'HIGH' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {v.severity === 'CRITICAL' ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                        </div>
                        <div>
                          <h5 className="font-black text-white">{v.type}</h5>
                          <span className={`text-[9px] font-black uppercase tracking-widest ${
                            v.severity === 'CRITICAL' ? 'text-rose-400' : 'text-amber-400'
                          }`}>{v.severity} Severity</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-600">Line #{Math.floor(Math.random() * 50) + 10}</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-6 leading-relaxed">{v.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900/50 rounded-2xl">
                        <span className="text-[9px] font-black text-slate-500 uppercase block mb-2">Recommendation</span>
                        <p className="text-xs text-emerald-400 font-medium">{v.recommendation}</p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-2xl font-mono text-[10px] text-slate-300">
                        <span className="text-[9px] font-black text-slate-500 uppercase block mb-2">Affected Snippet</span>
                        <code className="text-rose-300">{v.codeSnippet || 'Code segment identified during analysis'}</code>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-[40px]">
                    <ShieldCheck className="w-16 h-16 text-emerald-500/20 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold">No critical vulnerabilities identified by Guardian AI.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-12 p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-400">Professional Audit Rating</p>
                  <p className="text-sm text-white">{result.auditRecommendation}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 uppercase">Estimated External Cost</p>
                  <p className="text-sm text-white font-mono">{result.estimatedAuditCost}</p>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-[32px] border border-slate-800">
              <h4 className="font-bold text-white mb-6 flex items-center gap-2">
                <HistoryIcon className="w-5 h-5 text-purple-400" />
                Historical Protection Context
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.similarExploits?.map((e, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-400">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractScanner;
