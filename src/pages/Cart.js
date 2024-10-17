import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { state, dispatch } = useContext(CartContext);
    const [successMessage, setSuccessMessage] = useState('');
    const { cartItems = [] } = state;
    const navigate = useNavigate();

    const handleRemoveFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
        setSuccessMessage('Item Removed Successfully! 🎉'); // Set success message
        setTimeout(() => setSuccessMessage(''), 3000); // Clear the message after 3 seconds
    };

    const handleAddToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: 1 } });
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            dispatch({ type: 'UPDATE_CART_ITEM', payload: { ...item, quantity: item.quantity - 1 } });
        } else {
            handleRemoveFromCart(item.id); 
        }
    };

    const handleBack = () => {
        if (cartItems.length > 0) {
            const firstItemId = cartItems[0].id; // Get the ID of the first item in the cart
            navigate(`/product/${firstItemId}`); // Navigate to the product details page
        } else {
            navigate('/home'); // Or navigate to another route if the cart is empty
        }
    };

    const handleOrder=()=>{
        navigate('/order-summary');
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
            <div>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map(item => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.image} alt={item.title} />
                            <div className="cart-item-info">
                                <h3 className="cart-item-title">{item.title}</h3>
                                <p>Quantity: {item.quantity}</p>
                                <div className="quantity-controls">
                                    <button className="quantity-btn" onClick={() => handleDecrease(item)}>-</button>
                                    <span className="quantity-display">{item.quantity}</span>
                                    <button className="quantity-btn" onClick={() => handleAddToCart(item)}>+</button>
                                </div>
                                <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <button className="cart-item-remove" onClick={() => handleRemoveFromCart(item.id)}>
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>
            <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
            <div className='button-container'>
            <button className="viewOrder-button" onClick={handleOrder}>View Order Summary</button>
            <button className="back-button" onClick={handleBack}>Back</button>
            </div>
        </div>
    );
};

export default Cart;
