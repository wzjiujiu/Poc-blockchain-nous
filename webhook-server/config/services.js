const { extractPolicyInfo, extractContractDefinitionInfo } = require("../utils/extractors.js");
const axios = require("axios");
const { toUtf8Bytes, hexlify, toUtf8String } = require("ethers");


function toBytes32(str) {
  const bytes = toUtf8Bytes(str);
  console.log(str)
  console.log(bytes)
  console.log(bytes.length)
  if (bytes.length > 32) throw new Error("String troppo lunga per bytes32");
  const padded = new Uint8Array(32);
  padded.set(bytes); // copia i byte all'inizio, resto è 0
  return hexlify(padded);
}

// bytes32 -> string
function fromBytes32(bytes32Str) {
  return toUtf8String(bytes32Str).replace(/\0/g, "");
}

async function registerAssetOnChain({ nodeId, assetId, assetTitle, contract }) {

  try {
    const assetIdStr = assetId.toString();
    console.log(`📤 Registrazione asset ID: ${assetIdStr}`);

    const startTime = Date.now(); // inizio registrazione
    console.log(`⏱ Inizio registrazione: ${new Date(startTime).toLocaleTimeString()}`);

    // Stima gas
    const estimatedGas = await contract.registerAsset.estimateGas(
      nodeId,
      assetIdStr,
      assetTitle
    );
    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    // Transazione
    const tx = await contract.registerAsset(
      nodeId,
      assetIdStr,
      assetTitle,
      { gasLimit: estimatedGas + 50_000n }
    );
    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ Asset "${assetIdStr}" registrato nel blocco ${receipt.blockNumber}`);
    const endTime = Date.now(); // fine registrazione
    const durationSec = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`⏱ Tempo totale registrazione on-chain: ${durationSec} secondi`);

    // Lettura dei dati registrati
    const data = await contract.getAsset(nodeId, assetIdStr);
    console.log("📄 Asset registrato:", data);

    return {
      success: true,
      txHash: tx.hash,
      block: receipt.blockNumber,
      data,
      durationSec
    };

  } catch (err) {
    console.error("❌ Errore durante la registrazione asset:", err);
    const endTime = Date.now();
    const durationSec = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`⏱ Tempo trascorso prima dell'errore: ${durationSec} secondi`);

    return { success: false, error: err, durationSec };
  }
}

