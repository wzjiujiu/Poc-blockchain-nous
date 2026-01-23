const crypto = require("crypto");
const { ethers } = require("ethers"); // ethers.js v6
const { Pool } = require("pg");
require("dotenv").config();
const fs = require("fs"); // Importa il modulo filesystem

const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

// Usa il nodo Besu locale
const provider = new ethers.JsonRpcProvider("http://localhost:9555");
const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

const CONTRACT_ADDRESS = "0x743fd0040c69ca66a7494685424197adea4e4170";
const CONTRACT_ABI = require("./abi/ExampleContract");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "blockchain_events",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

pool.connect()
  .then(() => console.log("🐘 PostgreSQL connesso correttamente"))
  .catch(err => console.error("❌ Errore connessione PostgreSQL:", err.message));

const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

async function calculateMerkleRootFromDB(pool, contract) {
  try {
    const res = await pool.query(`
      SELECT node_id, asset_id
      FROM l2_assets
      ORDER BY timestamp ASC
    `);

    if (res.rows.length === 0) {
      console.log("❌ Nessun asset trovato nel DB");
      return null;
    }

    const nodeMap = new Map();
    for (const row of res.rows) {
      const nodeBuffer = row.node_id;
      if (!Buffer.isBuffer(nodeBuffer)) continue;
      const nodeHex = ethers.hexlify(nodeBuffer);
      if (!nodeMap.has(nodeHex)) nodeMap.set(nodeHex, []);
      nodeMap.get(nodeHex).push(row.asset_id);
    }

    const assetNodeIds = Array.from(nodeMap.keys());
    const assetNodeId = assetNodeIds[0];
    const assetIds = Array.from(nodeMap.values());
    const nodeAssets = assetIds[0];

    console.log("📦 Node IDs array:", assetNodeIds);
    console.log("📄 Asset IDs array:", assetIds);

    // Calcola la Merkle root on-chain
    const root = await contract.getMerkleRoot(assetNodeId, nodeAssets);
    console.log("🔗 Merkle Root calcolato:", root);

    return { root, assetNodeIds, assetIds };
  } catch (err) {
    console.error("❌ Errore calculateMerkleRootFromDB:", err);
    throw err;
  }
}

// Esempio di uso della funzione
(async () => {
   const { root, assetNodeIds, assetIds } = await calculateMerkleRootFromDB(pool, contract);
  console.log("✅ Merkle root finale:", root);

  // Salva in un file JSON
  fs.writeFileSync("merkleRoot.json", JSON.stringify({ merkleRoot: root }, null, 2));
  console.log("💾 Merkle root salvato in merkleRoot.json");

})();

