import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import products from '../Data/Product';


const ProductList = () => {
  const {cart , setCart} = useContext(CartContext);

  const [showToast,setShowToast] =  useState(false);

  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(products);

  const toggleFilter = () => {
    const electronics = products.filter((product) => product.category === 'Electronics');
    setVisibleProducts(electronics);
  }

  const addToCart = (product) => {
    setCart((prevCart)=>[...prevCart,product]);
    setShowToast(true);
    setTimeout(()=>{
      setShowToast(false);
    },1500)
  }

  useEffect(() => {
    setLoading(true);
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    }

  }, []);

  useEffect(() => {
  console.log("Cart Updated:", cart);
}, [cart]);

return (
  <>
    {/* Toast Notification */}
    {showToast && (
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
        <div className="toast show align-items-center text-white bg-success border-0">
          <div className="d-flex">
            <div className="toast-body">
              ✅ Item added to cart!
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      </div>
    )}

    {/* Main Product List UI */}
    <div className='container py-4'>
      {/* Filter Buttons */}
      <div className='d-flex justify-content-center my-3'>
        <button className='btn btn-primary mx-2' onClick={toggleFilter}>Electronics</button>
        <button className='btn btn-outline-dark mx-2' onClick={() => setVisibleProducts(products)}>All</button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className='spinner'>
       
            <span className='visually-hidden'>Loading ...</span>
        
        </div>
      )}

      {/* No Products Message */}
      {!loading && visibleProducts.length === 0 && (
        <p className='text-center text-muted'>No products found.</p>
      )}

      {/* Product Cards */}
      <div className='row justify-content-center align-items-center'>
        {!loading &&
          visibleProducts.map((product) => (
            <div className='col-md-4 col-12 mb-4' key={product.id}>
              <div className='card h-100'>
                <img src={product.image} alt={product.title} className='card-img-top' />
                <div className='card-body text-center'>
                  <h5 className='card-title'>{product.title}</h5>
                  <p className='fw-bold text-muted'>{product.category}</p>
                  <p className='card-text'>{product.description}</p>
                  <button className="btn btn-success" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  </>
);


};

export default ProductList;
