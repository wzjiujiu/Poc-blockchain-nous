
#  Dataspace Registry Smart Contracts  
### Comparison of Two Versions + Common Architecture Overview

This repository contains **two versions** of the `ExampleContract` smart contract used to manage a **dataspace registry** on the blockchain.

Although both versions implement the **same registry architecture**, they differ in:

- Asset model  
- Data types (`string` vs `bytes32`)  
- MinIO support  
- Gas optimization  

This README explains:

1. The **common shared logic** between both contracts  
2. The **differences** between Version A and Version B  
3. Why someone would choose either version  

---

#  1. Overview of the Dataspace Registry Architecture (Common to Both Versions)

Both contracts implement a unified registry composed of **five interoperable modules**:

---

##  1. Asset Registry  
Stores all digital assets for each `nodeId`.

Each asset contains:

- An asset ID  
- The logical node ID  
- Registrar address (the relayer that registered it)  
- Timestamp  
- Asset title  

Functions common to both versions:

- `registerAsset`
- `modifyAsset`
- `getAsset`
- `assetExists`

Events:

- `AssetRegistered`
- `AssetModified`

---

##  2. Policy Registry  
Represents access and usage policies for assets.

Functions:

- `registerPolicy`
- `modifyPolicy`
- `getPolicy`
- `policyExists`

Events:

- `PolicyRegistered`
- `PolicyModified`

---

##  3. Data Offer Registry  
Links policies and assets into a commercial or technical offer.

Functions:

- `registerDataoffer`
- `modifyDataoffer`
- `getDataoffer`
- `dataofferExists`

Events:

- `DataofferRegistered`
- `DataofferModified`

---

##  4. Contract Negotiation Registry ("Contratto")  
Tracks contract negotiation progress between two nodes.

Functions:

- `registerContratto`
- `updateContrattoState`
- `getContratto`
- `contrattoExists`

Events:

- `ContrattoRegistered`
- `ContrattoStateUpdated`

---

##  5. Data Transfer Registry  
Tracks the actual execution of a data exchange.

Functions:

- `requestDataTransfer`
- `completeDataTransfer`
- `getTransfer`
- `transferExists`

Events:

- `DataTransferRequested`
- `DataTransferCompleted`

---

#  2. Common Logical Patterns Between Both Versions

Regardless of which version you use, each module follows the same design pattern:

### ✔ `registerX()`  
Creates a new entity, validates uniqueness, emits `XRegistered`.

### ✔ `modifyX()`  
Updates an existing entity, checks that the caller is the original registrar, emits `XModified`.

### ✔ `getX()`  
Returns the full struct, reverting if not found.

### ✔ `XExists()`  
Boolean existence check.

This architecture gives the registry:

- Consistent behavior  
- Easy integration  
- Predictable event structure  
- Uniform API across modules  

---

#  3. Differences Between Version A and Version B

The core logic is the same, but **how assets are stored differs significantly**.

Below is the complete comparison.

---

#  **Version A — String-based, Full Features, MinIO Support**

###  Asset model uses **string identifiers**
```solidity
string id;
string title;
uint256 timestamp;
