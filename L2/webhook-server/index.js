const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const http = require("http");
const { Server } = require("socket.io");
const { ethers } = require("ethers"); // ethers.js v6
require("dotenv").config();
const axios = require("axios");


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
const Contratto="http://localhost:11000/api/management/wrapper/ui/pages/catalog-page/contract-negotiations"
const TERMINATE_CONTRATTO_PREFIX ="http://localhost:11000/api/management/wrapper/ui/pages/content-agreement-page/";
const Transfer="http://localhost:11000/api/management/v3/transferprocesses";
const Transfer_PREFIX="http://localhost:11000/api/management/v3/transferprocesses/";

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
const { parseNestedJSON, cleanKeys ,escapeHtml,renderAsList} = require("./utils/parser.js");
const {registerAssetOnChain,
modifyAssetOnChainFromWebhook,
registerPolicyOnChainFromWebhook,
modifyPolicyOnchainFromWebhook,
registerDataofferOnChain,
modifyDataofferOnChain,
registerContrattoOnchain,
terminateContrattoOnchain
} =require("./config/services.js");


// --- Ethereum setup ---
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

// Usa il nodo Besu locale (porta 8545)
const provider = new ethers.JsonRpcProvider("http://localhost:9555");
const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

const CONTRACT_ADDRESS = "0x7cdd54f3e7c17eb0fab7eb4f3924835d9511f231";

const CONTRACT_ABI = require("./abi/ExampleContract");


const NODE_ID_PROVIDER = ethers.keccak256(
  ethers.toUtf8Bytes("localhost:11000")
);

