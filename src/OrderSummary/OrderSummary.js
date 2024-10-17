import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './OrderSummary.css'; 

const OrderSummary = () => {
    const { state } = useContext(CartContext);
    const navigate = useNavigate();
    const cartItems = state.cartItems || [];

    const handleCheckout = () => {
        navigate('/checkout'); 
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleBack = () => {
        navigate('/cart'); 
    };

    return (
        <div className="order-summary">
            <h2>Order Summary</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <span>{item.title} - ${item.price.toFixed(2)} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="total-price">
                        <h3>Total: ${calculateTotal()}</h3>
                    </div>
                    <div className='button-container'>
                    <button className="proceed-button" onClick={handleCheckout}>Proceed to Checkout</button>
                    <button className="back-button" onClick={handleBack}>Back</button>
                    </div>
                </div>

            
            )}
        </div>
    );
};

export default OrderSummary;
