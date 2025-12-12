import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Aboutus from './Pages/AboutUs'
import ClaimMissing from './Pages/ClaimMissing'
import Feedback from './Pages/Feedback'
import ContactUs from './Pages/ContactUs'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ReportItems from './Pages/ReportItems'
import AdminDashboard from "./Pages/AdminDashboard"
import Footer from './Components/Footer'
import MissingItems from "./Pages/MissingItems";
import Resetpass from "./Pages/Resetpass"



export default function App() {

  let user = null;
  try {
    const stored = localStorage.getItem("user");
    user = stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }

  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/ReportItem" element={<ReportItems />} />
        <Route path="/ClaimMissing" element={<ClaimMissing />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/Contactus" element={<ContactUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/missing-items" element={<MissingItems />} />
        <Route path="/Resetpass" element={<Resetpass/>}/>
        {/* 🔐 Protect Admin Route */}
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}
