import { useEffect, useState } from "react";
import { provider } from "../lib/provider";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "../lib/constants"; // importa il tuo ABI
import { useNavigate } from "react-router-dom";

export default function Home({ contract }) {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]); // <-- cambiato
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // Carica ultimi 5 blocchi dalla blockchain
  useEffect(() => {
    async function loadBlocks() {
      const latest = await provider.getBlockNumber();
      let list = [];

      for (let i = 0; i < 5; i++) {
        const b = await provider.getBlock(latest - i);
        list.push(b);
      }

      setBlocks(list);
    }

    loadBlocks();
  }, []);

  // 🔥 Carica ultime transazioni dal tuo backend PostgreSQL
  useEffect(() => {
    async function loadTransactions() {
      try {
        const res = await fetch("http://localhost:3001/tx/latest");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Errore caricamento transazioni:", err);
      }
    }

    loadTransactions();
  }, []);

  const handleSearch = async (query) => {
    try {
      const tx = await provider.getTransaction(query);

      // ❗ Se non esiste → mostra errore
      if (!tx) {
        alert("Transazione non trovata");
        return;
      }

      // 2. Vai alla pagina dei dettagli
      console.log(query)
      navigate(`/tx/${query}`);

    } catch (err) {
      console.error("Search error:", err);
      alert("Errore durante la ricerca");
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Search</h2>
      <SearchBar onSearch={handleSearch} />

      {searchResults.length > 0 && (
        <div>
          <h2 className="page-title">Risultati Ricerca</h2>
          {searchResults.map((e, idx) => (
            <Card key={idx}>
              <p><strong>Tx Hash:</strong> {e.transactionHash}</p>
              <p><strong>Block:</strong> {e.blockNumber}</p>
              <p><strong>Event:</strong> {e.event}</p>
            </Card>
          ))}
        </div>
      )}

      <div className="home-grid">
        {/* Colonna sinistra */}
        <div>
          <h2 className="page-title">Ultimi Blocchi</h2>
          {blocks.map((b) => (
            <Card key={b.number}>
              <p>🧱 <strong>Block:</strong> {b.number}</p>
              <p><strong>Tx:</strong> {b.transactions.length}</p>
              <p><strong>Gas Used:</strong> {b.gasUsed?.toString()}</p>
            </Card>
          ))}
        </div>

        {/* Colonna destra */}
        <div>
          <h2 className="page-title">Ultime Transazioni (DB)</h2>
          {transactions.map((tx) => (
            <Card key={tx.tx_hash}>
              <p>🔗 <strong>Tx Hash:</strong> {tx.tx_hash}</p>
              <p>🧱 <strong>Block:</strong> {tx.block_number}</p>
              <p>⏱ <strong>Timestamp:</strong> {tx.timestamp}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}