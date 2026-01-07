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

  // ───────────── Policy ─────────────
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "policyId", "type": "string" },
      { "internalType": "string", "name": "policyTitle", "type": "string" }
    ],
    "name": "registerPolicy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "policyId", "type": "string" },
      { "internalType": "string", "name": "newTitle", "type": "string" }
    ],
    "name": "modifyPolicy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "policyId", "type": "string" }
    ],
    "name": "getPolicy",
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
      { "internalType": "string", "name": "policyId", "type": "string" }
    ],
    "name": "policyExists",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },

  // ───────────── Data Offer ─────────────
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "offerId", "type": "string" },
      { "internalType": "string", "name": "accessPolicyId", "type": "string" },
      { "internalType": "string", "name": "contractPolicyId", "type": "string" },
      { "internalType": "string", "name": "assetSelector", "type": "string" }
    ],
    "name": "registerDataoffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "offerId", "type": "string" },
      { "internalType": "string", "name": "newAccessPolicyId", "type": "string" },
      { "internalType": "string", "name": "newContractPolicyId", "type": "string" },
      { "internalType": "string", "name": "newAssetSelector", "type": "string" }
    ],
    "name": "modifyDataoffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "offerId", "type": "string" }
    ],
    "name": "getDataoffer",
    "outputs": [
      { "internalType": "string", "name": "id", "type": "string" },
      { "internalType": "bytes32", "name": "nId", "type": "bytes32" },
      { "internalType": "address", "name": "registrar", "type": "address" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "internalType": "string", "name": "accessPolicyId", "type": "string" },
      { "internalType": "string", "name": "contractPolicyId", "type": "string" },
      { "internalType": "string", "name": "assetSelector", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "offerId", "type": "string" }
    ],
    "name": "dataofferExists",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },

  // ───────────── Contratto ─────────────
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "contractNegotiationId", "type": "string" },
      { "internalType": "string", "name": "counterpartyId", "type": "string" },
      { "internalType": "uint256", "name": "createdAt", "type": "uint256" },
      { "internalType": "string", "name": "state", "type": "string" }
    ],
    "name": "registerContratto",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "contractNegotiationId", "type": "string" },
      { "internalType": "string", "name": "newState", "type": "string" }
    ],
    "name": "updateContrattoState",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "contractNegotiationId", "type": "string" }
    ],
    "name": "getContratto",
    "outputs": [
      { "internalType": "string", "name": "id", "type": "string" },
      { "internalType": "bytes32", "name": "nId", "type": "bytes32" },
      { "internalType": "string", "name": "counterpartyId", "type": "string" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "internalType": "uint256", "name": "createdAt", "type": "uint256" },
      { "internalType": "string", "name": "state", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "contractNegotiationId", "type": "string" }
    ],
    "name": "contrattoExists",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },

  // ───────────── Data Transfer ─────────────
  {
    "inputs": [
      { "internalType": "string", "name": "transferId", "type": "string" },
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "contractAgreementId", "type": "string" },
      { "internalType": "string", "name": "statusout", "type": "string" },
      { "internalType": "string", "name": "assetId", "type": "string" }
    ],
    "name": "requestDataTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "transferId", "type": "string" },
      { "internalType": "bytes32", "name": "dataHash", "type": "bytes32" }
    ],
    "name": "completeDataTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "transferId", "type": "string" }
    ],
    "name": "getTransfer",
    "outputs": [
      { "internalType": "string", "name": "id", "type": "string" },
      { "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "internalType": "string", "name": "contractAgreementId", "type": "string" },
      { "internalType": "string", "name": "assetId", "type": "string" },
      { "internalType": "bytes32", "name": "dataHash", "type": "bytes32" },
      { "internalType": "uint8", "name": "status", "type": "uint8" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "transferId", "type": "string" }
    ],
    "name": "transferExists",
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
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "registrar", "type": "address" },
      { "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "indexed": false, "internalType": "string", "name": "policyId", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "title", "type": "string" }
    ],
    "name": "PolicyRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "indexed": false, "internalType": "string", "name": "policyId", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "newTitle", "type": "string" }
    ],
    "name": "PolicyModified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "registrar", "type": "address" },
      { "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "indexed": false, "internalType": "string", "name": "offerId", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "accessPolicyId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "contractPolicyId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "assetSelector", "type": "string" }
    ],
    "name": "DataofferRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "indexed": false, "internalType": "string", "name": "offerId", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "newAccessPolicyId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "newContractPolicyId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "newAssetSelector", "type": "string" }
    ],
    "name": "DataofferModified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "registrar", "type": "address" },
      { "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "indexed": false, "internalType": "string", "name": "contractNegotiationId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "counterpartyId", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "createdAt", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "state", "type": "string" }
    ],
    "name": "ContrattoRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "bytes32", "name": "nodeId", "type": "bytes32" },
      { "indexed": false, "internalType": "string", "name": "contractNegotiationId", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "newState", "type": "string" }
    ],
    "name": "ContrattoStateUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "transferId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "assetId", "type": "string" },
      { "indexed": true, "internalType": "address", "name": "consumer", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "indexed": false, "internalType": "uint8", "name": "status", "type": "uint8" }
    ],
    "name": "DataTransferRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "transferId", "type": "string" },
      { "indexed": false, "internalType": "bytes32", "name": "dataHash", "type": "bytes32" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "DataTransferCompleted",
    "type": "event"
  }
];
