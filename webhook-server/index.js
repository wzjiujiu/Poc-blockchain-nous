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
    const balance = await provider.getBalance(wallet.address);
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
  const parsedData = parseNestedJSON(req.body);
  const cleanedData = cleanKeys(parsedData);
  const prettyHtml = renderAsList(cleanedData);

  console.log("✅ Evento parsato e pulito:");
  console.dir(cleanedData, { depth: null, colors: true });

  const hash = crypto.createHash("sha256").update(JSON.stringify(cleanedData)).digest("hex");
  const txHash = "0x" + hash.substring(0, 16);

  await printBalance();

  const response = {
    status: "ok",
    txHash,
    receivedAt: new Date().toISOString(),
  };

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
  socket.on("ping", () => socket.emit("pong", { ts: new Date().toISOString() }));
});

// --- Avvio server ---
server.listen(PORT, () => {
  console.log(`🚀 Webhook + UI attivo su http://localhost:${PORT}/`);
  printBalance();
});
