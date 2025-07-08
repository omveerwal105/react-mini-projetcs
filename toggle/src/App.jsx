import React from 'react'
import Content from './component/Content'
import ThemeToggle from './component/ThemeToggle'
import { ThemeProvider } from './context/ThemeContext'

const App = () => {
  return (
    <ThemeProvider>
    <div>
      <ThemeToggle />
      <Content />
    </div>
    </ThemeProvider>
  )
}

export default App