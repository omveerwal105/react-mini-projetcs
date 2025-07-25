import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container-fluid'>
                    <Link className='navbar-brand' to="/">MyApp</Link>
                </div>

                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link active' to='/'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link active' to='/about'>About</Link>
                        </li>
                    </ul>
                </div>

            </nav>

        </div>
    )
}

export default Navbar