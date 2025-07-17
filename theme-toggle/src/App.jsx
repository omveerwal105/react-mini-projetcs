// src/App.jsx
import React from 'react';
import './app.css';
import { ThemeProvider } from './components/useTheme';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
};

export default App;
