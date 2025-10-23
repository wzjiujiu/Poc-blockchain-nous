# Poc-blockchain-nous
PoC Blockchain - NOUS
A blockchain-based Proof of Concept implementation for vulnerable road user safety systems, leveraging 5G MEC architecture and Ethereum Virtual Machine technology.

📖 Overview
This repository contains a comprehensive Proof of Concept for a blockchain solution focused on preventing accidents involving vulnerable road users (pedestrians, cyclists, etc.) through 5G Mobile Edge Computing and distributed ledger technology.

🏗️ Architecture Components
Core Services
evm-bridge-main - Ethereum Virtual Machine bridge for cross-chain interoperability

ganache - Local blockchain network for development and testing

minio - High-performance object storage for data management

sovity - Integration with Sovity platform services

webbook-server - Webhook server for real-time event processing

Key Documentation
Grant Agreement - Official Horizon Europe grant documentation (GAP-101135927)

Project Proposal - Detailed project scope and objectives

5G MEC Architecture - Technical design for Mobile Edge Computing implementation

Vulnerable Road User Safety - Research on accident prevention systems

UML Diagrams - Comprehensive system architecture and workflow diagrams

🚀 Quick Start
Prerequisites
Node.js (check individual component requirements)

Docker (recommended for containerized services)

Git

Installation
Clone the repository

bash
git clone <repository-url>
cd poc-blockchain-nous
Set up local blockchain

bash
cd ganache
npm install
npm start
Configure EVM Bridge

bash
cd evm-bridge-main
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
Start object storage

bash
cd minio
docker-compose up -d
Launch webhook server

bash
cd webbook-server
npm install
npm start
🔧 Configuration
Each component contains its own configuration files. Key configuration areas include:

Blockchain network settings (Ganache)

Bridge parameters (EVM Bridge)

Storage configurations (MinIO)

Webhook endpoints (Webhook Server)

Sovity platform integration
