import React, { useState, useEffect, useContext } from "react";
import { fetchProducts } from '../api/productApi';
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext";
import './Home.css';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Home = ({ searchItem, sortBy, category, minPrice, maxPrice }) => {
    const { isAuthenticated } = useContext(AuthContext); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProducts() {
            const data = await fetchProducts();
            setProducts(data);
            setLoading(false);
        }
        getProducts();
    }, []);

    const filteredProducts = products
        .filter(product => product.title.toLowerCase().includes(searchItem.toLowerCase()))
        .filter(product => (category ? product.category === category : true))
        .filter(product => (minPrice === null || minPrice === "" || product.price >= minPrice))               
        .filter(product => (maxPrice === null || maxPrice === "" || product.price <= maxPrice))
        .sort((a, b) => sortBy === 'price' ? a.price - b.price : 0);

    if (loading) return (
        <div className="loading-container">
            <h1>Welcome</h1>
            <AiOutlineLoading3Quarters className="loading-spinner" />
            <p>Loading products...</p>
        </div>
    );

    if (!isAuthenticated) {
        <>
        </>
        return (
            <div className="h-container">
                <AiOutlineLoading3Quarters className="loading-spinner" />
                <h2>Please log in to view products.</h2>
            </div>
        );
    }

    return (
        <div>
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Home;
