
# 📘 ABI v1 vs ABI v2 Documentation

This document explains the two smart contract ABIs used in the project and highlights their structural differences.

The two ABIs represent **two versions of the contract interface**:

- **ABI v1** – string-based asset identifiers with MinIO support
- **ABI v2** – bytes32-based asset identifiers optimized for blockchain efficiency

---

# Overview

Both ABIs expose the same core modules:

- Initialization
- Asset
- Policy
- Data Offer
- Contratto
- Data Transfer
- Events

However, the **Asset module and MinIO integration differ significantly** between the two versions.

---

# ABI v1 ExampleContract.js(String-Based + MinIO Support)

## Key Characteristics

- Uses `string` for:
  - `assetId`
  - `assetTitle`
- Supports **MinIO-based asset registration**
- Includes `dataHash` fields for storage verification
- Uses `uint256` timestamps
- Human-readable identifiers

## Modules Included

- Initialization
- Asset
- Assetminio
- Policy
- Data Offer
- Contratto
- Data Transfer
- Events (including MinIO events)

---

# ABI v2 ExampleContract1.js(Bytes32-Based Optimized Version)

## Key Characteristics

- Uses `bytes32` for:
  - `assetId`
  - `assetTitle`
- Uses `uint64` timestamps for assets
- More **gas efficient**
- Requires hashing of asset identifiers before interacting with the contract

this ABI is used to test the gas estimation by applying these change in the contract

Example hashing:

```javascript
const assetId = ethers.keccak256(
  ethers.toUtf8Bytes("asset_001")
);