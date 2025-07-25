import React from 'react'
import UserCard from '../components/UserCard'
import { useContext } from 'react'
import { ThemeContext } from '../components/ThemeContext'
import UserList from '../components/userList'

const Home = () => {
    const {themeMode , toggleTheme} = useContext(ThemeContext);
  return (
    <div className={`container mt-3 p-4 d-flex flex-column align-items-center justify-content-center
     ${themeMode === 'light' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
        <h2 className='text-center'>UsersInfo</h2>
        <button className='btn btn-primary'onClick={toggleTheme} >Change to {themeMode === 'light' ? 'lightMode' : 'darkMode'}</button>

        <UserList />
    </div>
  )
}

export default Home