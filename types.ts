
export interface Asset {
  symbol: string;
  name: string;
  balance: string;
  value: number;
  change: number;
  price: number;
  icon: string;
  chain: 'QIE' | 'ETH' | 'BSC' | 'POL';
}

export interface Vulnerability {
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  line?: number;
  description: string;
  recommendation: string;
  codeSnippet?: string;
  exploitExample?: string;
}

export interface ContractResult {
  address: string;
  name: string;
  riskScore: number;
  riskLevel: 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  vulnerabilities: Vulnerability[];
  goodPractices: string[];
  lastScanned: string;
  status: 'safe' | 'warning' | 'critical';
  similarExploits?: string[];
  auditRecommendation?: string;
  estimatedAuditCost?: string;
}

export interface TransactionCheck {
  score: number;
  status: 'SAFE' | 'CAUTION' | 'DANGER';
  details: string;
}

export interface TransactionAnalysis {
  totalRisk: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  checks: {
    addressSafety: TransactionCheck;
    contractSafety: TransactionCheck;
    priceAnalysis: TransactionCheck;
    gasOptimization: TransactionCheck;
  };
  warnings: string[];
  recommendations: string[];
  action: 'ALLOW' | 'WARN' | 'BLOCK';
}

export interface Transaction {
  id: string;
  type: 'Approval' | 'Transfer' | 'Interaction';
  target: string;
  from?: string;
  data?: string;
  value: string;
  amount: string;
  risk: 'low' | 'medium' | 'high';
  threats?: string[];
  timestamp: string;
  status?: 'pending' | 'approved' | 'rejected' | 'analyzing';
  analysis?: TransactionAnalysis;
}

export interface Validator {
  address: string;
  name: string;
  apy: number;
  uptime: number;
  commission: number;
  staked: string;
  slashingCount: number;
  performanceScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  isRecommended: boolean;
  pros: string[];
  cons: string[];
  estimatedRewards: string;
}

export interface Threat {
  id: string;
  type: 'DDoS' | 'Phishing' | 'Flashloan' | 'Liquidity' | 'Exploit';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
}

export interface InsurancePool {
  id: string;
  name: string;
  tvl: string;
  premiumRate: number;
  maxPayout: string;
  status: 'active' | 'auditing';
  icon: string;
}

export interface User {
  name: string;
  wallet: string;
  avatar: string;
  email?: string;
}
