import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
    product: JSON.parse(localStorage.getItem('item')) || []
};

const reducerProdcut = (productState, action) => {
    switch (action.type) {
        case 'ADD':
            const existenceIndex = productState.product.findIndex((i) => i.id === action.payload.id);
            if (existenceIndex != -1) {
                const updatedProduct = [...productState.product];
                updatedProduct[existenceIndex] = {
                    ...updatedProduct[existenceIndex],
                    quantity: updatedProduct[existenceIndex].quantity + 1
                }
                return {
                    ...productState,
                    product: updatedProduct
                };
            }
            else {
                return {
                    ...productState,
                    product: [...productState.product, { ...action.payload, quantity: 1 }]
                };

            }

        case 'REMOVE':
            const itemToRemove = productState.product.find((item) => item.id === action.payload);
            if (itemToRemove.quantity > 1) {
                return {
                    ...productState,
                    product: productState.product.map((item) => (
                        item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
                    ))
                };
            }
            else {
                return {
                    ...productState,
                    product: productState.product.filter((i) => i.id !== action.payload)
                };
            }
            case 'CLEAR':
            return {
                ...productState ,
                product : []
            };
        default:
            return productState;
    }
}
export const CartProvider = ({ children }) => {
    const [productState, dispatchProduct] = useReducer(reducerProdcut, initialState);
    useEffect(() => {
        localStorage.setItem('item', JSON.stringify(productState.product))
    }, [productState.product]);
    return (
        <CartContext.Provider value={{ productState, dispatchProduct }}>
            {children}
        </CartContext.Provider>
    )
}