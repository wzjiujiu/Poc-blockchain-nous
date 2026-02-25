import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // stato login
  const [showBox, setShowBox] = useState(false);       // toggle box
  const [isLogin, setIsLogin] = useState(true);        // login/register toggle

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowBox(false);
    navigate("/login");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowBox(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowBox(false);
  };

  return (
   <nav className="navbar">

  {/* LOGO */}
  <Link to="/" className="navbar-title">NousScan Explorer</Link>

  {/* CENTER WRAPPER (LINKS + WALLET) */}
  <div className="navbar-center">
      <div className="nav-links">
        <Link to="/home">Explorer</Link>
        <Link to="/wallet">Wallet</Link>
        <Link to="/docs">Docs</Link>
      </div>

      <button className="btn connect-wallet">Connect Wallet</button>
  </div>

  {/* ICONS + PROFILE */}
  <div className="header">
    <section className="flex">
      <div className="icons">
        <div className="icon" id="menu-btn">☰</div>
        <div className="icon" id="user-btn" onClick={() => setShowBox(!showBox)}>👤</div>
      </div>

      {showBox && (
        <>
          {isLoggedIn ? (
            <div className="profile active">
              <img src="/images/user.jpg" alt="Avatar" />
              <h3 style={{ color: "black" }}>Haochen He</h3>
              <span style={{ color: "black" }}>student</span>
              <Link to="/notification-student" className="btn">Notification</Link>
              <button className="option-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="account-form active">
              <div id="close-form" onClick={() => setShowBox(false)}>✖</div>

              <div className="buttons">
                <span className={`btn login-btn ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>Login</span>
                <span className={`btn register-btn ${!isLogin ? "active" : ""}`} onClick={() => setIsLogin(false)}>Register</span>
              </div>

              {isLogin ? (
                <form onSubmit={handleLoginSubmit} className="login-form active">
                  <h3>Login now</h3>
                  <input type="email" placeholder="Enter your email" className="box" />
                  <input type="password" placeholder="Enter your password" className="box" />
                  <input type="submit" value="Login now" className="btn" />
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="register-form active">
                  <h3>Register now</h3>
                  <input type="email" placeholder="Enter your email" className="box" />
                  <input type="password" placeholder="Enter your password" className="box" />
                  <input type="password" placeholder="Confirm your password" className="box" />
                  <input type="submit" value="Register now" className="btn" />
                </form>
              )}
            </div>
          )}
        </>
      )}
    </section>
  </div>
</nav>
  );
}