import React, {  useEffect, useState } from 'react'
import ReactDOM from "react-dom";

const modalRoot = document.getElementById('modal-root');

const Modal = ({isOpen , onClose , children}) => {
    const [visible , setVisible]  = useState(isOpen);

    useEffect(()=>{
        if(isOpen){
            setVisible(true);
        } else {
            const timer = setTimeout(()=> setVisible(false),300);
            return () => clearTimeout(timer);
        }
    },[isOpen]);

    if(!visible) return null;

  return ReactDOM.createPortal(
    <div className={`modal-overlay ${isOpen ? 'fade-in':'fade-out'}`}>
        <div className='modal-backdrop' onClick={onClose}></div>
        <div className={`modal-content ${isOpen ? 'zoom-in':'zoom-out' }`}>
            <button className='modal-close' onClick={onClose}>
                ✖
            </button>
            {children}
        </div>
    </div>,
    modalRoot  
  );
}

export default Modal