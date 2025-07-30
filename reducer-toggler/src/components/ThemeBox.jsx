import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const ThemeBox = () => {
    const { themeState } = useContext(ThemeContext);

    const styles = {
        padding: '40px',
        margin: '30px auto',
        width: '50%',
        borderRadius: '12px',
        textAlign: 'center',
        backgroundColor: themeState.theme ? '#333' : '#f0f0f0',
        color: themeState.theme ? '#fff' : '#000',
        transition: '0.3s ease-in-out'
    }

    return (
        <div style={styles}>
            This box is in <strong>{themeState.theme ? 'Dark-Mode' : 'Light-Mode'}</strong> Mode.
        </div>
    )
}

export default ThemeBox
