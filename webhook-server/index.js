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


// --- Ethereum setup ---
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

// Usa il nodo Besu locale (porta 8545)
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

const CONTRACT_ADDRESS = "0x0bcc0aa6bb316af0e04e90f1c869362805caa873";

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

async function waitForAgreementState(contractNegotiationId, {
  baseUrl,
  apiKey,
  targetState = "AGREED",
  intervalMs = 2000,
  maxRetries = 15
}) {
  const url = `${baseUrl}/api/management/wrapper/ui/pages/catalog-page/contract-negotiations/${contractNegotiationId}`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`🔁 Polling negotiation (${attempt}/${maxRetries})`);

    const resp = await axios.get(url, {
      headers: { "X-Api-Key": apiKey }
    });

    const state = resp.data?.state?.simplifiedState;

    console.log("📌 Current simplifiedState:", state);

    if (state === targetState) {
      console.log("✅ Target state reached:", targetState);
      return resp.data;
    }

    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Timeout: stato ${targetState} non raggiunto`);
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
  console.log("📡 Evento proveniente dal PROVIDER (11000)");
  console.dir(cleanedData, { depth: null, colors: true });

  /* ======================= ASSET POST ======================= */
  if (rawPort == Asset && method === "POST") {
    try {
      const newAssetId = assetId.toString();

      console.log(`📤 Registrazione asset ID: ${newAssetId}`);

      const estimatedGas = await contract.registerAsset.estimateGas(
        NODE_ID_PROVIDER,
        newAssetId,
        assetTitle
      );

      console.log(`⛽ Gas stimato: ${estimatedGas}`);

      const tx = await contract.registerAsset(
        NODE_ID_PROVIDER,
        newAssetId,
        assetTitle,
        { gasLimit: estimatedGas + 50_000n }
      );

      console.log(`⏳ Transazione inviata: ${tx.hash}`);
      const receipt = await tx.wait();

      console.log(`✅ Asset "${newAssetId}" registrato nel blocco ${receipt.blockNumber}`);

      const data = await contract.getAsset(NODE_ID_PROVIDER, newAssetId);
      console.log("📄 Asset registrato:", data);

    } catch (err) {
      console.error("❌ Errore durante la registrazione asset (provider):", err);
    }
  }

  /* ======================= ASSET PUT ======================= */
  else if (rawPort == Asset && method === "PUT") {
    try {
      const newAssetId = cleanedData.request?.body?.properties?.id?.toString();
      const newAssetTitle = cleanedData.request?.body?.properties?.title;

      console.log(`📤 Modifica asset ID: ${newAssetId}`);

      const data = await contract.getAsset(NODE_ID_PROVIDER, newAssetId);
      console.log("📄 Asset trovato:", data);

      const estimatedGas = await contract.modifyAsset.estimateGas(
        NODE_ID_PROVIDER,
        newAssetId,
        newAssetTitle
      );

      const tx = await contract.modifyAsset(
        NODE_ID_PROVIDER,
        newAssetId,
        newAssetTitle,
        { gasLimit: estimatedGas + 50_000n }
      );

      const receipt = await tx.wait();
      console.log(`✅ Asset "${newAssetId}" modificato nel blocco ${receipt.blockNumber}`);

      const updated = await contract.getAsset(NODE_ID_PROVIDER, newAssetId);
      console.log("📄 Asset modificato:", updated);

    } catch (err) {
      console.error("❌ Errore durante la modifica asset (PRODUCER):", err);
    }
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

    try {
      const estimatedGas = await contract.registerPolicy.estimateGas(
        NODE_ID_PROVIDER,
        newPolicyId,
        policyContent
      );

      console.log(`⛽ Gas stimato: ${estimatedGas}`);

      const tx = await contract.registerPolicy(
        NODE_ID_PROVIDER,
        newPolicyId,
        policyContent,
        { gasLimit: estimatedGas + 50_000n }
      );

      console.log(`⏳ Transazione inviata: ${tx.hash}`);
      const receipt = await tx.wait();

      console.log(`✅ Policy "${newPolicyId}" registrata nel blocco ${receipt.blockNumber}`);

      const data = await contract.getPolicy(NODE_ID_PROVIDER, newPolicyId);
      console.log("📄 Policy registrata:", data);

    } catch (err) {
      console.error("❌ Errore durante la registrazione Policy (producer):", err);
    }
  }
  /* ======================= POLICY PUT ======================= */
  else if(method === "PUT" && rawPort.startsWith(Policy)){
    console.log("✏️ Modifica policy (producer)");

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
      NODE_ID_PROVIDER,
      newPolicyId
    );
    console.log("📄 Policy trovata:", existing);

    // Gas estimation
    const estimatedGas = await contract.modifyPolicy.estimateGas(
      NODE_ID_PROVIDER,
      newPolicyId,
      newPolicyContent
    );

    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    // Transazione
    const tx = await contract.modifyPolicy(
      NODE_ID_PROVIDER,
      newPolicyId,
      newPolicyContent,
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ Policy "${newPolicyId}" modificata nel blocco ${receipt.blockNumber}`);

    // Verifica finale
    const updated = await contract.getPolicy(
      NODE_ID_PROVIDER,
      newPolicyId
    );
    console.log("📄 Policy modificata:", updated);

  } catch (err) {
    console.error("❌ Errore durante la modifica Policy (producer):", err);
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
        NODE_ID_PROVIDER,
        newDataofferid,
        accessPolicyId,
        contractPolicyId,
        assetSelector
      );

      console.log(`⛽ Gas stimato: ${estimatedGas}`);

      const tx = await contract.registerDataoffer(
        NODE_ID_PROVIDER,
        newDataofferid,
         accessPolicyId,
        contractPolicyId,
        assetSelector,
        { gasLimit: estimatedGas + 50_000n }
      );

      console.log(`⏳ Transazione inviata: ${tx.hash}`);
      const receipt = await tx.wait();

      console.log(`✅ Dataoffer "${newDataofferid}" registrato nel blocco ${receipt.blockNumber}`);

      const data = await contract.getDataoffer(NODE_ID_PROVIDER, newDataofferid);
      console.log("📄 Dataoffer registrato:", data);

    } catch (err) {
      console.error("❌ Errore durante la registrazione Data offer (producer):", err);
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
      NODE_ID_PROVIDER,
      newDataofferId
    );

    console.log("📄 DataOffer trovato:", existing);

    /* ======================= GAS ======================= */
    const estimatedGas = await contract.modifyDataoffer.estimateGas(
      NODE_ID_PROVIDER,
      newDataofferId,
      newAccessPolicyId,
      newContractPolicyId,
      newAssetSelector
    );

    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    /* ======================= TX ======================= */
    const tx = await contract.modifyDataoffer(
      NODE_ID_PROVIDER,
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
      NODE_ID_PROVIDER,
      newDataofferId
    );

    console.log("📄 DataOffer aggiornato:", updated);

  } catch (err) {
    console.error("❌ Errore durante la modifica DataOffer (producer):", err);
  }
  }
  else if (rawPort == Contratto && method === "POST") {

  try {
    /* ======================= ESTRAZIONE ID ======================= */

    const contractNegotiationId =
      cleanedData.response?.contractNegotiationId;

    const counterPartyId =
      cleanedData.request?.body?.counterPartyId ||
      cleanedData.request?.body?.counterPartyParticipantId ||
      "unknown";

    if (!contractNegotiationId) {
      throw new Error("contractNegotiationId non trovato");
    }

    console.log("📄 contractNegotiationId:", contractNegotiationId);

    /* ======================= COSTRUZIONE URL ======================= */

    const negotiation = await waitForAgreementState(contractNegotiationId, {
     baseUrl: "http://localhost:11000",
     apiKey: "SomeOtherApiKey",
     targetState: "AGREED",
     intervalMs: 2000,
     maxRetries: 20
    });

    console.log("🎉 Negotiation AGREED:");
    console.dir(negotiation, { depth: null, colors: true });

    const contractAgreementId = negotiation?.contractAgreementId;

    if (!contractAgreementId) {
      throw new Error("contractAgreementId non presente nonostante stato AGREED");
    }

    console.log("📄 contractAgreementId:", contractAgreementId);

    const state = negotiation.state;

    // Campi di stato separati (più comodo)
    const stateName = negotiation.state.name;                 // "FINALIZED"
    const stateCode = negotiation.state.code;                 // 1200
    const simplifiedState = negotiation.state.simplifiedState; // "AGREED"
    const createdAt = Date.parse(negotiation.createdAt);
    console.log(createdAt);

    const estimatedGas = await contract.registerContratto.estimateGas(
      NODE_ID_PROVIDER,
      contractAgreementId,
      counterPartyId,
      createdAt,
      stateName
    );

    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    const tx = await contract.registerContratto(
      NODE_ID_PROVIDER,
      contractAgreementId,
      counterPartyId,
      createdAt,
      stateName,
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ Contratto registrato on-chain nel blocco ${receipt.blockNumber}`);

    const stored = await contract.getContratto(
      NODE_ID_PROVIDER,
      contractAgreementId
    );

    console.log("📄 Contratto on-chain:", stored);



  } catch (err) {
    console.error("❌ Errore gestione Contratto POST:", err);

    return res.status(500).json({
      error: err.message
    });
  }
}
else if (method === "POST" && rawPort.startsWith(TERMINATE_CONTRATTO_PREFIX) && rawPort.endsWith("/terminate"))
{
  try {
    /* ======================= ESTRAZIONE CONTRACT AGREEMENT ID ======================= */

    const parts = rawPort.split("/");
    const contractAgreementId = parts[parts.length - 2];
    console.log(contractAgreementId);

    if (!contractAgreementId) {
      throw new Error("contractAgreementId non trovato nella URL");
    }

    console.log("🛑 Terminate contratto");
    console.log("📄 contractAgreementId:", contractAgreementId);
    const transferUrl =
      `http://localhost:11000/api/management/v3/transferprocesses/request`;

    console.log("🌐 POST:", transferUrl);

    const querySpec = {
    "@type": "https://w3id.org/edc/v0.0.1/ns/QuerySpec",
     "https://w3id.org/edc/v0.0.1/ns/offset": 0,
     "https://w3id.org/edc/v0.0.1/ns/limit": 1000
    };
    const transferResp = await axios.post(
    transferUrl,
     querySpec, // ✅ BODY
    {
     headers: {
       "X-Api-Key": "SomeOtherApiKey",
       "Content-Type": "application/json"
        }
    }
   );

   console.log("📦 Transfer Processes Response:");
   console.dir(transferResp.data, { depth: null, colors: true });

   const transfers = transferResp.data;

   const matchingTransfers = transfers.filter(
     t => t.contractId === contractAgreementId &&
    t.state === "STARTED"
   );

  const transferIds = matchingTransfers.map(t => t['@id']);
  console.log(transferIds)

    /* ======================= UPDATE ON-CHAIN ======================= */

    const estimatedGas = await contract.updateContrattoState.estimateGas(
      NODE_ID_PROVIDER,
      contractAgreementId,
      "TERMINATED"
    );

    const tx = await contract.updateContrattoState(
      NODE_ID_PROVIDER,
      contractAgreementId,
      "TERMINATED",
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ Contratto TERMINATED nel blocco ${receipt.blockNumber}`);




  } catch (err) {
    console.error("❌ Errore terminate contratto:", err);
    return res.status(500).json({ error: err.message });
  }

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
      console.error("❌ Errore durante la registrazione asset (CONSUMER):", err);
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
      console.error("❌ Errore durante la modifica asset (CONSUMER):", err);
    }
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

    try {
      const estimatedGas = await contract.registerPolicy.estimateGas(
        NODE_ID_CONSUMER,
        newPolicyId,
        policyContent
      );

      console.log(`⛽ Gas stimato: ${estimatedGas}`);

      const tx = await contract.registerPolicy(
        CONSUMER,
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
      console.error("❌ Errore durante la registrazione Policy (CONSUMER):", err);
    }
  }
  /* ======================= POLICY PUT ======================= */
  else if(method === "PUT" && rawPort.startsWith(Policy)){
    console.log("✏️ Modifica policy (producer)");

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
      NODE_ID_PROVIDER,
      newPolicyId
    );
    console.log("📄 Policy trovata:", existing);

    // Gas estimation
    const estimatedGas = await contract.modifyPolicy.estimateGas(
      NODE_ID_PROVIDER,
      newPolicyId,
      newPolicyContent
    );

    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    // Transazione
    const tx = await contract.modifyPolicy(
      NODE_ID_PROVIDER,
      newPolicyId,
      newPolicyContent,
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ Policy "${newPolicyId}" modificata nel blocco ${receipt.blockNumber}`);

    // Verifica finale
    const updated = await contract.getPolicy(
      NODE_ID_PROVIDER,
      newPolicyId
    );
    console.log("📄 Policy modificata:", updated);

  } catch (err) {
    console.error("❌ Errore durante la modifica Policy (producer):", err);
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
        NODE_ID_PROVIDER,
        newDataofferid,
        accessPolicyId,
        contractPolicyId,
        assetSelector
      );

      console.log(`⛽ Gas stimato: ${estimatedGas}`);

      const tx = await contract.registerDataoffer(
        NODE_ID_PROVIDER,
        newDataofferid,
         accessPolicyId,
        contractPolicyId,
        assetSelector,
        { gasLimit: estimatedGas + 50_000n }
      );

      console.log(`⏳ Transazione inviata: ${tx.hash}`);
      const receipt = await tx.wait();

      console.log(`✅ Dataoffer "${newDataofferid}" registrato nel blocco ${receipt.blockNumber}`);

      const data = await contract.getDataoffer(NODE_ID_PROVIDER, newDataofferid);
      console.log("📄 Dataoffer registrato:", data);

    } catch (err) {
      console.error("❌ Errore durante la registrazione Data offer (producer):", err);
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
      NODE_ID_PROVIDER,
      newDataofferId
    );

    console.log("📄 DataOffer trovato:", existing);

    /* ======================= GAS ======================= */
    const estimatedGas = await contract.modifyDataoffer.estimateGas(
      NODE_ID_PROVIDER,
      newDataofferId,
      newAccessPolicyId,
      newContractPolicyId,
      newAssetSelector
    );

    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    /* ======================= TX ======================= */
    const tx = await contract.modifyDataoffer(
      NODE_ID_PROVIDER,
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
      NODE_ID_PROVIDER,
      newDataofferId
    );

    console.log("📄 DataOffer aggiornato:", updated);

  } catch (err) {
    console.error("❌ Errore durante la modifica DataOffer (producer):", err);
  }
  }
  else if (rawPort == Contratto && method === "POST") {

  try {
    /* ======================= ESTRAZIONE ID ======================= */

    const contractNegotiationId =
      cleanedData.response?.contractNegotiationId;

    const counterPartyId =
      cleanedData.request?.body?.counterPartyId ||
      cleanedData.request?.body?.counterPartyParticipantId ||
      "unknown";

    if (!contractNegotiationId) {
      throw new Error("contractNegotiationId non trovato");
    }

    console.log("📄 contractNegotiationId:", contractNegotiationId);

    /* ======================= COSTRUZIONE URL ======================= */

    const negotiation = await waitForAgreementState(contractNegotiationId, {
     baseUrl: "http://localhost:11000",
     apiKey: "SomeOtherApiKey",
     targetState: "AGREED",
     intervalMs: 2000,
     maxRetries: 20
    });

    console.log("🎉 Negotiation AGREED:");
    console.dir(negotiation, { depth: null, colors: true });

    const contractAgreementId = negotiation?.contractAgreementId;

    if (!contractAgreementId) {
      throw new Error("contractAgreementId non presente nonostante stato AGREED");
    }

    console.log("📄 contractAgreementId:", contractAgreementId);

    const state = negotiation.state;

    // Campi di stato separati (più comodo)
    const stateName = negotiation.state.name;                 // "FINALIZED"
    const stateCode = negotiation.state.code;                 // 1200
    const simplifiedState = negotiation.state.simplifiedState; // "AGREED"
    const createdAt = Date.parse(negotiation.createdAt);
    console.log(createdAt);

    const estimatedGas = await contract.registerContratto.estimateGas(
      NODE_ID_PROVIDER,
      contractAgreementId,
      counterPartyId,
      createdAt,
      stateName
    );

    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    const tx = await contract.registerContratto(
      NODE_ID_PROVIDER,
      contractAgreementId,
      counterPartyId,
      createdAt,
      stateName,
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ Contratto registrato on-chain nel blocco ${receipt.blockNumber}`);

    const stored = await contract.getContratto(
      NODE_ID_PROVIDER,
      contractAgreementId
    );

    console.log("📄 Contratto on-chain:", stored);



  } catch (err) {
    console.error("❌ Errore gestione Contratto POST:", err);

    return res.status(500).json({
      error: err.message
    });
  }
}
else if (method === "POST" && rawPort.startsWith(TERMINATE_CONTRATTO_PREFIX) && rawPort.endsWith("/terminate"))
{
  try {
    /* ======================= ESTRAZIONE CONTRACT AGREEMENT ID ======================= */

    const parts = rawPort.split("/");
    const contractAgreementId = parts[parts.length - 2];
    console.log(contractAgreementId);

    if (!contractAgreementId) {
      throw new Error("contractAgreementId non trovato nella URL");
    }

    console.log("🛑 Terminate contratto");
    console.log("📄 contractAgreementId:", contractAgreementId);
    const transferUrl =
      `http://localhost:11000/api/management/v3/transferprocesses/request`;

    console.log("🌐 POST:", transferUrl);

    const querySpec = {
    "@type": "https://w3id.org/edc/v0.0.1/ns/QuerySpec",
     "https://w3id.org/edc/v0.0.1/ns/offset": 0,
     "https://w3id.org/edc/v0.0.1/ns/limit": 1000
    };
    const transferResp = await axios.post(
    transferUrl,
     querySpec, // ✅ BODY
    {
     headers: {
       "X-Api-Key": "SomeOtherApiKey",
       "Content-Type": "application/json"
        }
    }
   );

   console.log("📦 Transfer Processes Response:");
   console.dir(transferResp.data, { depth: null, colors: true });

   const transfers = transferResp.data;

   const matchingTransfers = transfers.filter(
     t => t.contractId === contractAgreementId &&
    t.state === "STARTED"
   );

  const transferIds = matchingTransfers.map(t => t['@id']);
  console.log(transferIds)

    /* ======================= UPDATE ON-CHAIN ======================= */

    const estimatedGas = await contract.updateContrattoState.estimateGas(
      NODE_ID_PROVIDER,
      contractAgreementId,
      "TERMINATED"
    );

    const tx = await contract.updateContrattoState(
      NODE_ID_PROVIDER,
      contractAgreementId,
      "TERMINATED",
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ Contratto TERMINATED nel blocco ${receipt.blockNumber}`);




  } catch (err) {
    console.error("❌ Errore terminate contratto:", err);
    return res.status(500).json({ error: err.message });
  }

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
