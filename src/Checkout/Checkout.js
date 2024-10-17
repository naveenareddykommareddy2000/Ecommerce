import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0); 
    const [hoverRating, setHoverRating] = useState(0); 
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { state, dispatch } = useContext(CartContext); 
    const { userEmail } = useContext(AuthContext); 
    const cartItems = state.cartItems || [];

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleStarClick = (ratingValue) => {
        setRating(ratingValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            alert('Your cart is empty.');
        } else if (!userEmail) {
            alert('No email found for the logged-in user.');
        } else {
            alert(`Items successfully purchased! A confirmation email will be sent to ${userEmail}.`);
            setSubmitted(true);
            dispatch({ type: 'CLEAR_CART' });
        }
    };

    const handleBackToHome = () => {
        navigate('/order-summary');
    };

    const handleContinueShopping = () => {
        navigate('/home');
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${i <= (hoverRating || rating) ? 'filled' : ''}`} 
                    onClick={() => handleStarClick(i)}
                    onMouseEnter={() => setHoverRating(i)} 
                    onMouseLeave={() => setHoverRating(0)} 
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <h3>Purchasing by: {userEmail || 'No email found'}</h3>

            {!submitted ? (
                <form className="feedback-form" onSubmit={handleSubmit}>
                    <h3>Rate Your Experience</h3>
                    <div className="rating">
                        <label>Rating: </label>
                        <div className="star-rating">
                            {renderStars()} 
                        </div>
                    </div>
                    <div className="feedback">
                        <textarea
                            value={feedback}
                            onChange={handleFeedbackChange}
                            placeholder="Leave your feedback here..."
                            className="feedback-input"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Submit Feedback & Complete Purchase</button>
                </form>
            ) : (
                <div className="submitted-message">
                    <h3>Thank you for your feedback!</h3>
                    <p>A confirmation email has been sent to {userEmail}.</p>
                </div>
            )}

            <div className="checkout-actions">
                <button className="continue-shopping-button" onClick={handleContinueShopping}>Continue Shopping</button>
                <button className="back-home-button" onClick={handleBackToHome}>Back</button>
            </div>
        </div>
    );
};

export default Checkout;
