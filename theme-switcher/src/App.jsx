import React from 'react'
import Users from './components/Users'
import { ThemeProvider } from './context/ThemeContext'

const App = () => {
  return (
    <div>
      <ThemeProvider>
      <Users />
      </ThemeProvider>
    </div>
  )
}

export default App