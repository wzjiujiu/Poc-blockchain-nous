const Minio = require('minio');
const fs = require('fs');
const https = require('https');
const http = require('http');
const crypto = require('crypto');
require("dotenv").config();
const { ethers } = require("ethers"); // ethers.js v6

const { parseNestedJSON, cleanKeys ,escapeHtml,renderAsList} = require("./utils/parser.js");
const {registerAssetOnChain,
modifyAssetOnChainFromWebhook,
registerAssetOnChainMinio,
modifyAssetOnChainFromWebhookMinio,
registerPolicyOnChainFromWebhook,
modifyPolicyOnchainFromWebhook,
registerDataofferOnChain,
modifyDataofferOnChain,
registerContrattoOnchain,
terminateContrattoOnchain,
registerTransferOnchain,
terminateTransferOnchain,
registerAssetOnChainGasTest,
modifyAssetOnChainFromWebhookGasTest
} =require("./config/services.js");

const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

// Usa il nodo Besu locale (porta 8545)
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

//const CONTRACT_ADDRESS = "0x0bcc0aa6bb316af0e04e90f1c869362805caa873";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADD_DEPLOYED;

const CONTRACT_ABI = require("./abi/ExampleContract");


const NODE_ID_PROVIDER = ethers.keccak256(
  ethers.toUtf8Bytes("localhost:11000")
);

const NODE_ID_CONSUMER = ethers.keccak256(
  ethers.toUtf8Bytes("localhost:22000")
);

const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

// Configura MinIO client
const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'admin12345'
});

let assetid='minio-1'
let assetTitle='minio-test'

// Genera presigned URL + scarica file + hash
async function generaLink(assetid,assetTitle) {
  try {
    const url = await minioClient.presignedGetObject(
      'masa',            // bucket
      '0.dump',          // oggetto
      60 * 60,           // durata: 1 ora
      {
        'response-content-type': 'application/octet-stream',
        'response-content-disposition': 'attachment; filename="documento.pdf"'
      }
    );
     const url1 = await minioClient.presignedGetObject(
      'masa',            // bucket
      '0mod.dump',          // oggetto
      60 * 60,           // durata: 1 ora
      {
        'response-content-type': 'application/octet-stream',
        'response-content-disposition': 'attachment; filename="documento.pdf"'
      }
    );

     const url2 = await minioClient.presignedGetObject(
      'masa',            // bucket
      '0nomod.dump',          // oggetto
      60 * 60,           // durata: 1 ora
      {
        'response-content-type': 'application/octet-stream',
        'response-content-disposition': 'attachment; filename="documento.pdf"'
      }
    );


    console.log("Presigned URL:", url);

    // Nome file locale
    const fileName = '0.dump';
    const fileName1='0mod.dump'
    const fileName2='0nomod.dump'

    // Scarica il file
    await downloadFile(url, fileName);
    await downloadFile(url1,fileName1);
    await downloadFile(url2,fileName2);

    console.log("File scaricato con successo!");

    // Calcola HASH del file scaricato
    const hash = await calculateFileHash(fileName);
    const hash1=await calculateFileHash(fileName1);
    const hash2=await calculateFileHash(fileName2);

    console.log("SHA-256 hash del file:", hash);
    console.log("SHA-256 hash del file:", hash1);
    console.log("SHA-256 hash del file:", hash2);
    await registerAssetOnChainMinio({
  nodeId: NODE_ID_PROVIDER,
  assetId: assetid,      // Mappa assetid su assetId
  assetTitle: assetTitle,
  dataHash: "0x" + hash,        // Mappa hash su dataHash
  contract: contract
});

  } catch (err) {
    console.error("Errore:", err);
  }
}

// Funzione che scarica un file da un URL
function downloadFile(url, outputName) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;

    const file = fs.createWriteStream(outputName);

    mod.get(url, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Errore download: ${res.statusCode}`));
      }

      res.pipe(file);

      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(outputName, () => {}); // cancella file incompleto
      reject(err);
    });
  });
}

// Funzione che calcola SHA-256 del file
function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);

    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

generaLink(assetid,assetTitle);
