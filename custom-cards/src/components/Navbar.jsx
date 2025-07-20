import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { cart } = useContext(CartContext);
    return (
        <div className='navbar navbar-expand-lg navbar-dark bg-dark px-4'>
            <a className='navbar-brand' href='#'>My Shop</a>
            <div className='ms-auto'>
                <Link to='/cart' className='btn btn-outline-light'>
                    🛒 Cart <span className="badge bg-danger ms-1">{cart.length}</span>
                </Link>

            </div>

        </div>
    )
}

export default Navbar