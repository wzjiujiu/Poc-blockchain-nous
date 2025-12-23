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
const DataOffer='http://localhost:11000/api/management/v3/contractdefinitions';

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

  // ───────────── Initialization ─────────────
  "function initialize(address roleManagerAddress, address upgradeControlAddress) external",

  // ───────────── Asset ─────────────
  "function registerAsset(bytes32 nodeId, string assetId, string assetTitle) external",
  "function modifyAsset(bytes32 nodeId, string assetId, string newTitle) external",
  "function getAsset(bytes32 nodeId, string assetId) external view returns (string id, bytes32 nId, address registrar, uint256 timestamp, string title)",
  "function assetExists(bytes32 nodeId, string assetId) external view returns (bool)",

  // ───────────── Policy ─────────────
  "function registerPolicy(bytes32 nodeId, string policyId, string policyTitle) external",
  "function modifyPolicy(bytes32 nodeId, string policyId, string newTitle) external",
  "function getPolicy(bytes32 nodeId, string policyId) external view returns (string id, bytes32 nId, address registrar, uint256 timestamp, string title)",
  "function policyExists(bytes32 nodeId, string policyId) external view returns (bool)",

  // ───────────── Data Offer ─────────────
  "function registerDataoffer(bytes32 nodeId, string offerId, string accessPolicyId, string contractPolicyId, string assetSelector) external",
  "function modifyDataoffer(bytes32 nodeId, string offerId, string newaccessPolicyId, string newcontractPolicyId, string newassetSelector) external",
  "function getDataoffer(bytes32 nodeId, string offerId) external view returns (string id, bytes32 nId, address registrar, uint256 timestamp, string accessPolicyId, string contractPolicyId, string assetSelector)",
  "function dataofferExists(bytes32 nodeId, string offerId) external view returns (bool)",

  // ───────────── Events ─────────────
  "event AssetRegistered(address indexed registrar, bytes32 indexed nodeId, string assetId, uint256 timestamp, string title)",
  "event AssetModified(bytes32 indexed nodeId, string assetId, uint256 timestamp, string newTitle)",

  "event PolicyRegistered(address indexed registrar, bytes32 indexed nodeId, string policyId, uint256 timestamp, string title)",
  "event PolicyModified(bytes32 indexed nodeId, string policyId, uint256 timestamp, string newTitle)",

  "event DataofferRegistered(address indexed registrar, bytes32 indexed nodeId, string offerId, uint256 timestamp, string accessPolicyId, string contractPolicyId, string assetSelector)",
  "event DataofferModified(bytes32 indexed nodeId, string offerId, uint256 timestamp, string newaccessPolicyId, string newcontractPolicyId, string newassetSelector)"
];


const NODE_ID_CONSUMER = ethers.keccak256(
  ethers.toUtf8Bytes("localhost:11000")
);

const NODE_ID_PRODUCER = ethers.keccak256(
  ethers.toUtf8Bytes("localhost:22000")
);


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

