import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);

    const removeFromCart = (id) => {
        const updated = cart.filter((item)=>item.id!==id);
        setCart(updated);
    }

    return (
        <div className='container'>
            <h2>Cart</h2>
            {cart.length === 0 ? (
                <p>No items in cart.</p>
            ) :
                (cart.map((item) => (
                    <div key={item.id} style={{ border: "1px solid gray", marginBottom: "1rem", padding: "1rem" }}>
                        <h3>{item.title}</h3>
                        <p>{item.category}</p>
                        <img src={item.image} alt={item.title} style={{ width: "100px" }} />
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                )))
            }
               {cart.length > 0 && <h4>Total Items: {cart.length}</h4>}

        </div>
    )
}

export default Cart