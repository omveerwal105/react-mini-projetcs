import React from 'react'
import Layout from './components/Layout'
import UserProfile from './components/UserProfile'
import { ThemeProvider } from './components/ThemeCOntext'
import Userfetch from './components/userfetch'



const App = () => {
  return (
    <div>
     <ThemeProvider>
      {/* <UserProfile /> */}
      <Userfetch />
      </ThemeProvider>
  
    </div>
  )
}

export default App