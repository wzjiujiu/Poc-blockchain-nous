const { extractPolicyInfo, extractContractDefinitionInfo } = require("../utils/extractors.js");

async function registerAssetOnChain({ nodeId, assetId, assetTitle,contract }) {
  try {
    const assetIdStr = assetId.toString();
    console.log(`📤 Registrazione asset ID: ${assetIdStr}`);

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

    // Lettura dei dati registrati
    const data = await contract.getAsset(nodeId, assetIdStr);
    console.log("📄 Asset registrato:", data);

    return {
      success: true,
      txHash: tx.hash,
      block: receipt.blockNumber,
      data
    };

  } catch (err) {
    console.error("❌ Errore durante la registrazione asset:", err);
    return { success: false, error: err };
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
    const estimatedGas = await contract.modifyAsset.estimateGas(
      nodeId,
      assetId,
      newTitle
    );

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


module.exports = { registerAssetOnChain,
modifyAssetOnChainFromWebhook ,
registerPolicyOnChainFromWebhook,
modifyPolicyOnchainFromWebhook};