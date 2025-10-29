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

// --- Buffer dei log in memoria ---
const logs = [];
const MAX_LOGS = 100;

// Override console.log per inviare log anche via socket e salvarli
const originalConsoleLog = console.log.bind(console);
console.log = (...args) => {
  const text = args.map(a => {
    if (typeof a === "string") return a;
    try { return JSON.stringify(a); } catch (e) { return String(a); }
  }).join(" ");

  const entry = { text, ts: new Date().toISOString() };

  // Salva in memoria (ultimi 100 log)
  logs.push(entry);
  if (logs.length > MAX_LOGS) logs.shift();

  // Output su terminale + invio via socket
  originalConsoleLog(text);
  io.emit("log", entry);
};

// --- Funzioni per parsing e formattazione ---
function parseNestedJSON(obj) {
  if (typeof obj === "string") {
    try {
      return parseNestedJSON(JSON.parse(obj));
    } catch {
      return obj; // non è JSON valido
    }
  } else if (Array.isArray(obj)) {
    return obj.map(parseNestedJSON);
  } else if (obj && typeof obj === "object") {
    const parsed = {};
    for (const [key, value] of Object.entries(obj)) {
      parsed[key] = parseNestedJSON(value);
    }
    return parsed;
  }
  return obj;
}

function cleanKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(cleanKeys);
  } else if (obj && typeof obj === "object") {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanKey = key.replace(/.*[\/#]/, ""); // rimuove prefissi URL
      cleaned[cleanKey] = cleanKeys(value);
    }
    return cleaned;
  }
  return obj;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderAsList(obj) {
  if (typeof obj !== "object" || obj === null) return `<span>${obj}</span>`;
  
  let html = "<ul style='list-style:none;padding-left:0;margin:0'>";
  
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === "object" && val !== null) {
      html += `<li><b>${key}:</b> ${renderAsList(val)}</li>`;
    } else {
      html += `<li><b>${key}:</b> <span>${val}</span></li>`;
    }
  }

  html += "</ul>";
  return html;
}

// --- Ethereum setup ---
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

// Usa il nodo Besu locale (porta 8545)
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

const CONTRACT_ADDRESS = "0xd9e5e9acdb6ef1afa4e23e4645c71b882cd63e4d";

const CONTRACT_ABI = [
  "function registerAsset(string assetId) external",
  "function getAsset(string assetId) external view returns (string id, address owner, uint256 timestamp)",
  "function isRegistered(string assetId) external view returns (bool)",
  "event AssetRegistered(address indexed owner, string assetId, uint256 timestamp)"
];



const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

// --- Funzione per leggere e loggare il balance ---
async function printBalance() {
  try {
    const balance = await provider.getBalance(wallet.address);
    const etherBalance = ethers.formatEther(balance);

    // ✅ Log completo visibile nel terminale e frontend
    console.log(`💰 Balance wallet (${wallet.address}): ${etherBalance} ETH`);

    // ✅ Invia evento separato per eventuale gestione frontend
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
  const parsedData = parseNestedJSON(req.body);
  const cleanedData = cleanKeys(parsedData);
  const prettyHtml = renderAsList(cleanedData);

  console.log("✅ Evento parsato e pulito:");
  console.dir(cleanedData, { depth: null, colors: true });

  const hash = crypto.createHash("sha256").update(JSON.stringify(cleanedData)).digest("hex");
  const txHash = "0x" + hash.substring(0, 16);


  const response = {
    status: "ok",
    txHash,
    receivedAt: new Date().toISOString(),
  };
  
  try {
  // 🔹 ID univoco ogni chiamata
  const assetId = "asset-" + Date.now();
  console.log(`📤 Registrazione asset ID: ${assetId}`);

  // 🔹 Pre-calcola gas come fa Remix (opzionale)
  const estimatedGas = await contract.registerAsset.estimateGas(assetId);
  console.log(`⛽ Gas stimato: ${estimatedGas.toString()}`);

  // 🔹 Invia la transazione usando il gas stimato
  const tx = await contract.registerAsset(assetId, {
    gasLimit: estimatedGas + 50000n // margine di sicurezza
  });

  console.log(`⏳ Transazione inviata: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log(`✅ Asset "${assetId}" registrato nel blocco ${receipt.blockNumber}`);

  // 🔹 Legge dal contratto per conferma
  const data = await contract.getAsset(assetId);
  console.log(`📄 Asset registrato:`, data);
} catch (err) {
  console.error("❌ Errore durante la registrazione asset:", err.shortMessage || err.message);
}

  io.emit("event", {
    ...cleanedData,
    response,
    ts: new Date().toISOString(),
    html: prettyHtml
  });

  res.json(response);
});

// --- Socket.IO connection ---
io.on("connection", (socket) => {
  console.log(`🔌 Nuova connessione socket: ${socket.id}`);

  // Invia i log recenti all'utente connesso
  socket.emit("log_history", logs);

  socket.on("ping", () => socket.emit("pong", { ts: new Date().toISOString() }));
});

// --- Avvio server ---
server.listen(PORT, () => {
  console.log(`🚀 Webhook + UI attivo su http://localhost:${PORT}/`);
  printBalance(); // stampa balance subito all'avvio

  // ✅ Aggiorna automaticamente ogni 60 secondi
  setInterval(printBalance, 120000);
});
