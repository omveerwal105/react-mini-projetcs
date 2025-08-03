import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from './modalSlice';

const ModalComponent = () => {
    const isOpen = useSelector((state)=>state.modal.isOpen);
    const dispatch = useDispatch();

    if(!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
    style={{zIndex : 1000}}
    >
        <div className='bg-white p-4 rounded shadow'>
              <h3>This is a Redux Modal!</h3>
              <button className='btn btn-secondary mt-3'onClick={()=>dispatch(closeModal())}>
                Close
              </button>
        </div>
    </div>
  )
}

export default ModalComponent