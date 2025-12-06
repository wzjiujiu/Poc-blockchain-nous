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
const Asset='http://localhost:11000/api/management/v3/assets';
const Policy='http://localhost:11000/api/management/v3/policydefinitions';

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

const CONTRACT_ADDRESS = "0xd0fc4e931b6d67bcecc65c2afec2faa278d0d769";

const CONTRACT_ABI = [
  "function registerAsset(string assetId, string assetTitle) external",
  "function getAsset(string assetId) external view returns (string id, address owner, uint256 timestamp, string title)",
  "function isRegistered(string assetId) external view returns (bool)",
  "event AssetRegistered(address indexed owner, string assetId, uint256 timestamp, string title)",
  "function modifyAsset(string assetId, string newTitle) external"
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

function extractPolicyInfo(cleanedData) {
  const body = cleanedData.request?.body || {};

  const id = body["@id"] || body.id || null;

  const constraints =
    body.policy?.permission?.[0]?.constraint || [];

  const timeConstraints = constraints
    .filter(c => c.leftOperand === "POLICY_EVALUATION_TIME")
    .map(c => c.rightOperand);

  const time1 = timeConstraints[0] || null;
  const time2 = timeConstraints[1] || null;

  return { id, time1, time2 };
}

// --- Webhook endpoint ---
app.post("/event", async (req, res) => {
  try {
    // 1. Parsing e normalizzazione dati
    const parsedData = parseNestedJSON(req.body);
    const cleanedData = cleanKeys(parsedData);
    const prettyHtml = renderAsList(cleanedData);

    let assetId = "";
    let assetTitle="";
    let transactionId = "";
    let policiesId = "";
    let method="";

    // Estrae la porta dalla request EDC (che NON è mai una URL completa)
    const rawPort = cleanedData.request?.port;
    const normalizedPort = rawPort?.toString().match(/\d{4,5}/)?.[0]; // estrae "11000"
    method=cleanedData.request?.method;
    assetId = cleanedData.response?.['@id'];
    assetTitle=cleanedData.request?.body?.properties?.title;

    console.log("📥 Evento ricevuto");
    console.log("Raw port:", rawPort);
    console.log("Normalized port:", normalizedPort);
    console.log("Asset ID:", assetId);

    // Prepara hash risposta
    const hash = crypto
      .createHash("sha256")
      .update(JSON.stringify(cleanedData))
      .digest("hex");

    const txHash = "0x" + hash.substring(0, 16);

    const response = {
      status: "ok",
      txHash,
      receivedAt: new Date().toISOString(),
    };

    //
    // 2. LOGICA PER ASSET CONSUMER (PORTA 11000)
    //
    if (normalizedPort === "11000") {
      console.log("📡 Evento proveniente dal CONSUMER (11000)");
      console.dir(cleanedData, { depth: null, colors: true });

      if(rawPort==Asset&&method=='POST')
      {
        try {
        const newAssetId =assetId.toString();

        console.log(`📤 Registrazione asset ID: ${newAssetId}`);

        const estimatedGas = await contract.registerAsset.estimateGas(newAssetId, assetTitle);
        console.log(`⛽ Gas stimato: ${estimatedGas.toString()}`);

        const tx = await contract.registerAsset(newAssetId, assetTitle,{
          gasLimit: estimatedGas + 50000n, // margine di sicurezza
        });

        console.log(`⏳ Transazione inviata: ${tx.hash}`);

        const receipt = await tx.wait();
        console.log(`✅ Asset "${newAssetId}" registrato nel blocco ${receipt.blockNumber}`);

        const data = await contract.getAsset(newAssetId);
        console.log(`📄 Asset registrato:`, data);
       } catch (err) {
        console.error("❌ Errore durante la registrazione asset (consumer):", err);
       }
      }
      else if(rawPort==Asset&&method=='PUT')
      {
      try {
        assetId=cleanedData.request?.body?.properties?.id;
        const newAssetId =assetId.toString();

        console.log(`📤 cerco ID nel chain : ${newAssetId}`);

        const data = await contract.getAsset(newAssetId);
        console.log(`📄 Asset trovato:`, data);
		let newAssetTitle=cleanedData.request?.body?.properties?.title;
		
		const estimatedGas = await contract.modifyAsset.estimateGas(newAssetId, newAssetTitle);
        console.log(`⛽ Gas stimato: ${estimatedGas.toString()}`);

        const tx = await contract.modifyAsset(newAssetId, newAssetTitle,{
          gasLimit: estimatedGas + 50000n, // margine di sicurezza
        });
		const receipt = await tx.wait();
		console.log(`✅ Asset "${newAssetId}" modificato nel blocco ${receipt.blockNumber}`);
		
		const datamodificato = await contract.getAsset(newAssetId);
        console.log(`📄 Asset modificato:`, datamodificato);
       } catch (err) {
        console.error("❌ Errore durante la registrazione asset (consumer):", err);
       }

      }
	  else if (rawPort==Policy&&method=='POST')
	  {
		  console.log("i am here");
		  const { id: policyid, time1, time2 } = extractPolicyInfo(cleanedData);

          console.log("policyid:", policyid);
          console.log("time1:", time1);
          console.log("time2:", time2);
		  const timePolicy = (time1 && time2) ? true : false;
		  try {
                 const newpolicyid =policyid.toString();
				 
				 if(timePolicy==true){
			      console.log(`📤 Registrazione poliicy ID: ${newpolicyid}`);
				 

                  const estimatedGas = await contract.registerAsset.estimateGas(newAssetId, assetTitle);
                  console.log(`⛽ Gas stimato: ${estimatedGas.toString()}`);

                  const tx = await contract.registerAsset(newAssetId, assetTitle,{gasLimit: estimatedGas + 50000n, // margine di sicurezza
				 });

                  console.log(`⏳ Transazione inviata: ${tx.hash}`);

                  const receipt = await tx.wait();
                  console.log(`✅ Asset "${newAssetId}" registrato nel blocco ${receipt.blockNumber}`);

                  const data = await contract.getAsset(newAssetId);
                  console.log(`📄 Asset registrato:`, data);
					 
				 }
				 else{
			      console.log(`📤 Registrazione poliicy ID: ${newpolicyid}`);
				 

                  const estimatedGas = await contract.registerAsset.estimateGas(newAssetId, assetTitle);
                  console.log(`⛽ Gas stimato: ${estimatedGas.toString()}`);

                  const tx = await contract.registerAsset(newAssetId, assetTitle,{gasLimit: estimatedGas + 50000n, // margine di sicurezza
				  });

                  console.log(`⏳ Transazione inviata: ${tx.hash}`);

                  const receipt = await tx.wait();
                  console.log(`✅ Asset "${newAssetId}" registrato nel blocco ${receipt.blockNumber}`);

                  const data = await contract.getAsset(newAssetId);
                  console.log(`📄 Asset registrato:`, data);
				 }


                } catch (err) {
                   console.error("❌ Errore durante la registrazione asset (consumer):", err);
                }
	  }
	  

      // Invio aggiornamento realtime
      io.emit("event", {
        ...cleanedData,
        response,
        ts: new Date().toISOString(),
        html: prettyHtml,
      });

      return res.json(response);
    }

    //
    // 3. LOGICA PER ASSET PROVIDER (PORTA 22000)
    //
    if (normalizedPort === "22000") {
      console.log("📡 Evento proveniente dal PROVIDER (22000)");
      console.dir(cleanedData, { depth: null, colors: true });

      try {
        const newAssetId = "asset-" + Date.now();

        console.log(`📤 Registrazione asset ID: ${newAssetId}`);

        const estimatedGas = await contract.registerAsset.estimateGas(newAssetId);
        console.log(`⛽ Gas stimato: ${estimatedGas.toString()}`);

        const tx = await contract.registerAsset(newAssetId, {
          gasLimit: estimatedGas + 50000n,
        });

        console.log(`⏳ Transazione inviata: ${tx.hash}`);

        const receipt = await tx.wait();
        console.log(`✅ Asset "${newAssetId}" registrato nel blocco ${receipt.blockNumber}`);

        const data = await contract.getAsset(newAssetId);
        console.log(`📄 Asset registrato:`, data);
      } catch (err) {
        console.error("❌ Errore durante la registrazione asset (provider):", err);
      }

      io.emit("event", {
        ...cleanedData,
        response,
        ts: new Date().toISOString(),
        html: prettyHtml,
      });

      return res.json(response);
    }

    //
    // 4. PORTA NON RICONOSCIUTA
    //
    console.warn("⚠️ Nessuna logica definita per questa porta:", normalizedPort);

    io.emit("event", {
      ...cleanedData,
      response,
      ts: new Date().toISOString(),
      html: prettyHtml,
    });

    return res.json(response);

  } catch (err) {
    console.error("❌ Errore interno nell'handler /event:", err);

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
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
