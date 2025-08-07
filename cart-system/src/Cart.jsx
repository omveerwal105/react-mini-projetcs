import React, { useContext, useMemo } from 'react'
import { CartContext } from './CartContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const navigate = useNavigate();

    const { productState, dispatchProduct } = useContext(CartContext);

    const cartItem = productState.product

    const onDelete = (id) => {
        dispatchProduct({
            type: 'REMOVE',
            payload: id
        })
    }

    const handleConfirm = () => {
        dispatchProduct({ type: 'CLEAR' });
        navigate('/thankyou');
    };


    const clearCart = () => {
        dispatchProduct({
            type: 'CLEAR'
        })
    }


    const totalPrice = useMemo(() => {
        return cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cartItem]);
    return (
        <div className='container p-4'>
            <h2 className="text-center text-primary mb-3">🛒 Cart {cartItem.length}</h2>
            {cartItem.length === 0 ? (
                <p className='text-center text-muted'>No items in the cart</p>
            ) : (
                cartItem.map((item) => (
                    <div className='card mx-auto mt-2' key={item.id}>
                        <div className='card-header'>
                            <h4 className='fw-bold'>{item.name}</h4>
                        </div>
                        <div className='card-body  d-flex justify-content-between align-items-center'>
                            <p className='mb-1'><strong>Price:</strong> ₹{(item.price * item.quantity).toLocaleString()}</p>
                            <p className='text-muted'>Qty: {item.quantity}</p>

                            <button className='btn btn-danger' onClick={() => onDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))
            )}
            {cartItem.length > 0 && (
                <div className='text-end mt-4 '>
                    <strong className='mx-2'>Total Price: ₹{totalPrice.toLocaleString()}</strong>
                    <button onClick={handleConfirm} className='btn btn-outline-success me-1'>
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;
