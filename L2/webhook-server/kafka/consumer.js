const { Kafka } = require("kafkajs");
const { ethers } = require("ethers"); // ethers.js v6
const crypto = require("crypto");
const path = require("path");
const { Pool } = require("pg");
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
const provider = new ethers.JsonRpcProvider("http://localhost:9555");
const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

const CONTRACT_ADDRESS = "0x743fd0040c69ca66a7494685424197adea4e4170";

const CONTRACT_ABI = require("../abi/ExampleContract");

const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "blockchain_events",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  max: 20,              // numero max connessioni
  idleTimeoutMillis: 30000, // tempo di inattività prima del rilascio
  connectionTimeoutMillis: 2000 // timeout connessione
});

// Test connessione
pool.connect()
  .then(() => console.log("🐘 PostgreSQL connesso correttamente"))
  .catch(err => console.error("❌ Errore connessione PostgreSQL:", err.message));


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
              contract,
              db:pool,
              provider
            });
            break;

          case "ASSET_UPDATED":
            await modifyAssetOnChainFromWebhook(
              data.payload,
              data.nodeId,
              contract,
              pool
            );
            break;

          case "POLICY_CREATED":
            await registerPolicyOnChainFromWebhook(
              data.nodeId,
              data.policyId,
              data.policyContent,
              contract,
              pool
            );
            break;
          case "POLICY_UPDATED":
            await modifyPolicyOnchainFromWebhook(
              data.payload,
              data.nodeId,
              contract,
              pool
            );
            break;
          case "DATAOFFER_CREATED":
            await registerDataofferOnChain(
              contract,
              data.nodeId,
              data.payload,
              data.accessPolicyId,
              data.contractPolicyId,
              data.assetSelector,
              pool
            );
            break;
          case "DATAOFFER_UPDATED":
            await modifyDataofferOnChain(
              contract,
              data.nodeId,
              data.payload,
              data.rawPort,
              pool
            );
            break;

          case "CONTRACT_CREATED":
            await registerContrattoOnchain(
              contract,
              data.nodeId,
              data.payload,
              pool
            );
            break;

          case "CONTRACT_TERMINATED":
            await terminateContrattoOnchain(
              contract,
              data.nodeId,
              data.rawPort,
              pool
            );
            break;

          case "TRANSFER_CREATED":
            await registerTransferOnchain(
              data.contractId,
              data.nodeId,
              data.assetid,
              data.transferid,
              contract,
              pool
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