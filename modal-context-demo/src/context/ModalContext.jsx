import React, { createContext, useReducer, useEffect } from "react";

export const ModalContext = createContext();

const initialState = {
    isOpen: false,
    content: null,
    modalType: "custom" // default
};

const modalReducer = (state, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { 
                ...state, 
                isOpen: true, 
                content: action.payload.content, 
                modalType: action.payload.type || "custom" 
            };
        case 'CLOSE_MODAL':
            return { ...state, isOpen: false };
        default:
            return state;
    }
};

export const ModalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(modalReducer, initialState);

    const openModal = (content, type = "custom") => {
        dispatch({ type: 'OPEN_MODAL', payload: { content, type } });
    };

    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    };

    
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape" && state.isOpen) {
                closeModal();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [state.isOpen]);

    return (
        <ModalContext.Provider value={{ ...state, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};
