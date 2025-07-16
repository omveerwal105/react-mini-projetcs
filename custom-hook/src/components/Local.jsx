import React from 'react'
import useLocalStorage from './useLocalStorage'
import useOnlineStatus from './useOnlineStatus'

const Local = () => {
    const isOnline = useOnlineStatus();
  return (
    <div 
        style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: isOnline ? '#d4edda' : '#f8d7da',
        color: isOnline ? '#155724' : '#721c24',
        fontWeight: 'bold',
        border: `2px solid ${isOnline ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: '10px',
        margin: '50px auto',
        width: '300px',
      }}
    >
        {isOnline ?  '✅ You are online' : '❌ You are offline'}
       
    </div>
  )
}

export default Local