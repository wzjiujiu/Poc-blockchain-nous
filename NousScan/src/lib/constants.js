export const CONTRACT_ADDRESS = "0x0bcc0aa6bb316af0e04e90f1c869362805caa873";

// ABI minimo necessario per leggere gli eventi
export const ABI = [
  // ───────────── Initialization ─────────────
  {
    "inputs": [
      { "internalType": "address", "name": "roleManagerAddress", "type": "address" },
      { "internalType": "address", "name": "upgradeControlAddress", "type": "address" }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },

  // ───────────── Asset ─────────────
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "assetId", "type": "string" },
      { "internalType": "string", "name": "assetTitle", "type": "string" }
    ],
    "name": "registerAsset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "assetId", "type": "string" },
      { "internalType": "string", "name": "newTitle", "type": "string" }
    ],
    "name": "modifyAsset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "assetId", "type": "string" }
    ],
    "name": "getAsset",
    "outputs": [
      { "internalType": "string", "name": "id", "type": "string" },
      { "internalType": "bytes32", "name": "nId", "type": "bytes32" },
      { "internalType": "address", "name": "registrar", "type": "address" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "internalType": "string", "name": "title", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "assetId", "type": "string" }
    ],
    "name": "assetExists",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },

  // ───────────── Events ─────────────
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "registrar", "type": "address" },
      { "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "indexed": false, "internalType": "string", "name": "assetId", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "title", "type": "string" }
    ],
    "name": "AssetRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "indexed": false, "internalType": "string", "name": "assetId", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "newTitle", "type": "string" }
    ],
    "name": "AssetModified",
    "type": "event"
  }

  // Puoi continuare con Policy, DataOffer, Contratto, DataTransfer seguendo lo stesso schema
];