const NODE_ID_CONSUMER = ethers.keccak256(
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

const { extractPolicyInfo, extractContractDefinitionInfo } = require("./utils/extractors.js");



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
  console.log("📡 Evento proveniente dal PROVIDER (11000)");
  console.dir(cleanedData, { depth: null, colors: true });

  /* ======================= ASSET POST ======================= */
  if (rawPort == Asset && method === "POST") {
    await registerAssetOnChain(
    {nodeId: NODE_ID_PROVIDER,assetId,assetTitle, contract });
  }

  /* ======================= ASSET PUT ======================= */
  else if (rawPort == Asset && method === "PUT") {
    await modifyAssetOnChainFromWebhook(cleanedData, NODE_ID_PROVIDER,contract);
  }

  /* ======================= POLICY POST ======================= */
  else if (rawPort == Policy && method === "POST") {
    console.log("📤 Registrazione policy (PRODUCER)");

    const { id: policyid, time1, time2 } = extractPolicyInfo(cleanedData);
    const newPolicyId = policyid.toString();

    let policyContent = "";
    if (time1 && time2) {
      policyContent = `${time1}&${time2}`;
    }
    await registerPolicyOnChainFromWebhook(NODE_ID_PROVIDER,newPolicyId,policyContent,contract);
  }
  /* ======================= POLICY PUT ======================= */
  else if(method === "PUT" && rawPort.startsWith(Policy)){
    console.log("✏️ Modifica policy (producer)");
    await modifyPolicyOnchainFromWebhook(cleanedData,NODE_ID_PROVIDER,contract);
  }
  /* ======================= DATAOFFER POST ======================= */
  else if(rawPort==DataOffer&& method=='POST')
  {
   const [accessPolicyId, contractPolicyId, assetSelector] = extractContractDefinitionInfo(cleanedData);
   console.log(accessPolicyId)
   console.log(contractPolicyId)
   console.log(assetSelector)
   await registerDataofferOnChain(contract,NODE_ID_PROVIDER,cleanedData,accessPolicyId,contractPolicyId,assetSelector);
  }
  else if(rawPort==DataOffer&& method=='PUT')
  {
    await modifyDataofferOnChain(contract,NODE_ID_PROVIDER,cleanedData,rawPort);
  }
  else if (rawPort == Contratto && method === "POST") {

    await registerContrattoOnchain(contract,NODE_ID_PROVIDER,cleanedData);
  }
else if (method === "POST" && rawPort.startsWith(TERMINATE_CONTRATTO_PREFIX) && rawPort.endsWith("/terminate"))
{

  terminateContrattoOnchain(contract,NODE_ID_PROVIDER,rawPort)

}
else if (rawPort === Transfer && method === "POST") {
    try {
        const assetid=cleanedData.request.body.assetId;
        const contractId = cleanedData.request.body.contractId;
        console.log("📄 Contract ID estratto:", contractId);

        const transferid = cleanedData.response['@id'];
        console.log("📄 Transfer ID estratto:", transferid);

        // 1️⃣ Recupero contract negotiations
        const contractnegoUrl = `http://localhost:11000/api/management/v3/contractnegotiations/request`;
        console.log("🌐 POST:", contractnegoUrl);

        const querySpec = {
            "@type": "https://w3id.org/edc/v0.0.1/ns/QuerySpec",
            "https://w3id.org/edc/v0.0.1/ns/offset": 0,
            "https://w3id.org/edc/v0.0.1/ns/limit": 1000
        };

        const contractnegoResp = await axios.post(contractnegoUrl, querySpec, {
            headers: {
                "X-Api-Key": "SomeOtherApiKey",
                "Content-Type": "application/json"
            }
        });

        const negotiations = contractnegoResp.data;

        const match = negotiations.find(n => n.contractAgreementId === contractId);

        if (!match) {
            console.log("❌ Nessuna contract negotiation trovata per ContractAgreementId:", contractId);
            return; // esce se non trova la negotiation
        }

        console.log("✅ Contract negotiation trovata:");
        console.log("🆔 Negotiation ID:", match["@id"]);
        console.log("📄 Contract Agreement ID:", match.contractAgreementId);
        console.log("📌 Stato:", match.state);

        // 2️⃣ Recupero dettagli contract agreement
        const contractUrl = `http://localhost:11000/api/management/wrapper/ui/pages/contract-agreement-page/${match.contractAgreementId}`;
        console.log("🌐 GET:", contractUrl);

        const contractResp = await axios.get(contractUrl, {
            headers: {
                "X-Api-Key": "SomeOtherApiKey",
                "Content-Type": "application/json"
            }
        });

        const terminationStatus = contractResp.data.terminationStatus;
        console.log("🛑 terminationStatus:", terminationStatus);

        // 3️⃣ Trigger smart contract solo se non TERMINATED
        if (terminationStatus === "TERMINATED") {
            const estimatedGas = await contract.requestDataTransfer.estimateGas(
              transferid,
              NODE_ID_PROVIDER,
              contractId,
              terminationStatus,
              assetid
              );

            const tx = await contract.requestDataTransfer(
              transferid,
              NODE_ID_PROVIDER,
              contractId,
              terminationStatus,
              assetid,
             { gasLimit: estimatedGas + 50_000n }
         );

         console.log(`⏳ Transazione inviata: ${tx.hash}`);

         const receipt = await tx.wait();
         console.log(`✅ Data Transfer registrato nel blocco ${receipt.blockNumber}`);
        } else {
            const estimatedGas = await contract.requestDataTransfer.estimateGas(
              transferid,
              NODE_ID_PROVIDER,
              contractId,
              terminationStatus,
              assetid
              );

            const tx = await contract.requestDataTransfer(
              transferid,
              NODE_ID_PROVIDER,
              contractId,
              terminationStatus,
              assetid,
             { gasLimit: estimatedGas + 50_000n }
         );

         console.log(`⏳ Transazione inviata: ${tx.hash}`);

         const receipt = await tx.wait();
         console.log(`✅ Data Transfer registrato nel blocco ${receipt.blockNumber}`);


        }

    } catch (err) {
        console.error("❌ Errore durante il processo di contract/transfer:", err.response?.data || err.message);
    }
   }
   else if (method === "POST" && rawPort.startsWith(Transfer_PREFIX) && rawPort.endsWith("/terminate"))
  {
  try {
    /* ======================= ESTRAZIONE CONTRACT AGREEMENT ID ======================= */

    const parts = rawPort.split("/");
    const transferId = parts[parts.length - 2];
    console.log(transferId);

    if (!transferId) {
      throw new Error("transferId non trovato nella URL");
    }


    /* ======================= UPDATE ON-CHAIN ======================= */

    const estimatedGas = await contract.completeDataTransfer.estimateGas(
      transferId,
      ethers.encodeBytes32String("123")
    );

    const tx = await contract.completeDataTransfer(
      transferId,
      ethers.encodeBytes32String("123"),
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ trasferimento TERMINATED nel blocco ${receipt.blockNumber}`);


  } catch (err) {
    console.error("❌ Errore terminate contratto:", err);
    return res.status(500).json({ error: err.message });
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
  console.log("📡 Evento proveniente dal CONSUMER (22000)");
  console.dir(cleanedData, { depth: null, colors: true });

  /* ======================= ASSET POST ======================= */
  if (rawPort == Asset && method === "POST") {
    await registerAssetOnChain(
    {nodeId: NODE_ID_CONSUMER,assetId,assetTitle, contract });
  }

  /* ======================= ASSET PUT ======================= */
  else if (rawPort == Asset && method === "PUT") {
    await modifyAssetOnChainFromWebhook(cleanedData,NODE_ID_CONSUMER,contract);
  }

  /* ======================= POLICY POST ======================= */
  else if (rawPort == Policy && method === "POST") {
    console.log("📤 Registrazione policy (CONSUMER)");

    const { id: policyid, time1, time2 } = extractPolicyInfo(cleanedData);
    const newPolicyId = policyid.toString();

    let policyContent = "";
    if (time1 && time2) {
      policyContent = `${time1}&${time2}`;
    }

   await registerPolicyOnChainFromWebhook(NODE_ID_CONSUMER,newPolicyId,policyContent,contract);
  }
  /* ======================= POLICY PUT ======================= */
  else if(method === "PUT" && rawPort.startsWith(Policy)){
    console.log("✏️ Modifica policy (CONSUMER)");
    await modifyPolicyOnchainFromWebhook(cleanedData,NODE_ID_CONSUMER,contract);
  }
  /* ======================= DATAOFFER POST ======================= */
  else if(rawPort==DataOffer&& method=='POST')
  {
   const [accessPolicyId, contractPolicyId, assetSelector] = extractContractDefinitionInfo(cleanedData);
   console.log(accessPolicyId)
   console.log(contractPolicyId)
   console.log(assetSelector)
   await registerDataofferOnChain(contract,NODE_ID_CONSUMER,cleanedData,accessPolicyId,contractPolicyId,assetSelector);
  }
  else if(rawPort==DataOffer&& method=='PUT')
  {
      await modifyDataofferOnChain(contract,NODE_ID_CONSUMER,cleanedData,rawPort);
  }
  else if (rawPort == Contratto && method === "POST") {

  await registerContrattoOnchain(contract,NODE_ID_CONSUMER,cleanedData);
}
else if (method === "POST" && rawPort.startsWith(TERMINATE_CONTRATTO_PREFIX) && rawPort.endsWith("/terminate"))
{
  terminateContrattoOnchain(contract,NODE_ID_CONSUMER,rawPort)

}
else if (rawPort === Transfer && method === "POST") {
    try {
        const assetid=cleanedData.request.body.assetId;
        const contractId = cleanedData.request.body.contractId;
        console.log("📄 Contract ID estratto:", contractId);

        const transferid = cleanedData.response['@id'];
        console.log("📄 Transfer ID estratto:", transferid);

        // 1️⃣ Recupero contract negotiations
        const contractnegoUrl = `http://localhost:11000/api/management/v3/contractnegotiations/request`;
        console.log("🌐 POST:", contractnegoUrl);

        const querySpec = {
            "@type": "https://w3id.org/edc/v0.0.1/ns/QuerySpec",
            "https://w3id.org/edc/v0.0.1/ns/offset": 0,
            "https://w3id.org/edc/v0.0.1/ns/limit": 1000
        };

        const contractnegoResp = await axios.post(contractnegoUrl, querySpec, {
            headers: {
                "X-Api-Key": "SomeOtherApiKey",
                "Content-Type": "application/json"
            }
        });

        const negotiations = contractnegoResp.data;

        const match = negotiations.find(n => n.contractAgreementId === contractId);

        if (!match) {
            console.log("❌ Nessuna contract negotiation trovata per ContractAgreementId:", contractId);
            return; // esce se non trova la negotiation
        }

        console.log("✅ Contract negotiation trovata:");
        console.log("🆔 Negotiation ID:", match["@id"]);
        console.log("📄 Contract Agreement ID:", match.contractAgreementId);
        console.log("📌 Stato:", match.state);

        // 2️⃣ Recupero dettagli contract agreement
        const contractUrl = `http://localhost:11000/api/management/wrapper/ui/pages/contract-agreement-page/${match.contractAgreementId}`;
        console.log("🌐 GET:", contractUrl);

        const contractResp = await axios.get(contractUrl, {
            headers: {
                "X-Api-Key": "SomeOtherApiKey",
                "Content-Type": "application/json"
            }
        });

        const terminationStatus = contractResp.data.terminationStatus;
        console.log("🛑 terminationStatus:", terminationStatus);

        // 3️⃣ Trigger smart contract solo se non TERMINATED
        if (terminationStatus === "TERMINATED") {
            const estimatedGas = await contract.requestDataTransfer.estimateGas(
              transferid,
              NODE_ID_CONSUMER,
              contractId,
              terminationStatus,
              assetid
              );

            const tx = await contract.requestDataTransfer(
              transferid,
              NODE_ID_CONSUMER,
              contractId,
              terminationStatus,
              assetid,
             { gasLimit: estimatedGas + 50_000n }
         );

         console.log(`⏳ Transazione inviata: ${tx.hash}`);

         const receipt = await tx.wait();
         console.log(`✅ Data Transfer registrato nel blocco ${receipt.blockNumber}`);
        } else {
            const estimatedGas = await contract.requestDataTransfer.estimateGas(
              transferid,
              NODE_ID_CONSUMER,
              contractId,
              terminationStatus,
              assetid
              );

            const tx = await contract.requestDataTransfer(
              transferid,
              NODE_ID_CONSUMER,
              contractId,
              terminationStatus,
              assetid,
             { gasLimit: estimatedGas + 50_000n }
         );

         console.log(`⏳ Transazione inviata: ${tx.hash}`);

         const receipt = await tx.wait();
         console.log(`✅ Data Transfer registrato nel blocco ${receipt.blockNumber}`);


        }

    } catch (err) {
        console.error("❌ Errore durante il processo di contract/transfer:", err.response?.data || err.message);
    }
   }
   else if (method === "POST" && rawPort.startsWith(Transfer_PREFIX) && rawPort.endsWith("/terminate"))
  {
  try {
    /* ======================= ESTRAZIONE CONTRACT AGREEMENT ID ======================= */

    const parts = rawPort.split("/");
    const transferId = parts[parts.length - 2];
    console.log(transferId);

    if (!transferId) {
      throw new Error("transferId non trovato nella URL");
    }


    /* ======================= UPDATE ON-CHAIN ======================= */

    const estimatedGas = await contract.completeDataTransfer.estimateGas(
      transferId,
      ethers.encodeBytes32String("123")
    );

    const tx = await contract.completeDataTransfer(
      transferId,
      ethers.encodeBytes32String("123"),
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ trasferimento TERMINATED nel blocco ${receipt.blockNumber}`);


  } catch (err) {
    console.error("❌ Errore terminate contratto:", err);
    return res.status(500).json({ error: err.message });
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
