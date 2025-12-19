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

### STEP 3: CStart the Webhook Server
```bash
cd webhook-server
node index.js
```
