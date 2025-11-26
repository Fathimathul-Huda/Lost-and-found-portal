import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Aboutus from './Pages/AboutUs'
import ClaimMissing from './Pages/ClaimMissing'
import Feedback from './Pages/Feedback'
import ContactUs from './Pages/ContactUs'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ReportItems from './Pages/ReportItems'
import AdminMenu from './Pages/Adminmenu'
import AdminDashboard from './Pages/AdminDashboard'
import Footer from './Components/Footer'

export default function App() {
  return (
    <div>
      <Router>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='Aboutus' element={<Aboutus/>}></Route>
      <Route path='/ReportItem' element={<ReportItems/>}></Route>
      <Route path='ClaimMissing' element={<ClaimMissing/>}></Route>
      <Route path='/Feedback' element={<Feedback/>}></Route>
      <Route path='/Contactus' element={<ContactUs/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/Register' element={<Register/>}></Route>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin-menu" element={<AdminMenu />} />

      </Routes>
      <Footer/>
      </Router>
    </div>
  )
}