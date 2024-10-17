import React, { createContext, useReducer } from 'react';

const initialState = {
    cartItems: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 } 
                            : item
                    ),
                };
            }
            return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }] }; 

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload) 
            };
            case 'CLEAR_CART': 
            return { ...state, cartItems: [] };

            case 'UPDATE_CART_ITEM':
                return {
                  ...state,
                  cartItems: state.cartItems.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                  ),
                };
        default:
            return state;
    }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
