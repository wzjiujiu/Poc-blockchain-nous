module.exports = [

  // ───────────── Initialization ─────────────
  "function initialize(address roleManagerAddress, address upgradeControlAddress) external",

  // ───────────── Asset ─────────────
  "function registerAsset(bytes32 nodeId, string assetId, string assetTitle) external",
  "function modifyAsset(bytes32 nodeId, string assetId, string newTitle) external",
  "function getAsset(bytes32 nodeId, string assetId) external view returns (bytes32 id, bytes32 nId, address registrar, uint64 timestamp, bytes32 title)",
  "function assetExists(bytes32 nodeId, string assetId) external view returns (bool)",

  // ───────────── Policy ─────────────
  "function registerPolicy(bytes32 nodeId, string policyId, string policyTitle) external",
  "function modifyPolicy(bytes32 nodeId, string policyId, string newTitle) external",
  "function getPolicy(bytes32 nodeId, string policyId) external view returns (string id, bytes32 nId, address registrar, uint256 timestamp, string title)",
  "function policyExists(bytes32 nodeId, string policyId) external view returns (bool)",

  // ───────────── Data Offer ─────────────
  "function registerDataoffer(bytes32 nodeId, string offerId, string accessPolicyId, string contractPolicyId, string assetSelector) external",
  "function modifyDataoffer(bytes32 nodeId, string offerId, string newAccessPolicyId, string newContractPolicyId, string newAssetSelector) external",
  "function getDataoffer(bytes32 nodeId, string offerId) external view returns (string id, bytes32 nId, address registrar, uint256 timestamp, string accessPolicyId, string contractPolicyId, string assetSelector)",
  "function dataofferExists(bytes32 nodeId, string offerId) external view returns (bool)",

  // ───────────── Contratto ─────────────
  "function registerContratto(bytes32 nodeId, string contractNegotiationId, string counterpartyId, uint256 createdAt, string state) external",
  "function updateContrattoState(bytes32 nodeId, string contractNegotiationId, string newState) external",
  "function getContratto(bytes32 nodeId, string contractNegotiationId) external view returns (string id, bytes32 nId, string counterpartyId, uint256 timestamp, uint256 createdAt, string state)",
  "function contrattoExists(bytes32 nodeId, string contractNegotiationId) external view returns (bool)",

  // ───────────── Data Transfer ─────────────
  "function requestDataTransfer(string transferId, bytes32 nodeId, string contractAgreementId, string statusout,string assetId) external",
  "function completeDataTransfer(string transferId, bytes32 dataHash) external",
  "function getTransfer(string transferId) external view returns (string id, bytes32 nodeId, string contractAgreementId, string assetId, bytes32 dataHash, uint8 status, uint256 timestamp)",
  "function transferExists(string transferId) external view returns (bool)",

  // ───────────── Events ─────────────
  "event AssetRegistered(address indexed registrar, bytes32 indexed nodeId, bytes32 assetId, uint64 timestamp, bytes32 title)",
  "event AssetModified(bytes32 indexed nodeId, bytes32 assetId, uint64 timestamp, bytes32 newTitle)",
  "event PolicyRegistered(address indexed registrar, bytes32 indexed nodeId, string policyId, uint256 timestamp, string title)",
  "event PolicyModified(bytes32 indexed nodeId, string policyId, uint256 timestamp, string newTitle)",
  "event DataofferRegistered(address indexed registrar, bytes32 indexed nodeId, string offerId, uint256 timestamp, string accessPolicyId, string contractPolicyId, string assetSelector)",
  "event DataofferModified(bytes32 indexed nodeId, string offerId, uint256 timestamp, string newAccessPolicyId, string newContractPolicyId, string newAssetSelector)",
  "event ContrattoRegistered(address indexed registrar, bytes32 indexed nodeId, string contractNegotiationId, string counterpartyId, uint256 createdAt, string state)",
  "event ContrattoStateUpdated(bytes32 indexed nodeId, string contractNegotiationId, uint256 timestamp, string newState)",
  "event DataTransferRequested(string transferId, string assetId, address indexed consumer, uint256 timestamp,TransferStatus status)",
  "event DataTransferCompleted(string transferId, bytes32 dataHash, uint256 timestamp)"
];