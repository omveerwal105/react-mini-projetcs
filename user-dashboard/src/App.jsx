import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import { ThemeProvider } from './components/ThemeContext'
import { UserProvider } from './components/UserContext'

const App = () => {
  return (

    <div>
      <ThemeProvider>
        <UserProvider>

          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>

        </UserProvider>
      </ThemeProvider>
    </div>
  )
}

export default App