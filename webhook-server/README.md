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

### ✅ You must always use the ABI that matches the deployed smart contract.

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
