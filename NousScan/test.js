import { ethers } from "ethers";

// Connettersi al nodo Besu
const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // o endpoint Besu reale

async function test() {
  const latestBlock = await provider.getBlockNumber();
  console.log("Ultimo blocco:", latestBlock);

  let foundTxs = [];
  let blockNum = latestBlock;

  while (foundTxs.length < 5 && blockNum >= 0) {
    const block = await provider.getBlock(blockNum, true); // <-- true include transazioni
    const nonZeroTxs = block.transactions.filter(tx => tx.value.toNumber() > 0);

    foundTxs.push(...nonZeroTxs);
    blockNum--;
  }

  console.log("Ultime 5 transazioni con value > 0:");
  console.log(foundTxs.slice(0, 5));
}

test();