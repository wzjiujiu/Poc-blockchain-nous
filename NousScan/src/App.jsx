import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Block from "./pages/Block";
import Init from "./pages/Init";
import Transaction from "./pages/Transaction";
import TransactionDetails from "./pages/TransactionDetails";

export default function App() {
  return (
    <BrowserRouter>
      <NavbarWrapper />
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/home" element={<Home />} />
        <Route path="/block" element={<Block />} />
        <Route path="/tx" element={<Transaction />} />
        <Route path="/tx/:txHash" element={<TransactionDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

// Wrapper che decide se mostrare Navbar
function NavbarWrapper() {
  const location = useLocation();

  // non mostrare Navbar sulla pagina iniziale ("/")
  if (location.pathname === "/") return null;

  return <Navbar />;
}