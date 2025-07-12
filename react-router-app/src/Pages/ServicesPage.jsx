import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const ServicesPage = () => {
  return (
    <div>
        <h2>Service Page</h2>
        <nav>
            <Link to='web'>Web Devlopment</Link> | {' '}
            <Link to='app'>App Devlopemnt</Link>
        </nav>
        <Outlet />
    </div>
  )
}

export default ServicesPage