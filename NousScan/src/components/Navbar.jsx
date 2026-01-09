import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Link al path "/" per tornare alla home */}
      <Link to="/" className="navbar-title">
        NousScan Explorer
      </Link>
    </nav>
  );
}
