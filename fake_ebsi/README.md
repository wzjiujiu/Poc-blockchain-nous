# 🧪 EBSI Emulator

A lightweight emulator of the **European Blockchain Services Infrastructure (EBSI)** designed for developers who want to experiment with **DIDs**, **JWS**, **keys**, and **signature verification** — without interacting with the official EBSI infrastructure.

This emulator provides:
- EBSI-like DID generation
- Public/private key management
- JWS signing (ES256 / secp256k1)
- JWS verification
- Simple local storage (JSON file or database)
- REST API for integration

---

## 🚀 Features

### ✔️ 1. **EBSI-like DID Generation**
The emulator generates DIDs in the format:
- did:ebsi:<identifier>
Each DID is associated with:
- a private key  
- a public key  
- metadata  
- a compliant `kid` for JWS headers  

Example record:

```json
{
  "did": "did:ebsi:EU5FqsLPC7t-D2KJ",
  "keys": {
    "public": "...",
    "private": "..."
  }
}
```
---

### ✔️ 2. JWS Creation
The emulator can sign arbitrary JSON payloads using the DID's private key.

Generated JWS object:

```json
{
  "protected": "<base64url header>",
  "payload": "<base64url payload>",
  "signature": "<signature>"
}
```

### ✔️ 3. JWS Verification

The /jws/verify endpoint:

- Loads the DID
- Retrieves the associated public key
- Reconstructs the compact JWS
- Verifies the signature

Successful verification:
```json
{
  "verified": true
}
```
If any part (protected header, payload, signature) is altered:
```json
{
  "verified": false
}
```

### ✔️ 4.Architecture overview

```json
┌────────────────────┐
│      Client App     │
└──────────┬──────────┘
           │ REST API
┌──────────▼──────────┐
│     EBSI Emulator    │
│  - DID registry      │
│  - Key management    │
│  - JWS signing       │
│  - JWS verification  │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ Local Storage (FS/DB)│
└──────────────────────┘
```