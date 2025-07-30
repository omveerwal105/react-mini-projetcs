import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const ThemeToggler = () => {
    const {themeState , dispatchTheme} = useContext(ThemeContext);

    const handleTheme = () => {
        dispatchTheme({ type : 'TOGGLE_THEME' })
    }

    return (
        <div className='container'>
            <button className='btn btn-primary' onClick={handleTheme}>
                Switch to {themeState.theme ? '🌞 Switch to Light Mode' : '🌙 Switch to Dark Mode'}
            </button>
        </div>
    )
}

export default ThemeToggler
