# PoC Blockchain – NOUS  
**poc-blockchain-nous**

A blockchain-based **Proof of Concept (PoC)** for vulnerable road user (VRU) safety systems, leveraging **Ethereum Virtual Machine (EVM)** technology, **5G Mobile Edge Computing (MEC)**, and **distributed ledger technologies**.

---

## Overview

This repository contains a comprehensive Proof of Concept focused on improving **road safety for vulnerable road users** (pedestrians, cyclists, etc.) by combining:

- Blockchain-based trust and data integrity  
- 5G Mobile Edge Computing for low-latency processing  
- Event-driven architectures for real-time safety alerts  

The project explores how decentralized services can support **accident prevention**, **secure data sharing**, and **cross-platform interoperability**.

---

## Architecture Components

### Core Services

| Component | Description |
|---------|-------------|
| **evm-bridge-main** | Ethereum Virtual Machine bridge for cross-chain interoperability |
| **ganache** | Local blockchain network for development and testing |
| **minio** | High-performance object storage for data management |
| **sovity** | Integration with Sovity platform services |
| **webhook-server** | Node.js webhook server for real-time event processing |

---

##  Key Documentation

- **Grant Agreement** – Horizon Europe Grant Agreement (GAP-101135927)
- **Project Proposal** – Detailed project scope and objectives
- **5G MEC Architecture** – Technical design for Mobile Edge Computing
- **Vulnerable Road User Safety** – Research on accident prevention systems
- **UML Diagrams** – System architecture and workflow diagrams

---

##  Quick Start

### Prerequisites

Make sure the following tools are installed:

- Node.js (check individual component requirements)
- Docker (recommended)
- Postman
- Git

---

##  Setup Instructions

### STEP 1: Clone the Repository

```bash
git clone https://github.com/<your-org>/poc-blockchain-nous.git
cd poc-blockchain-nous

```
### STEP 2: Initialize EVM Bridge & Deploy Smart Contracts
The EVM Bridge setup, test node initialization, and smart contract deployment are maintained in a separate repository.

Please follow the official tutorial here:
https://gitlab.eclipse.org/eclipse-research-labs/nous-project/common-administration-services/decentralised-services/evm-bridge/-/tree/main?ref_type=heads

This guide covers:

Initializing the local blockchain test node

Deploying smart contracts on-chain

Verifying the deployment

### STEP 3: Start the Webhook Server
Before starting the webserver please fill right:

your WALLET PRIVATE KEY in the .env file present in the folder webhook-server


edit the index.js line 111 const CONTRACT_ADDRESS = "0xd0fc4e931b6d67bcecc65c2afec2faa278d0d769" with your own deployed contract address

```bash
cd webhook-server
node index.js
```

### STEP 4: How to Test
To test the end-to-end workflow, REST APIs are used to simulate user behavior.

Before proceeding, please review the Dataspace Documentation (2).docx located in the root directory of this repository, as it describes the expected workflow and API interactions.

Sovity has provided a Postman API collection that can be used to execute and validate the required REST calls.

To start the Sovity components, a local demo deployment was used for testing and POC purposes.

Please refer to the official Sovity documentation for detailed setup instructions:
https://github.com/sovity/edc-ce/tree/main/docs/deployment-guide/goals/local-demo-ce

After starting local demo throught Docker you can see at [localhost 11000](http://localhost:11000/)  this frontend:
![Sovity Local frontend](docs/sovity.jpg)

### Implemented Actions

| ACTION | COMPONENTS |
|---------|-------------|
| **ADD** | ASSET,POLICY |
| **MODIFY** | ASSET,POLICY |
| **DELETE** |  |


