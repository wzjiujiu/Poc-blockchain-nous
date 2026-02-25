import { useEffect, useState } from "react";
import { provider } from "../lib/provider";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = checking
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  /* ================================
       1️⃣ CHECK LOGIN DAL DB
  ================================= */
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:3001/auth/check", {
          credentials: "include", // include cookie/session
        });

        const data = await res.json();
        console.log("Auth check response:", data);

        setIsLoggedIn(data.loggedIn);
      } catch (err) {
        console.error("Errore autenticazione:", err);
        setIsLoggedIn(false);
      }
    }

    checkAuth();
  }, []);

  // Redirect se non loggato
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);


  /* ================================
       2️⃣ LOAD BLOCKS (BLOCKCHAIN)
  ================================= */
  useEffect(() => {
    async function loadBlocks() {
      try {
        const latest = await provider.getBlockNumber();
        let list = [];
        for (let i = 0; i < 5; i++) {
          const b = await provider.getBlock(latest - i);
          list.push(b);
        }
        setBlocks(list);
      } catch (err) {
        console.error("Errore caricamento blocchi:", err);
      }
    }
    loadBlocks();
  }, []);

  /* ================================
       3️⃣ LOAD TRANSACTIONS (DB)
  ================================= */
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

  /* ================================
       4️⃣ SEARCH TRANSACTIONS
  ================================= */
  const handleSearch = async (query) => {
    try {
      const tx = await provider.getTransaction(query);
      if (!tx) {
        alert("Transazione non trovata");
        return;
      }
      navigate(`/tx/${query}`);
    } catch (err) {
      console.error("Errore ricerca transazione:", err);
      alert("Errore durante la ricerca");
    }
  };

  /* ================================
       RENDER HOME
  ================================= */
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
        {/* BLOCCCHI */}
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

        {/* TRANSZIONI DB */}
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