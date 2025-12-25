const { ethers } = require("ethers");
const CONTRACT_ABI = require("../abi/ExampleContract");

const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  CONTRACT_ABI,
  wallet
);

const NODE_ID_CONSUMER = ethers.keccak256(
  ethers.toUtf8Bytes("localhost:11000")
);

const NODE_ID_PRODUCER = ethers.keccak256(
  ethers.toUtf8Bytes("localhost:22000")
);

async function printBalance() {
  const balance = await provider.getBalance(wallet.address);
  const etherBalance = ethers.formatEther(balance);

  console.log(
    `💰 Balance wallet (${wallet.address}): ${etherBalance} ETH`
  );
}

module.exports = {
  provider,
  wallet,
  contract,
  NODE_ID_CONSUMER,
  NODE_ID_PRODUCER,
  printBalance
};