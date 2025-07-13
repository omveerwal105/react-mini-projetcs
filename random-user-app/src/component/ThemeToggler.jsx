import React, { useState } from 'react'
import RandomUser from './RandomUser';

const ThemeToggler = () => {
    const [theme,setTheme] = useState(false);

    const toggler = () => {
        setTheme((prev)=>!prev )
    }
    const themeStyles =  {
        backgroundColor : theme ? '#1a1a1a' : '#f5f5f5',
        color : theme ? '#ffffff' : '#000000',
        minHeight: '100vh',
        transition: 'all 0.3s ease'
    };
  return (
    <div className='container d-flex justify-content-center align-items-center flex-column py-3' style={themeStyles}>
        <h1 className='text-center'>{theme ? 'Hello iam dark':'Hello iam light' }</h1>
        <button className='btn btn-primary' onClick={toggler}>{theme ? 'Change to light' : 'change to dark'}</button>

        <RandomUser theme = {theme} onToggle = {toggler} onStyle = {themeStyles} />

    </div>
  )
}

export default ThemeToggler