async function modifyAssetOnChainFromWebhook(cleanedData, nodeId,contract) {
  try {
    const assetId = cleanedData?.request?.body?.properties?.id?.toString();
    const newTitle = cleanedData?.request?.body?.properties?.title;

    if (!assetId || !newTitle) {
      throw new Error("assetId o title mancanti nei dati webhook");
    }

    console.log(`📤 Modifica asset ID: ${assetId}`);
    console.log(`📝 Nuovo titolo: ${newTitle}`);

    // Recupero asset esistente
    const existing = await contract.getAsset(nodeId, assetId);

    console.log("📄 Asset trovato:", existing);

    // Stima gas
    const startTime = Date.now(); // inizio registrazione
    console.log(`⏱ Inizio registrazione: ${new Date(startTime).toLocaleTimeString()}`);
    const estimatedGas = await contract.modifyAsset.estimateGas(
      nodeId,
      assetId,
      newTitle
    );
    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    // Transazione
    const tx = await contract.modifyAsset(
      nodeId,
      assetId,
      newTitle,
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ TX inviata: ${tx.hash}`);

    const receipt = await tx.wait();

    console.log(`✅ Asset "${assetId}" modificato nel blocco ${receipt.blockNumber}`);
    const endTime = Date.now(); // fine registrazione
    const durationSec = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`⏱ Tempo totale registrazione on-chain: ${durationSec} secondi`);

    // Leggi asset aggiornato
    const updated = await contract.getAsset(nodeId, assetId);
    console.log("📄 Asset aggiornato:", updated);

    return {
      success: true,
      txHash: tx.hash,
      block: receipt.blockNumber,
      updated
    };

  } catch (err) {
    console.error("❌ Errore in modifyAssetOnChainFromWebhook:", err);
    return { success: false, error: err };
  }
}

async function registerAssetOnChainGasTest({ nodeId, assetId, assetTitle, contract }) {


  try {
    const assetIdBytes = toBytes32(assetId);
    const titleBytes = toBytes32(assetTitle);
    console.log(`📤 Registrazione asset ID: ${assetId}`);

    console.log(assetIdBytes)

    console.log(titleBytes)

    // Stima gas
    const startTime = Date.now();
    console.log(`⏱ Inizio registrazione: ${new Date(startTime).toLocaleTimeString()}`);
    const estimatedGas = await contract.registerAsset.estimateGas(
      nodeId,
      assetIdBytes,
      titleBytes
    );
    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    // Transazione
    const tx = await contract.registerAsset(
      nodeId,
      assetIdBytes,
      titleBytes,
      { gasLimit: estimatedGas + 50_000n }
    );
    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ Asset "${assetId}" registrato nel blocco ${receipt.blockNumber}`);

    const endTime = Date.now();
    const durationSec = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`⏱ Tempo totale registrazione on-chain: ${durationSec} secondi`);

    // Lettura dati registrati
    const data = await contract.getAsset(nodeId, assetIdBytes);
    console.log("📄 Asset registrato:", {
      id: fromBytes32(data[0]),
      nodeId: data[1],
      registrar: data[2],
      timestamp: data[3].toString(),
      title: fromBytes32(data[4])
    });

    return { success: true, txHash: tx.hash, block: receipt.blockNumber, data, durationSec };
  } catch (err) {
    console.error("❌ Errore durante la registrazione asset:", err);
    const endTime = Date.now();
    const durationSec = ((endTime - startTime) / 1000).toFixed(2);
    return { success: false, error: err, durationSec };
  }
}

