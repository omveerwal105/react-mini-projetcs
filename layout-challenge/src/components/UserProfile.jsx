import React, { useContext } from 'react'
import { ThemeContext } from './ThemeCOntext'

const UserProfile = () => {
  const { themeMode, toggleTheme } = useContext(ThemeContext)

  const users = [
    { id: 1, name: "Om Veerwal", role: "Frontend Dev", avatar: "image3.jpeg" },
    { id: 2, name: "Shivani", role: "Head HR", avatar: "image2.jpeg" },
    { id: 3, name: "Vijeta", role: "CRM Head", avatar: "image1.jpeg" }
  ];

  return (
    <div className={`container py-2 d-flex flex-column align-items-center justify-content-center ${themeMode === 'light' ? 'bg-light text-dark' : 'bg-dark text-white'}`}>
      <button className='btn btn-primary mb-3' onClick={toggleTheme}>
        Change to {themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      {users.map(user => (
        <div className='card mb-3' style={{ width: '18rem' }} key={user.id}>
          <img src={user.avatar} className='card-img-top' alt={user.name} style={{ maxHeight: '3000px', objectFit: 'cover' }} />
          <div className='card-body'>
            <h5 className='card-title'>{user.name}</h5>
            <p className='card-text fw-bold'>{user.role}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserProfile
