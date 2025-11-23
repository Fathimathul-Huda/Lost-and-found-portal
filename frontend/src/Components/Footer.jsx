import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📧 info@lostandfound.com</p>
          <p>📞 +1 234 567 890</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/about">About Us</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/search">Search</Link>
        </div>

        {/* Follow Us */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>

      </div>

      <p className="footer-bottom">© 2025 Lost & Found Portal | All Rights Reserved</p>
    </footer>
  );
}
