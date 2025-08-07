import React from 'react'
import ProductList from './ProductList'
import { CartProvider } from './CartContext'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Cart from './Cart'
import ThankYou from './ThankYou'
import Navbar from './Navbar'

const App = () => {
  return (
    <div>
      <CartProvider>

        <Navbar />

        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/cart'element = {<Cart />} />
          <Route path='/thankyou' element={<ThankYou />} />

        </Routes>
      
      </CartProvider>
    </div>
  )
}

export default App