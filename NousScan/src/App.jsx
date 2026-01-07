import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Block from "./pages/Block";
import Transaction from "./pages/Transaction";
import TransactionDetails from "./pages/TransactionDetails"

import { Contract } from "ethers";
import { provider } from "./lib/provider";
import { CONTRACT_ADDRESS, ABI } from "./lib/constants"; // importa il tuo ABI

export default function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/block" element={<Block />} />
        <Route path="/tx" element={<Transaction />} />
        <Route path="/tx/:txHash" element={<TransactionDetails />} />
      </Routes>
    </BrowserRouter>
  );
}