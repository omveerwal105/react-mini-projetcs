import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import './Modal.css';

const Modal = () => {
    const { isOpen, content, closeModal, modalType } = useContext(ModalContext);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else if (!isOpen && isVisible) {
          
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <div 
            className={`modal-overlay ${isOpen ? "fade-in" : "fade-out"}`} 
            onClick={closeModal}
        >
            <div 
                className={`modal-content ${modalType}`} 
                onClick={(e) => e.stopPropagation()}
            >
                {content}
                <button className="btn btn-danger mt-3" onClick={closeModal}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
