import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "../lib/constants"; // ABI completo
import { provider } from "../lib/provider";

export default function TransactionDetails() {
  const { txHash } = useParams();
  const [tx, setTx] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [events, setEvents] = useState([]);

  // Helper per serializzare BigInt in JSON
  const stringifyBigInt = (key, value) => (typeof value === "bigint" ? value.toString() : value);

  useEffect(() => {
    async function load() {
      try {
        console.log("Searching txHash:", txHash);

        // 1️⃣ Transazione
        const transaction = await provider.getTransaction(txHash);
        if (!transaction) {
          alert("Transazione non trovata!");
          return;
        }
        setTx(transaction);
        console.log("Transaction:", transaction);

        // 2️⃣ Receipt
        const txReceipt = await provider.getTransactionReceipt(txHash);
        setReceipt(txReceipt);
        console.log("Transaction receipt:", txReceipt);

        // 3️⃣ Decodifica manuale eventi
        const iface = new ethers.Interface(ABI);
        const decodedEvents = [];

        txReceipt.logs.forEach((log, i) => {
          console.log(`Raw Log #${i}:`, log);

          try {
            const parsed = iface.parseLog(log);
            // parsed.args può contenere BigInt, convertiamo a stringa
            const argsSafe = Object.fromEntries(
            Object.entries(parsed.args).map(([k, v]) => {
            let keyName;
            if (k === "0") keyName = "registrar";
            else if (k === "1") keyName = "nodeId";
            else keyName = k; // mantieni il numero per gli altri

    return [keyName, typeof v === "bigint" ? v.toString() : v];
  })
);
            decodedEvents.push({
              name: parsed.name,
              args: argsSafe,
              signature: parsed.signature,
              topic: log.topics[0],
            });

            console.log("Parsed Event:", parsed.name, argsSafe);
          } catch (e) {
            console.log("Log non del contratto, skip:", e.message);
          }
        });

        setEvents(decodedEvents);
      } catch (err) {
        console.error("Errore nel caricamento della transazione:", err);
      }
    }

    load();
  }, [txHash]);

  if (!tx || !receipt) return <p>Loading transaction...</p>;

  return (
    <div className="container">
      <h2 className="page-title">Transaction Details</h2>

      <div className="card">
        <p><strong>Tx Hash:</strong> {tx.hash}</p>
        <p><strong>Block:</strong> {tx.blockNumber}</p>
        <p><strong>From:</strong> {tx.from}</p>
        <p><strong>To:</strong> {tx.to}</p>
        <p><strong>Value:</strong> {tx?.value ? ethers.formatEther(tx.value) : "N/A"} ETH</p>
        <p><strong>Gas Price:</strong> {tx?.gasPrice ? ethers.formatEther(tx.gasPrice) : "N/A"} ETH</p>
      </div>

      <h3>Events emitted</h3>
      {events.length === 0 && <p>No events found</p>}
      {events.map((e, i) => (
        <div key={i} className="card">
          <p><strong>Event:</strong> {e.name}</p>
          <p><strong>Signature:</strong> {e.signature}</p>
          <p><strong>Topic:</strong> {e.topic}</p>
          <p><strong>Args:</strong> <pre>{JSON.stringify(e.args, stringifyBigInt, 2)}</pre></p>
        </div>
      ))}
    </div>
  );
}
