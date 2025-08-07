import React, { useContext, useReducer } from 'react'
import { CartContext } from './CartContext';
import Cart from './Cart';

const ProductList = () => {
    const products = [
        { id: 1, name: "iPhone 15", price: 80000 },
        { id: 2, name: "MacBook Air", price: 120000 },
        { id: 3, name: "AirPods Pro", price: 25000 }
    ];

    const { dispatchProduct} = useContext(CartContext);

    

    const handleAdd = (product) => {
        dispatchProduct({
            type : 'ADD' ,
            payload : product
        })
        
    }
    return (
        <div className='container p-3'>
            <h2 className='text-center text-primary'>Product List</h2>

            {products.map((product)=>(
                <div className='card mx-auto mt-2' key={product.id}>
                    <div className='card-header '>
                        <h4 className='fw-bold'>{product.name}</h4>
                    </div>
                    <div className='card-body d-flex justify-content-between align-items-center'>
                        <p><strong>Price: </strong>{product.price.toLocaleString()}</p>
                      <button className='btn btn-primary' onClick={() => handleAdd(product)}>ADD To Cart</button>
                    </div>
                </div>
            ))}
       
        </div>
    )
}

export default ProductList