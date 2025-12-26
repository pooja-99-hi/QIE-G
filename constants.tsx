
import { Asset, ContractResult, Transaction, Validator, Threat, InsurancePool, User } from './types';

export const MOCK_PERSONAS: User[] = [
  { 
    name: 'Alex Sterling', 
    wallet: '0x742d...f44e', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    email: 'architect.sterling@guardian.io'
  },
  { 
    name: 'Elena Vance', 
    wallet: '0x992e...a211', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    email: 'vance.research@guardian.io'
  },
  { 
    name: 'Marcus Thorne', 
    wallet: '0x112b...cc88', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    email: 'commander.thorne@guardian.io'
  }
];

export const MOCK_USER = MOCK_PERSONAS[0];

export const MOCK_ASSETS: Asset[] = [
  { symbol: 'QIE', name: 'Qi Ethereum', balance: '12,450.00', value: 37350, change: 8.4, price: 3.00, icon: '🛡️', chain: 'QIE' },
  { symbol: 'ETH', name: 'Ethereum', balance: '1.45', value: 3625, change: -1.2, price: 2500, icon: '💎', chain: 'ETH' },
  { symbol: 'USDC', name: 'USD Coin', balance: '5,000.00', value: 5000, change: 0.01, price: 1.00, icon: '💵', chain: 'ETH' },
  { symbol: 'LINK', name: 'Chainlink', balance: '250.00', value: 4500, change: 12.5, price: 18.00, icon: '🔗', chain: 'ETH' },
  { symbol: 'AAVE', name: 'Aave', balance: '15.20', value: 1368, change: -4.3, price: 90.00, icon: '👻', chain: 'ETH' },
  { symbol: 'UNI', name: 'Uniswap', balance: '100.00', value: 750, change: 2.1, price: 7.50, icon: '🦄', chain: 'ETH' },
  { symbol: 'MATIC', name: 'Polygon', balance: '2,000.00', value: 1400, change: 5.6, price: 0.70, icon: '🟣', chain: 'POL' },
  { symbol: 'SOL', name: 'Solana', balance: '45.00', value: 6750, change: 15.8, price: 150.00, icon: '☀️', chain: 'BSC' },
];

export const MOCK_VALIDATORS: Validator[] = [
  { 
    address: 'qievaloper1x98jk293...',
    name: 'Genesis Node (Primary)', 
    apy: 12.8, 
    uptime: 99.99, 
    commission: 5, 
    staked: '4.5M QIE', 
    slashingCount: 0, 
    performanceScore: 98,
    riskLevel: 'LOW',
    isRecommended: true,
    pros: ['Official Genesis Partner', 'High Liquidity', 'Perfect Uptime'],
    cons: ['High Saturation'],
    estimatedRewards: '10.6 QIE/mo'
  },
  { 
    address: 'qievaloper1v9lshq22...',
    name: 'Guardian Secure Staking', 
    apy: 13.1, 
    uptime: 99.95, 
    commission: 4.5, 
    staked: '2.1M QIE', 
    slashingCount: 0, 
    performanceScore: 96,
    riskLevel: 'LOW',
    isRecommended: true,
    pros: ['Lowest Commission', 'Guardian Protocol Native', 'Fast Rewards'],
    cons: ['Newer Validator'],
    estimatedRewards: '10.9 QIE/mo'
  },
  { 
    address: 'qievaloper1z88mq021...',
    name: 'DeFi Fortress Ops', 
    apy: 11.9, 
    uptime: 100, 
    commission: 2, 
    staked: '8.9M QIE', 
    slashingCount: 0, 
    performanceScore: 94,
    riskLevel: 'LOW',
    isRecommended: false,
    pros: ['Maximum Uptime', 'Low Risk', 'Whale Preferred'],
    cons: ['Lower APY', 'Highly Saturated'],
    estimatedRewards: '9.9 QIE/mo'
  },
];

export const INSURANCE_POOLS: InsurancePool[] = [
  { id: 'p1', name: 'DeFi protocol Cover', tvl: '$124.5M', premiumRate: 0.85, maxPayout: '$1M', status: 'active', icon: '🏦' },
  { id: 'p2', name: 'Cross-chain Bridge Protection', tvl: '$88.2M', premiumRate: 1.25, maxPayout: '$5M', status: 'active', icon: '🌉' },
  { id: 'p3', name: 'NFT Marketplace Shield', tvl: '$42.1M', premiumRate: 0.45, maxPayout: '$250k', status: 'active', icon: '🎨' },
];

export const MOCK_CONTRACTS: ContractResult[] = [
  {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    name: 'Uniswap V3 Pool',
    riskScore: 92,
    riskLevel: 'SAFE',
    vulnerabilities: [],
    goodPractices: ['Verified Source', 'Audited by Trail of Bits'],
    lastScanned: '2024-05-20 14:30:00',
    status: 'safe'
  }
];

export const PENDING_TRANSACTIONS: Transaction[] = [
  { id: 'tx_1', type: 'Approval', target: '0x1234...5678', value: '0', amount: 'Unlimited USDC', risk: 'high', threats: ['Malicious phishing target detected', 'Infinite approval risk'], timestamp: '2m ago' },
  { id: 'tx_2', type: 'Transfer', target: '0xabcd...efgh', value: '0.5', amount: '0.5 ETH', risk: 'low', threats: [], timestamp: '5m ago' },
];

export const INITIAL_THREATS: Threat[] = [
  { id: 't1', type: 'Phishing', severity: 'high', message: 'Fake MetaMask update site detected at metamask-security.io', timestamp: '2m ago' },
  { id: 't2', type: 'Exploit', severity: 'high', message: 'Critical vulnerability reported in SushiSwap Router V2', timestamp: '15m ago' },
  { id: 't3', type: 'DDoS', severity: 'medium', message: 'Increased RPC latency on Polygon Mainnet', timestamp: '30m ago' },
];
