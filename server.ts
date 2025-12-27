import express, { Request, Response, NextFunction } from 'express';
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

// AI Client - Uses environment variable as per guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Fixed middleware with correct NextFunction type
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ success: false, error: 'Invalid Token' });
  }
};

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { name } = req.body;
  const token = jwt.sign({ name, role: 'operator' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token, user: { name: name || 'Operator' } });
});

app.post('/api/scanner/scan', authMiddleware, async (req: Request, res: Response) => {
  const { sourceCode, address } = req.body;
  const ai = getAI();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Perform a deep security audit on this Solidity smart contract for the QIE Network. 
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
                  recommendation: { type: Type.STRING }
                }
              }
            },
            goodPractices: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["riskScore", "riskLevel", "vulnerabilities", "goodPractices"]
        }
      }
    });

    res.json({ success: true, report: JSON.parse(response.text || '{}') });
  } catch (err) {
    res.status(500).json({ success: false, error: 'AI Analysis Failed' });
  }
});

app.get('/api/validators', (req: Request, res: Response) => {
  res.json({ success: true, validators: MOCK_VALIDATORS });
});

io.on('connection', (socket) => {
  const threatInterval = setInterval(() => {
    socket.emit('new-threat', {
      id: Math.random().toString(36).substr(2, 9),
      type: 'DDoS',
      severity: 'medium',
      message: 'Unusual traffic detected on QIE RPC endpoint',
      timestamp: 'Just now'
    });
  }, 15000);

  socket.on('disconnect', () => clearInterval(threatInterval));
});

server.listen(PORT, () => {
  console.log(`Guardian Backend running on port ${PORT}`);
});
