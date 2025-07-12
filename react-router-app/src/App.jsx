import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage'
import ServicesPage from './Pages/ServicesPage'
import WebDev from './Pages/WebDev'
import AppDev from './Pages/AppDev'
import User from './Pages/User'

const App = () => {
  return (
    <div>
      <h1>Router Set Up</h1>

      {/* 🔹 Add some navigation */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/services">Services</Link> |{" "}
        <Link to="/contact">Contact</Link> |{' '}
        <Link to="/user/101">User 101</Link> |{" "}
        <Link to="/user/202">User 202</Link>
      </nav>

      <Routes>
        {/* 🔹 Route for homepage */}
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* 🔹 Nested Route Setup */}
        <Route path="/services" element={<ServicesPage />}>
          <Route path="web" element={<WebDev />} />
          <Route path="app" element={<AppDev />} />
        </Route>

        <Route path='/user/:userId' element={<User />} />
      </Routes>
    </div>
  )
}

export default App