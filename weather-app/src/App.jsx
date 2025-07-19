import React from 'react'
import WeatherCard from './component/WeatherCard'
import { ThemeProvider } from './component/useTheme'

const App = () => {
  return (
    <ThemeProvider>
    <div>
      <WeatherCard />
    </div>
    </ThemeProvider>
  )
}

export default App