async function modifyAssetOnChainFromWebhookGasTest(cleanedData, nodeId, contract) {
  try {
    const assetId = cleanedData?.request?.body?.properties?.id;
    const newTitle = cleanedData?.request?.body?.properties?.title;

    if (!assetId || !newTitle) throw new Error("assetId o title mancanti nei dati webhook");

    const assetIdBytes = toBytes32(assetId);
    const newTitleBytes = toBytes32(newTitle);

    console.log(`📤 Modifica asset ID: ${assetId}`);
    console.log(`📝 Nuovo titolo: ${newTitle}`);

    const existing = await contract.getAsset(nodeId, assetIdBytes);
    console.log("📄 Asset trovato:", {
      id: fromBytes32(existing[0]),
      nodeId: existing[1],
      registrar: existing[2],
      timestamp: existing[3].toString(),
      title: fromBytes32(existing[4])
    });

    const startTime = Date.now();
    console.log(`⏱ Inizio modifica: ${new Date(startTime).toLocaleTimeString()}`);

    const estimatedGas = await contract.modifyAsset.estimateGas(
      nodeId,
      assetIdBytes,
      newTitleBytes
    );
    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    const tx = await contract.modifyAsset(
      nodeId,
      assetIdBytes,
      newTitleBytes,
      { gasLimit: estimatedGas + 50_000n }
    );
    console.log(`⏳ TX inviata: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`✅ Asset "${assetId}" modificato nel blocco ${receipt.blockNumber}`);

    const endTime = Date.now();
    const durationSec = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`⏱ Tempo totale modifica on-chain: ${durationSec} secondi`);

    const updated = await contract.getAsset(nodeId, assetIdBytes);
    console.log("📄 Asset aggiornato:", {
      id: fromBytes32(updated[0]),
      nodeId: updated[1],
      registrar: updated[2],
      timestamp: updated[3].toString(),
      title: fromBytes32(updated[4])
    });

    return { success: true, txHash: tx.hash, block: receipt.blockNumber, updated, durationSec };
  } catch (err) {
    console.error("❌ Errore in modifyAssetOnChainFromWebhook:", err);
    return { success: false, error: err };
  }
}

async function registerPolicyOnChainFromWebhook(nodeId,newPolicyId,policyContent,contract) {
  try {

    console.log(`📤 Registrazione Policy ID: ${newPolicyId}`);

    // Stima gas
    const estimatedGas = await contract.registerPolicy.estimateGas(
      nodeId,
      newPolicyId,
      policyContent
    );

    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    // Esecuzione transazione
    const tx = await contract.registerPolicy(
      nodeId,
      newPolicyId,
      policyContent,
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();

    console.log(`✅ Policy "${newPolicyId}" registrata nel blocco ${receipt.blockNumber}`);

    const data = await contract.getPolicy(nodeId, newPolicyId);
    console.log("📄 Policy registrata:", data);

    return {
      success: true,
      txHash: tx.hash,
      block: receipt.blockNumber,
      data
    };

  } catch (err) {
    console.error("❌ Errore nella funzione registerPolicyFromWebhook:", err);
    return { success: false, error: err };
  }
}

async function modifyPolicyOnchainFromWebhook(cleanedData, nodeId,contract) {
  try {
    /* ======================= ID ======================= */
    const policyId =
      cleanedData.request?.body?.['@id'] ||
      cleanedData.request?.body?.id;

    if (!policyId) {
      throw new Error("Policy ID non trovato nella richiesta");
    }

    const newPolicyId = policyId.toString();

    /* ======================= CONTENUTO ======================= */
    const { time1, time2 } = extractPolicyInfo(cleanedData);

    let newPolicyContent = "";
    if (time1 && time2) {
      newPolicyContent = `${time1}&${time2}`;
    }

    console.log(`📤 Modifica policy ID: ${newPolicyId}`);
    console.log("📄 Nuovo contenuto:", newPolicyContent);

    /* ======================= VERIFICA ESISTENZA ======================= */
    const existing = await contract.getPolicy(nodeId, newPolicyId);
    console.log("📄 Policy trovata:", existing);

    /* ======================= GAS ESTIMATE ======================= */
    const estimatedGas = await contract.modifyPolicy.estimateGas(
      nodeId,
      newPolicyId,
      newPolicyContent
    );

    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    /* ======================= TRANSAZIONE ======================= */
    const tx = await contract.modifyPolicy(
      nodeId,
      newPolicyId,
      newPolicyContent,
      { gasLimit: estimatedGas + 50_000n }
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);

    const receipt = await tx.wait();

    console.log(`✅ Policy "${newPolicyId}" modificata nel blocco ${receipt.blockNumber}`);

    /* ======================= LETTURA FINALE ======================= */
    const updated = await contract.getPolicy(nodeId, newPolicyId);
    console.log("📄 Policy aggiornata:", updated);

    return {
      success: true,
      txHash: tx.hash,
      block: receipt.blockNumber,
      data: updated,
    };

  } catch (err) {
    console.error("❌ Errore nella funzione modifyPolicyFromWebhook:", err);
    return { success: false, error: err };
  }
}

async function modifyDataofferOnChain(contract, nodeId, cleanedData, rawPort) {
  try {
    /* ======================= ID ======================= */
    const dataofferId =
      cleanedData.request?.body?.['@id'] ||
      rawPort.split("/").pop();

    if (!dataofferId) {
      throw new Error("DataOffer ID non trovato");
    }

    const newDataofferId = dataofferId.toString();
    console.log(newDataofferId)

    /* ======================= CONTENUTO ======================= */
    const [newAccessPolicyId, newContractPolicyId, newAssetSelector] =
      extractContractDefinitionInfo(cleanedData);

    console.log("📄 Nuovi valori DataOffer:");
    console.log("accessPolicyId:", newAccessPolicyId);
    console.log("contractPolicyId:", newContractPolicyId);
    console.log("assetSelector:", newAssetSelector);

    /* ======================= CHECK ESISTENZA ======================= */
    const existing = await contract.getDataoffer(nodeId, newDataofferId);
    console.log("📄 DataOffer trovato:", existing);

    /* ======================= GAS ======================= */
    const estimatedGas = await contract.modifyDataoffer.estimateGas(
      nodeId,
      newDataofferId,
      newAccessPolicyId,
      newContractPolicyId,
      newAssetSelector
    );
    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    /* ======================= TRANSAZIONE ======================= */
    const tx = await contract.modifyDataoffer(
      nodeId,
      newDataofferId,
      newAccessPolicyId,
      newContractPolicyId,
      newAssetSelector,
      { gasLimit: estimatedGas + 50_000n } // buffer gas
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`✅ DataOffer "${newDataofferId}" modificato nel blocco ${receipt.blockNumber}`);

    /* ======================= VERIFY ======================= */
    const updated = await contract.getDataoffer(nodeId, newDataofferId);
    console.log("📄 DataOffer aggiornato:", updated);

    return updated; // ritorna il nuovo stato del DataOffer

  } catch (err) {
    console.error("❌ Errore durante la modifica DataOffer:", err);
    throw err; // rilancia l'errore per gestione esterna
  }
}

async function registerDataofferOnChain(contract, nodeId, cleanedData, accessPolicyId, contractPolicyId, assetSelector) {
  try {
    /* ======================= ID ======================= */
    const dataofferid = cleanedData.response?.['@id'];
    if (!dataofferid) {
      throw new Error("DataOffer ID non trovato");
    }

    const newDataofferid = dataofferid.toString();
    console.log(`📤 Registrazione DataOffer ID: ${newDataofferid}`);

    /* ======================= GAS ======================= */
    const estimatedGas = await contract.registerDataoffer.estimateGas(
      nodeId,
      newDataofferid,
      accessPolicyId,
      contractPolicyId,
      assetSelector
    );
    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    /* ======================= TRANSAZIONE ======================= */
    const tx = await contract.registerDataoffer(
      nodeId,
      newDataofferid,
      accessPolicyId,
      contractPolicyId,
      assetSelector,
      { gasLimit: estimatedGas + 50_000n } // buffer gas sicuro
    );

    console.log(`⏳ Transazione inviata: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`✅ DataOffer "${newDataofferid}" registrato nel blocco ${receipt.blockNumber}`);

    /* ======================= VERIFY ======================= */
    const data = await contract.getDataoffer(nodeId, newDataofferid);
    console.log("📄 DataOffer registrato:", data);

    return data; // ritorna lo stato registrato del DataOffer

  } catch (err) {
    console.error("❌ Errore durante la registrazione DataOffer:", err);
    throw err; // rilancia l'errore per gestione esterna
  }
}

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

async function registerContrattoOnchain(contract, nodeId, cleanedData)
{
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
      nodeId,
      contractAgreementId,
      counterPartyId,
      createdAt,
      stateName
    );

    console.log(`⛽ Gas stimato: ${estimatedGas}`);

    const tx = await contract.registerContratto(
      nodeId,
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
      nodeId,
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

async function terminateContrattoOnchain(contract, nodeId, rawPort)
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
      nodeId,
      contractAgreementId,
      "TERMINATED"
    );

    const tx = await contract.updateContrattoState(
      nodeId,
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

module.exports = { registerAssetOnChain,
modifyAssetOnChainFromWebhook ,
registerPolicyOnChainFromWebhook,
modifyPolicyOnchainFromWebhook,
registerDataofferOnChain,
modifyDataofferOnChain,
registerContrattoOnchain,
terminateContrattoOnchain,
registerAssetOnChainGasTest,
modifyAssetOnChainFromWebhookGasTest};