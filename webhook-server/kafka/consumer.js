const { Kafka } = require("kafkajs");

const {registerAssetOnChain,
modifyAssetOnChainFromWebhook,
registerPolicyOnChainFromWebhook,
modifyPolicyOnchainFromWebhook,
registerDataofferOnChain,
modifyDataofferOnChain,
registerContrattoOnchain,
terminateContrattoOnchain
} =require("../config/services.js");

const kafka = new Kafka({
  clientId: "onchain-worker",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "onchain-group" });

async function startConsumer() {
  await consumer.connect();

  // iscrizione ai topic
  await consumer.subscribe({ topic: "edc.asset", fromBeginning: false });
  await consumer.subscribe({ topic: "edc.policy" });
  await consumer.subscribe({ topic: "edc.dataoffer" });
  await consumer.subscribe({ topic: "edc.contract" });
  await consumer.subscribe({ topic: "edc.transfer" });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log(`📥 Evento ricevuto da ${topic}:`, data.type);

      try {
        switch (data.type) {

          case "ASSET_CREATED":
            await contract.registerAssetOnChain({
              nodeId: data.nodeId,
              assetId: data.assetId,
              assetTitle: data.assetTitle
            });
            break;

          case "ASSET_UPDATED":
            await contract.modifyAssetOnChainFromWebhook(
              data.payload,
              data.nodeId
            );
            break;

          case "POLICY_CREATED":
            await contract.registerPolicyOnChainFromWebhook(
              data.nodeId,
              data.payload.id,
              data.payload.content
            );
            break;

          case "TRANSFER_CREATED":
            await contract.requestDataTransfer(
              data.transferId,
              data.nodeId,
              data.contractId,
              data.terminationStatus,
              data.assetId
            );
            break;

          case "TRANSFER_TERMINATED":
            await contract.completeDataTransfer(
              data.transferId,
              data.reason
            );
            break;

          // ... aggiungere DataOffer, Contratto ecc.
        }
      } catch (err) {
        console.error("❌ Errore esecuzione smart contract:", err);
        // qui puoi aggiungere una dead letter queue
      }
    },
  });
}

startConsumer();