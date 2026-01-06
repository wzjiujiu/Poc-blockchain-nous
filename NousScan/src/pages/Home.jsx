import { useEffect, useState } from "react";
import { provider } from "../lib/provider";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

export default function Home({ contract }) {
  const [blocks, setBlocks] = useState([]);
  const [txBlocks, setTxBlocks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function loadBlocks() {
      const latest = await provider.getBlockNumber();
      let list = [];
      let txList = [];

      let i = 0;
      while (list.length < 5 || txList.length < 5) {
        const b = await provider.getBlock(latest - i);
        if (list.length < 5) list.push(b);
        if (b.transactions.length > 0 && txList.length < 5) txList.push(b);
        i++;
        if (i > 50) break; // sicurezza in caso di blocchi senza tx
      }

      setBlocks(list);
      setTxBlocks(txList);
    }

    loadBlocks();
  }, []);

  const handleSearch = async (query) => {
    if (!contract) return;
    try {
      const allEvents = await contract.queryFilter(null, 0, "latest");
      const filtered = allEvents.filter(
        (e) =>
          e.transactionHash.includes(query) ||
          e.blockNumber.toString() === query ||
          e.args?.registrar?.toLowerCase() === query.toLowerCase()
      );
      setSearchResults(filtered);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Search</h2>
      <SearchBar onSearch={handleSearch} className="search-bar" />

      {searchResults.length > 0 && (
        <div>
          <h2 className="page-title">Risultati Ricerca</h2>
          {searchResults.map((e, idx) => (
            <Card key={idx} className="card">
              <p><strong>Tx Hash:</strong> {e.transactionHash}</p>
              <p><strong>Block:</strong> {e.blockNumber}</p>
              <p><strong>Event:</strong> {e.event}</p>
            </Card>
          ))}
        </div>
      )}

      <div className="home-grid">
        {/* Colonna sinistra: Ultimi blocchi */}
        <div>
          <h2 className="page-title">Ultimi Blocchi</h2>
          {blocks.map((b) => (
            <Card key={b.number} className="card">
              <p>🧱 <strong>Block:</strong> {b.number}</p>
              <p><strong>Tx:</strong> {b.transactions.length}</p>
              <p><strong>Gas Used:</strong> {b.gasUsed?.toString()}</p>
            </Card>
          ))}
        </div>

        {/* Colonna destra: Ultime transazioni */}
        <div>
          <h2 className="page-title">Ultime Transazioni</h2>
          {txBlocks.map((b) => (
            <Card key={b.number} className="card">
              <p>🧱 <strong>Block:</strong> {b.number}</p>
              <p><strong>Tx Count:</strong> {b.transactions.length}</p>
              <p><strong>Tx Hashes:</strong></p>
              <ul>
                {b.transactions.map((tx) => (
                  <li key={tx}>{tx}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}