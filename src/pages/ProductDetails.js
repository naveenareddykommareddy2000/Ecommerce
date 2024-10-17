import React, { useState, useEffect, useContext } from 'react';
import { fetchProductsById } from '../api/productApi';
import { useParams,useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ProductDetails.css';


const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [successMessage, setSuccessMessage] = useState('');
    const { dispatch } = useContext(CartContext); 
    const navigate = useNavigate(); 



    useEffect(() => {
        async function getProduct() {
            const data = await fetchProductsById(id);
            setProduct(data);
        }
        getProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (quantity > 0) {
            dispatch({
                type: 'ADD_TO_CART',
                payload: { ...product, quantity },
            });
            setSuccessMessage(`${product.title} added to cart! 🎉`);
            setQuantity(1);
            setTimeout(() => setSuccessMessage(''), 3000); 
        } else {
            setSuccessMessage('Please select a valid quantity.');
            setTimeout(() => setSuccessMessage(''), 3000); 
        }
    };

    const handleBack = () => {
        navigate('/home'); 
    };

    const goToCart=()=>{
        navigate('/cart');
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-details">
            <img src={product.image} alt={product.title} className="product-image" />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>

            <div className="button-container"> 
                <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="back-button" onClick={goToCart}>Go To Cart</button>
            </div>
            {successMessage && <p className="success-message">{successMessage}</p>}

            
        </div>
    );
};

export default ProductDetails;
