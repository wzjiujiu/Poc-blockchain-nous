const { Kafka } = require("kafkajs");
const { ethers } = require("ethers"); // ethers.js v6
const crypto = require("crypto");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const {registerAssetOnChain,
modifyAssetOnChainFromWebhook,
registerPolicyOnChainFromWebhook,
modifyPolicyOnchainFromWebhook,
registerDataofferOnChain,
modifyDataofferOnChain,
registerContrattoOnchain,
terminateContrattoOnchain
} =require("../config/serviceskafka.js");

const kafka = new Kafka({
  clientId: "onchain-worker",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "onchain-group" });

const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

// Usa il nodo Besu locale (porta 8545)
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

const CONTRACT_ADDRESS = "0x0bcc0aa6bb316af0e04e90f1c869362805caa873";

const CONTRACT_ABI = require("../abi/ExampleContract");

const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);


async function startConsumer() {
  await consumer.connect();

  // iscrizione ai topic
  await consumer.subscribe({ topic: "edc.addasset", fromBeginning: false });
  await consumer.subscribe({ topic: "edc.modifyasset", fromBeginning: false });
  await consumer.subscribe({ topic: "edc.addpolicy" });
  await consumer.subscribe({ topic: "edc.modifypolicy" });
  await consumer.subscribe({ topic: "edc.adddataoffer" });
  await consumer.subscribe({ topic: "edc.modifydataoffer" });
  await consumer.subscribe({ topic: "edc.addcontract" });
  await consumer.subscribe({ topic: "edc.modifycontract" });
  await consumer.subscribe({ topic: "edc.transfer" });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log(`📥 Evento ricevuto da ${topic}:`, data.type);

      try {
        switch (data.type) {

          case "ASSET_CREATED":
           console.log(data);
            await registerAssetOnChain({
              nodeId: data.nodeId,
              assetId: data.assetId,
              assetTitle: data.assetTitle,
              contract
            });
            break;

          case "ASSET_UPDATED":
            await modifyAssetOnChainFromWebhook(
              data.payload,
              data.nodeId,
              contract
            );
            break;

          case "POLICY_CREATED":
            await registerPolicyOnChainFromWebhook(
              data.nodeId,
              data.payload.id,
              data.policyContent,
              contract
            );
            break;
          case "POLICY_UPDATED":
            await modifyPolicyOnchainFromWebhook(
              data.payload,
              data.nodeId,
              contract
            );
            break;
          case "DATAOFFER_CREATED":
            await registerDataofferOnChain(
              contract,
              data.nodeId,
              data.payload,
              data.accessPolicyId,
              data.contractPolicyId,
              data.assetSelector
            );
            break;
          case "DATAOFFER_UPDATED":
            await modifyDataofferOnChain(
              contract,
              data.nodeId,
              data.payload,
              data.rawPort
            );
            break;

          case "CONTRACT_CREATED":
            await registerContrattoOnchain(
              contract,
              data.nodeId,
              data.payload
            );
            break;

          case "CONTRACT_TERMINATED":
            await terminateContrattoOnchain(
              contract,
              data.nodeId,
              data.rawPort
            );
            break;

        }
      } catch (err) {
        console.error("❌ Errore esecuzione smart contract:", err);
        // qui puoi aggiungere una dead letter queue
      }
    },
  });
}

startConsumer();