
import express, { Request, Response, NextAction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  MOCK_VALIDATORS, 
  INSURANCE_POOLS, 
  MOCK_ASSETS, 
  PENDING_TRANSACTIONS, 
  INITIAL_THREATS 
} from './constants';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'guardian_protocol_2024_secret';

// AI Client
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Auth Middleware
const authMiddleware = (req: Request, res: Response, next: NextAction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ success: false, error: 'Invalid Token' });
  }
};

// --- AUTH ENDPOINTS ---
app.post('/api/auth/login', (req, res) => {
  const { walletAddress } = req.body;
  const token = jwt.sign({ wallet: walletAddress, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token, user: { name: 'Demo User', wallet: walletAddress } });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: (req as any).user });
});

// --- SCANNER ENDPOINTS ---
app.post('/api/scanner/scan', authMiddleware, async (req, res) => {
  const { sourceCode, address } = req.body;
  const ai = getAI();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Perform a deep security audit on this Solidity smart contract. 
      Address: ${address}
      Source Code: ${sourceCode}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.INTEGER },
            riskLevel: { type: Type.STRING },
            vulnerabilities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  severity: { type: Type.STRING },
                  description: { type: Type.STRING },
                  recommendation: { type: Type.STRING },
                  codeSnippet: { type: Type.STRING }
                }
              }
            },
            goodPractices: { type: Type.ARRAY, items: { type: Type.STRING } },
            similarExploits: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const report = JSON.parse(response.text || '{}');
    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, error: 'AI Analysis Failed' });
  }
});

// --- FIREWALL ENDPOINTS ---
app.post('/api/firewall/analyze', authMiddleware, async (req, res) => {
  const { tx } = req.body;
  const ai = getAI();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze this transaction for high-risk patterns.
      To: ${tx.target}
      Value: ${tx.amount}
      Data: ${tx.data || '0x'}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            totalRisk: { type: Type.INTEGER },
            riskLevel: { type: Type.STRING },
            action: { type: Type.STRING },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            checks: {
              type: Type.OBJECT,
              properties: {
                addressSafety: { type: Type.OBJECT, properties: { status: { type: Type.STRING }, details: { type: Type.STRING } } },
                contractSafety: { type: Type.OBJECT, properties: { status: { type: Type.STRING }, details: { type: Type.STRING } } }
              }
            }
          }
        }
      }
    });

    res.json({ success: true, analysis: JSON.parse(response.text || '{}') });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Transaction analysis failed' });
  }
});

// --- VALIDATORS ENDPOINTS ---
app.get('/api/validators', (req, res) => {
  res.json({ success: true, validators: MOCK_VALIDATORS });
});

// --- PORTFOLIO ENDPOINTS ---
app.get('/api/portfolio', authMiddleware, (req, res) => {
  res.json({ success: true, assets: MOCK_ASSETS });
});

// --- INSURANCE ENDPOINTS ---
app.get('/api/insurance/pools', (req, res) => {
  res.json({ success: true, pools: INSURANCE_POOLS });
});

// Socket.io Real-time threat feed simulation
io.on('connection', (socket) => {
  console.log('Client connected for real-time monitoring');
  
  const threatInterval = setInterval(() => {
    const newThreat = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'DDoS',
      severity: 'medium',
      message: 'Unusual traffic detected on QIE RPC endpoint',
      timestamp: 'Just now'
    };
    socket.emit('new-threat', newThreat);
  }, 15000);

  socket.on('disconnect', () => {
    clearInterval(threatInterval);
  });
});

server.listen(PORT, () => {
  console.log(`Guardian Backend running on port ${PORT}`);
});
