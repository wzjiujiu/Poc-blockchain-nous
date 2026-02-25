import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function InitPage() {
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [latestTx, setLatestTx] = useState([]);

  useEffect(() => {
    // Simula fetch di blocchi
    const mockBlocks = [
      { number: 10234, tx: 12, gas: 21000 },
      { number: 10233, tx: 8, gas: 19500 },
      { number: 10232, tx: 15, gas: 23000 },
    ];
    setLatestBlocks(mockBlocks);

    // Simula fetch transazioni
    const mockTx = [
      { hash: "0xabc123", block: 10234, from: "0xaaa", to: "0xbbb" },
      { hash: "0xdef456", block: 10233, from: "0xccc", to: "0xddd" },
    ];
    setLatestTx(mockTx);
  }, []);

  return (
    <div className="init-page">
      {/* NAVBAR */}
      <nav className="init-navbar">
        <Link to="/" className="logo">NousScan</Link>
        <div className="nav-links">
          <Link to="/home">Explorer</Link>
          <Link to="/wallet">Wallet</Link>
          <Link to="/docs">Docs</Link>
        </div>
        <button className="btn connect-wallet">Connect Wallet</button>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Welcome to NousScan</h1>
        <p>Explore blockchain data, transactions, and smart contracts in real-time.</p>
        <Link to="/explorer" className="btn hero-btn">Start Exploring</Link>
      </section>

      {/* DASHBOARD CARDS */}
      <section className="dashboard-cards">
        <div className="card-init">
          <h3>Latest Blocks</h3>
          <ul>
            {latestBlocks.map((b) => (
              <li key={b.number}>
                <strong>#{b.number}</strong> - Tx: {b.tx} - Gas: {b.gas}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-init">
          <h3>Latest Transactions</h3>
          <ul>
            {latestTx.map((tx) => (
              <li key={tx.hash}>
                <strong>{tx.hash}</strong> - Block: {tx.block}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="init-footer">
        <p>&copy; 2026 NousScan. All rights reserved.</p>
      </footer>
    </div>
  );
}