import React, { useEffect, useState } from 'react';

const Modal = () => {
    const [show, setShow] = useState(false);

    const toggle = () => {
        setShow(prev => !prev);
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if(e.key === 'Escape') {
                setShow(false);
            }
        }
            if(show) {
                window.addEventListener('keydown',handleEscape);
            }

            return () =>{
                window.removeEventListener('keydown',handleEscape);
            }
        
    }, [show]);


    return (
        <div className='container py-4 text-center'>
            <button type="button" className="btn btn-primary" onClick={toggle}>
                Launch Modal
            </button>

          {show && (
                <>
                    
                    <div className="modal-backdrop fade show"></div>

                   
                    <div
                        className="modal show d-block"
                        tabIndex="-1"
                        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} 
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Modal Title</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={toggle}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p className="fw-bold text-center">Hello from the Modal!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Modal;
