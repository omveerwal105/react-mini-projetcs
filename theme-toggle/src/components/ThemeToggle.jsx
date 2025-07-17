// src/components/ThemeToggle.jsx
import React from 'react';
import { useTheme } from './useTheme';

const ThemeToggle = () => {
  const { darkMode, toggle } = useTheme();

  return (
    <div className={`container py-5 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`} style={{ minHeight: '100vh' }}>
      <h1 className="text-center mb-4">Om is the Best</h1>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={toggle}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;