function extractContractDefinitionInfo(cleanedData) {
  const body = cleanedData?.request?.body;

  if (!body) {
    throw new Error("Request body mancante");
  }

  // 1️⃣ accessPolicyId
  const accessPolicyId = body.accessPolicyId
    ? body.accessPolicyId.toString()
    : null;

  // 2️⃣ contractPolicyId
  const contractPolicyId = body.contractPolicyId
    ? body.contractPolicyId.toString()
    : null;

  // 3️⃣ assetSelector (ASSET + operator + operandRight)
  let assetSelector = null;

  if (Array.isArray(body.assetsSelector) && body.assetsSelector.length > 0) {
    const criterion = body.assetsSelector[0];

    const operator = criterion.operator?.toString() || "";
    const operandRight = criterion.operandRight?.toString() || "";

    assetSelector = `ASSET${operator}${operandRight}`;
  }

  return [accessPolicyId, contractPolicyId, assetSelector];
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

  /* ======================= ASSET POST ======================= */
  if (rawPort == Asset && method === "POST") {
    try {
      const newAssetId = assetId.toString();

      console.log(`📤 Registrazione asset ID: ${newAssetId}`);

      const estimatedGas = await contract.registerAsset.estimateGas(
        NODE_ID_CONSUMER,
        newAssetId,
        assetTitle
      );

      console.log(`⛽ Gas stimato: ${estimatedGas}`);

      const tx = await contract.registerAsset(
        NODE_ID_CONSUMER,
        newAssetId,
        assetTitle,
        { gasLimit: estimatedGas + 50_000n }
      );

      console.log(`⏳ Transazione inviata: ${tx.hash}`);
      const receipt = await tx.wait();

      console.log(`✅ Asset "${newAssetId}" registrato nel blocco ${receipt.blockNumber}`);

      const data = await contract.getAsset(NODE_ID_CONSUMER, newAssetId);
      console.log("📄 Asset registrato:", data);

    } catch (err) {
      console.error("❌ Errore durante la registrazione asset (consumer):", err);
    }
  }

  /* ======================= ASSET PUT ======================= */
  else if (rawPort == Asset && method === "PUT") {
    try {
      const newAssetId = cleanedData.request?.body?.properties?.id?.toString();
      const newAssetTitle = cleanedData.request?.body?.properties?.title;

      console.log(`📤 Modifica asset ID: ${newAssetId}`);

      const data = await contract.getAsset(NODE_ID_CONSUMER, newAssetId);
      console.log("📄 Asset trovato:", data);

      const estimatedGas = await contract.modifyAsset.estimateGas(
        NODE_ID_CONSUMER,
        newAssetId,
        newAssetTitle
      );

      const tx = await contract.modifyAsset(
        NODE_ID_CONSUMER,
        newAssetId,
        newAssetTitle,
        { gasLimit: estimatedGas + 50_000n }
      );

      const receipt = await tx.wait();
      console.log(`✅ Asset "${newAssetId}" modificato nel blocco ${receipt.blockNumber}`);

      const updated = await contract.getAsset(NODE_ID_CONSUMER, newAssetId);
      console.log("📄 Asset modificato:", updated);

    } catch (err) {
      console.error("❌ Errore durante la modifica asset (consumer):", err);
    }
  }

  /* ======================= POLICY POST ======================= */
  else if (rawPort == Policy && method === "POST") {
    console.log("📤 Registrazione policy (consumer)");

    const { id: policyid, time1, time2 } = extractPolicyInfo(cleanedData);
    const newPolicyId = policyid.toString();

    let policyContent = "";
    if (time1 && time2) {
      policyContent = `${time1}&${time2}`;
    }

    try {
      const estimatedGas = await contract.registerPolicy.estimateGas(
        NODE_ID_CONSUMER,
        newPolicyId,
        policyContent
      );

      console.log(`⛽ Gas stimato: ${estimatedGas}`);

      const tx = await contract.registerPolicy(
        NODE_ID_CONSUMER,
        newPolicyId,
        policyContent,
        { gasLimit: estimatedGas + 50_000n }
      );

      console.log(`⏳ Transazione inviata: ${tx.hash}`);
      const receipt = await tx.wait();

      console.log(`✅ Policy "${newPolicyId}" registrata nel blocco ${receipt.blockNumber}`);

      const data = await contract.getPolicy(NODE_ID_CONSUMER, newPolicyId);
      console.log("📄 Policy registrata:", data);

    } catch (err) {
      console.error("❌ Errore durante la registrazione Policy (consumer):", err);
    }
  }
  /* ======================= POLICY PUT ======================= */
  else if(method === "PUT" && rawPort.startsWith(Policy)){
    console.log("✏️ Modifica policy (consumer)");

  try {
    const policyId = cleanedData.request?.body?.['@id']
      || cleanedData.request?.body?.id;

    if (!policyId) {
      throw new Error("Policy ID non trovato nella richiesta");
    }

    const newPolicyId = policyId.toString();

    const { time1, time2 } = extractPolicyInfo(cleanedData);

    let newPolicyContent = "";
    if (time1 && time2) {
      newPolicyContent = `${time1}&${time2}`;
    }

    console.log(`📤 Cerco policy ID: ${newPolicyId}`);

    // Verifica esistenza
    const existing = await contract.getPolicy(
      NODE_ID_CONSUMER,
      newPolicyId
    );
    console.log("📄 Policy trovata:", existing);

    // Gas estimation
    const estimatedGas = await contract.modifyPolicy.estimateGas(
      NODE_ID_CONSUMER,
      newPolicyId,
      newPolicyContent
    );

    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    // Transazione
    const tx = await contract.modifyPolicy(
      NODE_ID_CONSUMER,
      newPolicyId,
      newPolicyContent,
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ Policy "${newPolicyId}" modificata nel blocco ${receipt.blockNumber}`);

    // Verifica finale
    const updated = await contract.getPolicy(
      NODE_ID_CONSUMER,
      newPolicyId
    );
    console.log("📄 Policy modificata:", updated);

  } catch (err) {
    console.error("❌ Errore durante la modifica Policy (consumer):", err);
  }
  }
  /* ======================= DATAOFFER POST ======================= */
  else if(rawPort==DataOffer&& method=='POST')
  {
   const [accessPolicyId, contractPolicyId, assetSelector] = extractContractDefinitionInfo(cleanedData);
   console.log(accessPolicyId)
   console.log(contractPolicyId)
   console.log(assetSelector)
   try {

      dataofferid = cleanedData.response?.['@id'];


      const newDataofferid  = dataofferid.toString();

      console.log(`📤 Registrazione data offer ID: ${newDataofferid}`);

      const estimatedGas = await contract.registerDataoffer.estimateGas(
        NODE_ID_CONSUMER,
        newDataofferid,
        accessPolicyId,
        contractPolicyId,
        assetSelector
      );

      console.log(`⛽ Gas stimato: ${estimatedGas}`);

      const tx = await contract.registerDataoffer(
        NODE_ID_CONSUMER,
        newDataofferid,
         accessPolicyId,
        contractPolicyId,
        assetSelector,
        { gasLimit: estimatedGas + 50_000n }
      );

      console.log(`⏳ Transazione inviata: ${tx.hash}`);
      const receipt = await tx.wait();

      console.log(`✅ Dataoffer "${newDataofferid}" registrato nel blocco ${receipt.blockNumber}`);

      const data = await contract.getDataoffer(NODE_ID_CONSUMER, newDataofferid);
      console.log("📄 Dataoffer registrato:", data);

    } catch (err) {
      console.error("❌ Errore durante la registrazione Data offer (consumer):", err);
    }


  }
  else if(rawPort==DataOffer&& method=='PUT')
  {
      try {
    /* ======================= ID ======================= */
    const dataofferId =
      cleanedData.request?.body?.['@id'] ||
      rawPort.split("/").pop();

    if (!dataofferId) {
      throw new Error("DataOffer ID non trovato");
    }

    const newDataofferId = dataofferId.toString();

    /* ======================= CONTENUTO ======================= */
    const [
      newAccessPolicyId,
      newContractPolicyId,
      newAssetSelector
    ] = extractContractDefinitionInfo(cleanedData);

    console.log("📄 Nuovi valori DataOffer:");
    console.log("accessPolicyId:", newAccessPolicyId);
    console.log("contractPolicyId:", newContractPolicyId);
    console.log("assetSelector:", newAssetSelector);

    /* ======================= CHECK ESISTENZA ======================= */
    const existing = await contract.getDataoffer(
      NODE_ID_CONSUMER,
      newDataofferId
    );

    console.log("📄 DataOffer trovato:", existing);

    /* ======================= GAS ======================= */
    const estimatedGas = await contract.modifyDataoffer.estimateGas(
      NODE_ID_CONSUMER,
      newDataofferId,
      newAccessPolicyId,
      newContractPolicyId,
      newAssetSelector
    );

    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    /* ======================= TX ======================= */
    const tx = await contract.modifyDataoffer(
      NODE_ID_CONSUMER,
      newDataofferId,
      newAccessPolicyId,
      newContractPolicyId,
      newAssetSelector,
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ DataOffer "${newDataofferId}" modificato nel blocco ${receipt.blockNumber}`);

    /* ======================= VERIFY ======================= */
    const updated = await contract.getDataoffer(
      NODE_ID_CONSUMER,
      newDataofferId
    );

    console.log("📄 DataOffer aggiornato:", updated);

  } catch (err) {
    console.error("❌ Errore durante la modifica DataOffer (consumer):", err);
  }
  }

  /* ======================= EMIT EVENT ======================= */
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
  console.log("📡 Evento proveniente dal PRODUCER (22000)");
  console.dir(cleanedData, { depth: null, colors: true });

  /* ======================= ASSET POST ======================= */
  if (rawPort == Asset && method === "POST") {
    try {
      const newAssetId = assetId.toString();

      console.log(`📤 Registrazione asset ID (producer): ${newAssetId}`);

      const estimatedGas = await contract.registerAsset.estimateGas(
        NODE_ID_PRODUCER,
        newAssetId,
        assetTitle
      );

      const tx = await contract.registerAsset(
        NODE_ID_PRODUCER,
        newAssetId,
        assetTitle,
        { gasLimit: estimatedGas + 50_000n }
      );

      console.log(`⏳ Transazione inviata: ${tx.hash}`);
      const receipt = await tx.wait();

      console.log(`✅ Asset "${newAssetId}" registrato nel blocco ${receipt.blockNumber}`);

      const data = await contract.getAsset(NODE_ID_PRODUCER, newAssetId);
      console.log("📄 Asset registrato:", data);

    } catch (err) {
      console.error("❌ Errore durante la registrazione asset (producer):", err);
    }
  }

  /* ======================= ASSET PUT ======================= */
  else if (rawPort == Asset && method === "PUT") {
    try {
      const newAssetId = cleanedData.request?.body?.properties?.id?.toString();
      const newAssetTitle = cleanedData.request?.body?.properties?.title;

      console.log(`📤 Modifica asset ID (producer): ${newAssetId}`);

      const estimatedGas = await contract.modifyAsset.estimateGas(
        NODE_ID_PRODUCER,
        newAssetId,
        newAssetTitle
      );

      const tx = await contract.modifyAsset(
        NODE_ID_PRODUCER,
        newAssetId,
        newAssetTitle,
        { gasLimit: estimatedGas + 50_000n }
      );

      const receipt = await tx.wait();
      console.log(`✅ Asset "${newAssetId}" modificato nel blocco ${receipt.blockNumber}`);

      const updated = await contract.getAsset(NODE_ID_PRODUCER, newAssetId);
      console.log("📄 Asset modificato:", updated);

    } catch (err) {
      console.error("❌ Errore durante la modifica asset (producer):", err);
    }
  }

  /* ======================= POLICY POST ======================= */
  else if (rawPort == Policy && method === "POST") {
    console.log("📤 Registrazione policy (producer)");

    const { id: policyid, time1, time2 } = extractPolicyInfo(cleanedData);
    const newPolicyId = policyid.toString();

    let policyContent = "";
    if (time1 && time2) {
      policyContent = `${time1}&${time2}`;
    }

    try {
      const estimatedGas = await contract.registerPolicy.estimateGas(
        NODE_ID_PRODUCER,
        newPolicyId,
        policyContent
      );

      const tx = await contract.registerPolicy(
        NODE_ID_PRODUCER,
        newPolicyId,
        policyContent,
        { gasLimit: estimatedGas + 50_000n }
      );

      console.log(`⏳ Transazione inviata: ${tx.hash}`);
      const receipt = await tx.wait();

      console.log(`✅ Policy "${newPolicyId}" registrata nel blocco ${receipt.blockNumber}`);

      const data = await contract.getPolicy(NODE_ID_PRODUCER, newPolicyId);
      console.log("📄 Policy registrata:", data);

    } catch (err) {
      console.error("❌ Errore durante la registrazione Policy (producer):", err);
    }
  }

  /* ======================= POLICY PUT ======================= */
  else if (method === "PUT" && rawPort.startsWith(Policy)) {
    console.log("✏️ Modifica policy (producer)");

    try {
      const policyId = rawPort.split("/").pop();
      const { time1, time2 } = extractPolicyInfo(cleanedData);

      let newPolicyContent = "";
      if (time1 && time2) {
        newPolicyContent = `${time1}&${time2}`;
      }

      const estimatedGas = await contract.modifyPolicy.estimateGas(
        NODE_ID_PRODUCER,
        policyId,
        newPolicyContent
      );

      const tx = await contract.modifyPolicy(
        NODE_ID_PRODUCER,
        policyId,
        newPolicyContent,
        { gasLimit: estimatedGas + 50_000n }
      );

      const receipt = await tx.wait();
      console.log(`✅ Policy "${policyId}" modificata nel blocco ${receipt.blockNumber}`);

      const updated = await contract.getPolicy(NODE_ID_PRODUCER, policyId);
      console.log("📄 Policy modificata:", updated);

    } catch (err) {
      console.error("❌ Errore durante la modifica Policy (producer):", err);
    }
  }

  /* ======================= DATAOFFER POST ======================= */
  else if (rawPort == DataOffer && method === "POST") {
    const [accessPolicyId, contractPolicyId, assetSelector] =
      extractContractDefinitionInfo(cleanedData);

    try {
      const dataofferid = cleanedData.response?.['@id'];
      const newDataofferid = dataofferid.toString();

      console.log(`📤 Registrazione data offer ID (producer): ${newDataofferid}`);

      const estimatedGas = await contract.registerDataoffer.estimateGas(
        NODE_ID_PRODUCER,
        newDataofferid,
        accessPolicyId,
        contractPolicyId,
        assetSelector
      );

      const tx = await contract.registerDataoffer(
        NODE_ID_PRODUCER,
        newDataofferid,
        accessPolicyId,
        contractPolicyId,
        assetSelector,
        { gasLimit: estimatedGas + 50_000n }
      );

      const receipt = await tx.wait();
      console.log(`✅ Dataoffer "${newDataofferid}" registrato nel blocco ${receipt.blockNumber}`);

      const data = await contract.getDataoffer(NODE_ID_PRODUCER, newDataofferid);
      console.log("📄 Dataoffer registrato:", data);

    } catch (err) {
      console.error("❌ Errore durante la registrazione Dataoffer (producer):", err);
    }
  }
  else if(rawPort==DataOffer&& method=='PUT')
  {
      try {
    /* ======================= ID ======================= */
    const dataofferId =
      cleanedData.request?.body?.['@id'] ||
      rawPort.split("/").pop();

    if (!dataofferId) {
      throw new Error("DataOffer ID non trovato");
    }

    const newDataofferId = dataofferId.toString();

    /* ======================= CONTENUTO ======================= */
    const [
      newAccessPolicyId,
      newContractPolicyId,
      newAssetSelector
    ] = extractContractDefinitionInfo(cleanedData);

    console.log("📄 Nuovi valori DataOffer:");
    console.log("accessPolicyId:", newAccessPolicyId);
    console.log("contractPolicyId:", newContractPolicyId);
    console.log("assetSelector:", newAssetSelector);

    /* ======================= CHECK ESISTENZA ======================= */
    const existing = await contract.getDataoffer(
      NODE_ID_PRODUCER,
      newDataofferId
    );

    console.log("📄 DataOffer trovato:", existing);

    /* ======================= GAS ======================= */
    const estimatedGas = await contract.modifyDataoffer.estimateGas(
      NODE_ID_PRODUCER,
      newDataofferId,
      newAccessPolicyId,
      newContractPolicyId,
      newAssetSelector
    );

    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    /* ======================= TX ======================= */
    const tx = await contract.modifyDataoffer(
      NODE_ID_PRODUCER,
      newDataofferId,
      newAccessPolicyId,
      newContractPolicyId,
      newAssetSelector,
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ DataOffer "${newDataofferId}" modificato nel blocco ${receipt.blockNumber}`);

    /* ======================= VERIFY ======================= */
    const updated = await contract.getDataoffer(
      NODE_ID_PRODUCER,
      newDataofferId
    );

    console.log("📄 DataOffer aggiornato:", updated);

  } catch (err) {
    console.error("❌ Errore durante la modifica DataOffer (consumer):", err);
  }
  }

  /* ======================= EMIT EVENT ======================= */
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
