import { useEffect, useState } from "react";
import { provider } from "../lib/provider";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";

export default function Block() {
  const [params] = useSearchParams();
  const blockNumber = params.get("id");

  const [block, setBlock] = useState(null);

  useEffect(() => {
    async function load() {
      const b = await provider.getBlock(Number(blockNumber));
      setBlock(b);
    }
    load();
  }, [blockNumber]);

  if (!block)
    return (
      <p className="loading-text">Loading block details...</p>
    );

  return (
    <div className="container">
      <h2 className="page-title">Dettaglio Blocco {block.number}</h2>
      <Card>
        <p><strong>Hash:</strong> {block.hash}</p>
        <p><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
        <p><strong>Transazioni:</strong> {block.transactions.length}</p>
      </Card>
    </div>
  );
}