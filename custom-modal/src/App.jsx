import React, { useState } from 'react'
import Modal from './Modal';
import './Modal.css';

const App = () => {
  const [isOpen , setIsOpen] = useState(false);
  return (
    <div style={{height : '100vh',display : 'flex' ,  justifyContent: "center", alignItems: "center" }}>
      <button onClick={()=>setIsOpen(true)}>Open Modal</button>

      <Modal isOpen = {isOpen} onClose={()=> setIsOpen(false)}>
        <h2>Hello 👋</h2>
         <p>This is a reusable modal.</p>
      </Modal>
    </div>
  )
}

export default App