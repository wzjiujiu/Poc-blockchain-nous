# Interface High-Level Explanation

This project includes:

- **Two smart contracts**
  - **Contract Version A** – string-based assets + MinIO support  
  - **Contract Version B** – bytes32-based assets, no MinIO, gas optimized  

- **Two ABIs**
  - **ABI A** – must be used with Contract Version A  
  - **ABI B** – must be used with Contract Version B  

Each ABI is tightly coupled to its corresponding contract.  
This means:

###  You must always use the ABI that matches the deployed smart contract.

If you deploy Version A → use ABI A  
If you deploy Version B → use ABI B  

Using the wrong ABI leads to:

- Wrong parameter encoding (string vs bytes32)  
- Failed transactions  
- Event decoding errors  
- Incorrect or missing logs  
- Unexpected reverts  

**Rule of thumb:**  
> The ABI must match the exact contract version deployed on-chain.

---
- Link to the ABI : [link](https://github.com/wzjiujiu/Poc-blockchain-nous/tree/main/webhook-server/abi)
- Link to the Smart contract : [link](https://github.com/wzjiujiu/Poc-blockchain-nous/tree/main/evm-bridge-main/smart-contracts/contracts)

---

###  Env file parameters

```bash
WALLET_PRIVATE_KEY=[your own wallet private key]
PROVIDER_EDC_MANAGEMENT_URL=http://localhost:11000/api/management
CONTRACT_ADD_DEPLOYED=0xd0fc4e931b6d67bcecc65c2afec2faa278d0d769
```
---
###  ABI configuration

for Webhook solution is in the index.js

```bash
const CONTRACT_ABI = require("./abi/ExampleContract");
```

for kafka solution is in the kafka/consumer.js
```bash
const CONTRACT_ABI = require("./abi/ExampleContract");
```
