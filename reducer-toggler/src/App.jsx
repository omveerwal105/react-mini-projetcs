import React from 'react'

import { ThemeProvider } from './context/ThemeContext'
import ThemeBox from './components/ThemeBox'
import ThemeToggler from './components/ThemeToggler'

const App = () => {
  return (
    <div>
      <ThemeProvider>

      <ThemeBox />
      <ThemeToggler />
    

      </ThemeProvider>
    </div>
    
    
  )
}

export default App