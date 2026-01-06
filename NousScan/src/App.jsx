import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Block from "./pages/Block";
import Transaction from "./pages/Transaction";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/block" element={<Block />} />
        <Route path="/tx" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}