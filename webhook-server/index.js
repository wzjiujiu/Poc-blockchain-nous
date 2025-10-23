const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const http = require("http");
const { Server } = require("socket.io");
const { ethers } = require("ethers"); // ethers.js v6
require("dotenv").config();

const app = express();
const PORT = 3000;

// --- Server HTTP + Socket.IO ---
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Override console.log per inviare log anche via socket
const originalConsoleLog = console.log.bind(console);
console.log = (...args) => {
  const text = args.map(a => {
    if (typeof a === "string") return a;
    try { return JSON.stringify(a); } catch (e) { return String(a); }
  }).join(" ");
  originalConsoleLog(text);
  io.emit("log", { text, ts: new Date().toISOString() });
};

// --- Ethereum setup ---
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

if (!INFURA_PROJECT_ID || !WALLET_PRIVATE_KEY) {
  console.error("❌ Devi impostare INFURA_PROJECT_ID e WALLET_PRIVATE_KEY nel file .env");
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`);
const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

// Funzione per leggere balance
async function printBalance() {
  try {
    const balance = await provider.getBalance(wallet.address); // metodo corretto per v6
    const etherBalance = ethers.formatEther(balance);
    console.log(`💰 Balance wallet (${wallet.address}): ${etherBalance} ETH`);
    io.emit("balance", { address: wallet.address, balance: etherBalance });
  } catch (err) {
    console.log("❌ Errore nel leggere balance:", err.message);
  }
}

// --- Rotta principale ---
app.get("/", (req, res) => {
  res.sendFile(require("path").join(__dirname, "public", "index.html"));
});

// --- Webhook endpoint ---
app.post("/event", async (req, res) => {
  const { assetId, policy, manifest, timestamp } = req.body || {};

  console.log("✅ Ricevuto evento:", req.body);

  // Calcolo hash SHA-256
  const hash = crypto.createHash("sha256").update(JSON.stringify(req.body || {})).digest("hex");
  const txHash = "0x" + hash.substring(0, 16);

  // Stampa balance aggiornato
  await printBalance();

  const response = {
    status: "ok",
    assetId,
    txHash,
    receivedAt: new Date().toISOString(),
  };

  io.emit("event", { requestBody: req.body, response, ts: new Date().toISOString() });
  res.json(response);
});

// --- Socket.IO connection ---
io.on("connection", (socket) => {
  console.log(`🔌 Nuova connessione socket: ${socket.id}`);
  socket.on("ping", () => socket.emit("pong", { ts: new Date().toISOString() }));
});

// --- Avvio server ---
server.listen(PORT, () => {
  console.log(`🚀 Webhook + UI attivo su http://localhost:${PORT}/`);
  printBalance(); // stampa balance all'avvio
});
