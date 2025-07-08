import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'


const ThemeToggle = () => {
    const {theme , toggle} = useContext(ThemeContext);
  return (
    <div className='container text-center'>
        <p className={`theme ${theme === 'light'  ? 'light ' : 'dark'}`}>Current Theme :{theme}</p>
        <button onClick={toggle}>
            Switch to {theme==="light" ? "dark" : "light"} Mode
        </button>
    </div>
  )
}

export default ThemeToggle