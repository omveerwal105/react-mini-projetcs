import React, { useContext } from 'react';
import { ModalContext } from './context/ModalContext';
import Modal from './component/Modal';

const App = () => {
    const { openModal } = useContext(ModalContext);

    return (
        <div>
            <h1>Multiple Modal Styles</h1>

            <button 
                onClick={() => openModal(<p>Are you sure you want to delete?</p>, "confirm")}
                className="btn btn-danger"
            >
                Open Confirm Modal
            </button>

            <button 
                onClick={() => openModal(<p>This is some information</p>, "info")}
                className="btn btn-info mx-2"
            >
                Open Info Modal
            </button>

            <button 
                onClick={() => openModal(<h3>Custom content here</h3>, "custom")}
                className="btn btn-success"
            >
                Open Custom Modal
            </button>

            <Modal />
        </div>
    );
};

export default App;
