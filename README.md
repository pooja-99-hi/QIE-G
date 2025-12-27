# 🛡️ QIE Guardian Protocol
> **The Real-Time Semantic Security & Intelligence Layer for the QIE Network.**

QIE Guardian is an institutional-grade security platform designed to close the "latency gap" in Web3 security. By combining real-time transaction interception with the **QIE Semantic Intelligence Engine (QSIE)**, we provide a proactive defense mechanism for assets on the QIE Mainnet.

---

### 🚀 Submission Links
*   **📺 Video Demo:** [Watch on YouTube](https://youtube.com/YOUR_VIDEO_LINK)
*   **🌐 Live DApp:** [View on Vercel](https://qie-guardian.vercel.app)
*   **📂 Source Code:** [GitHub Repository](https://github.com/YOUR_USER/qie-guardian)

---

## 🏗️ System Architecture
The protocol is built on a three-tier "Glass Layer" architecture, ensuring total isolation between the User Interface, the Intelligence Core, and the Blockchain Layer.

**Interactive Diagram:** Navigate to the `Architecture` tab within the application to view the live, animated system map.

1.  **Observability Layer (Frontend):** High-performance React 19 dashboard providing real-time telemetry and user-intent capture.
2.  **Intelligence Layer (QSIE Engine):** The "Brain" of the protocol. Powered by **Google Gemini 1.5 Pro**, it performs deep semantic analysis of contract bytecode and transaction payloads.
3.  **Settlement Layer (QIE Mainnet):** Direct integration with QIE RPC nodes for real-time state monitoring and transaction simulation.

---

## 🛠️ QIE Platform Integration
*   **QIE RPC Direct Stream:** We utilize QIE's high-speed RPC endpoints to feed raw mempool data into our firewall.
*   **QIE EVM Bytecode Analysis:** Our scanner is optimized for the specific opcodes and gas-optimizations used in the QIE EVM environment.
*   **QIE Validator Security Mesh:** We monitor validator health and consensus participation to provide a "Network Health Score".
*   **QIE Multi-Sig Integration:** Native support for QIE-based multi-sig wallets for semantic rule enforcement.

---

## ⚙️ Setup & Installation

### 1. Prerequisites
Before running the protocol, ensure you have:
*   **Node.js** (v18 or higher)
*   **Docker & Docker Compose** (for full stack deployment)
*   **Google Gemini API Key** (Required for the Semantic Engine)

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3001
API_KEY=your_gemini_api_key_here
JWT_SECRET=qie_guardian_secure_jwt_2024
QIE_RPC_URL=https://rpc.qie.network
NODE_ENV=development
```

### 3. Quick Start (Local)
```bash
# Install dependencies
npm install

# Start the development server (Frontend + Backend)
npm run dev
```
The app will be available at `http://localhost:8080` (Client) and `http://localhost:3001` (API).

### 4. Docker Deployment (Recommended)
```bash
docker-compose up --build
```

---

## 📖 How To Use

### Step 1: Authentication
Launch the app and click **"Launch App"**. You will be prompted to connect via the **Web3 Wallet Bridge**. The demo includes three rotating personas (Architect, Researcher, Commander) to showcase different permission levels.

### Step 2: Contract Auditing
1. Navigate to the **Contract Scanner** tab.
2. Paste a Solidity contract or select a **Template** (e.g., "Exploit Pattern").
3. Click **"Initiate Deep Semantic Audit"**.
4. Review the AI-generated risk score and specific vulnerability markers.

### Step 3: Transaction Firewall
1. Navigate to the **TX Firewall** tab.
2. Click **"Simulate New Tx"** to trigger a mock transaction request.
3. Click **"Deep Scan Now"** to let the Gemini engine analyze the transaction intent.
4. Based on the "Action" recommendation (ALLOW/BLOCK), choose to Approve or Reject.

---

## 📋 User End Requirements
To fully test the production features, the user/judge must provide:
1.  **Google Gemini API Key:** Essential for the `QSIE Engine`. Without this, the semantic analysis tabs will return an error. [Get a key here](https://aistudio.google.com/).
2.  **Stable Internet:** To maintain the WebSocket connection for the **Live Threat Feed**.
3.  **Metamask/QIE Wallet:** (Optional for Demo) While the demo uses mock auth, the system is ready for `web3.js` injection.

---

## 👨‍💻 Developed By
**Team E-FDT** — *Securing the Future of QIE.*
