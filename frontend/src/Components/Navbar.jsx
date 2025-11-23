import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
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
        </ul>
      </div>

      <div className="auth-buttons">
        <Link to="/login" className="btn login">Login</Link>
        <Link to="/register" className="btn register">Register</Link>
      </div>
    </div>
  );
}
