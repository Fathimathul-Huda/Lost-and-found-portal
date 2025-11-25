import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">
      
      <div className="left-nav">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/reportitem">Report Items</Link></li>
          <li><Link to="/claimMissing">Claim Missing</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/contactus">Contact Us</Link></li>

          {/* 🔥 Show admin link ONLY if user is admin */}
          {user?.role === "Admin" && (
            <li><Link to="/admin">Admin Panel 👑</Link></li>
          )}
        </ul>
      </div>

      <div className="auth-buttons">
        
        {/* 🔥 Show login/register only if not logged in */}
        {!user && (
          <>
            <Link to="/login" className="btn login">Login</Link>
            <Link to="/register" className="btn register">Register</Link>
          </>
        )}

        {/* 🔥 Show logout only if logged in */}
        {user && (
          <button onClick={handleLogout} className="btn logout">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
