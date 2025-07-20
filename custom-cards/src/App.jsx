import React from 'react'
import ProductList from './components/ProductList'
import CartProvider from './context/CartContext'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './Pages/Cart'
import './App.css';

const App = () => {
  return (
    <CartProvider>
      <div>

        <Navbar />

        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>

      </div>
    </CartProvider>
  )
}

export default App