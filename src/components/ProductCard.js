import React from "react";
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
                <img src={product.image} alt={product.title} className="product-images" />
                <h3 className="products-title">{product.title}</h3>
                <p className="product-price">${product.price}</p>
            </Link>
        </div>
    );
};

export default ProductCard;
