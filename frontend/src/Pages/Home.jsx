import React from "react";
import './Home.css'; // optional stylesheet if you want custom styles

export default function Home() {
  return (
<div id="main">

    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to the Lost and Found Portal</h1>
        <p>Your easy solution for finding lost belongings.</p>

        <div className="search-box">
          <input type="text" placeholder="Enter item name..." />
          <button>Search</button>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Our Lost & Found Portal makes it simple and quick to report, search, 
          and recover lost belongings. Using technology, we make the process 
          easier, safer, and more organized than traditional manual reporting.
        </p>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <h2>Categories</h2>
        <div className="category-box">
          <div className="cat-card">📱 Electronics</div>
          <div className="cat-card">🎒 Accessories</div>
          <div className="cat-card">📄 Documents</div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="steps-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">1️⃣ Report</div>
          <div className="step">2️⃣ Database Entry</div>
          <div className="step">3️⃣ Search</div>
          <div className="step">4️⃣ Verification</div>
          <div className="step">5️⃣ Return</div>
        </div>
      </section>
    </div>
</div>
  );
}
