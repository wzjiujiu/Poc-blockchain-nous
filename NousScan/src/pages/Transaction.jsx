import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "../lib/constants"; // importa il tuo ABI

export default function Transactions() {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // nodo Besu
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    const fetchEvents = async () => {
      const filter = contract.filters.AssetRegistered(); // esempio evento
      const events = await contract.queryFilter(filter, 0, "latest");
      setTxs(events.reverse()); // più recenti in cima
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="container">
      <h2>Transactions for Contract: {CONTRACT_ADDRESS}</h2>
      {txs.map((tx, index) => (
        <div className="card" key={index}>
          <p><strong>Transaction Hash:</strong> {tx.transactionHash}</p>
          <p><strong>Block Number:</strong> {tx.blockNumber}</p>
          <p><strong>Event:</strong> {tx.event}</p>
          <p><strong>Args:</strong> {JSON.stringify(tx.args)}</p>
        </div>
      ))}
    </div>
  );
}