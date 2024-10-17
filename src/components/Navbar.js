import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { CgProfile } from "react-icons/cg";
import './Navbar.css';
import { IoSearchOutline } from "react-icons/io5";

const Navbar = ({ onSearch, onSort, onCategorySelect, onMinRangeChange, onMaxRangeChange }) => {
    const { state } = useContext(CartContext);
    const { cartItems = [] } = state;
    const { logout, isAuthenticated, userEmail } = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/Login');
    };

    return (
        <header className="navbar">
            <nav className="navbar-container">
                <div className="nav-items-left">
                    <Link to="/home" className="nav-link">Home</Link>
                    {isAuthenticated ? (
                        <>
                            <span><CgProfile />Hello, {userEmail}</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </>
                    )}
                </div>

                {isAuthenticated && (
                    <div className="search-sort-category">
                        <div className="search-container">
                            <IoSearchOutline className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search Products..."
                                onChange={(e) => onSearch(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        <select onChange={(e) => onSort(e.target.value)} className="sort-dropdown">
                            <option value="">Sort by</option>
                            <option value="price">Price</option>
                        </select>
                        <select onChange={(e) => onCategorySelect(e.target.value)}>
                            <option value="">All Categories</option>
                            <option value="electronics">Electronics</option>
                            <option value="jewelery">Jewelry</option>
                            <option value="men's clothing">Men's Clothing</option>
                            <option value="women's clothing">Women's Clothing</option>
                        </select>

                        <div className="price-range">
                            <input
                                type="number"
                                placeholder="Min Price"
                                className="range-input"
                                onChange={(e) => onMinRangeChange(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                className="range-input"
                                onChange={(e) => onMaxRangeChange(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                <div className="nav-items-right">
                    {isAuthenticated && (
                        <>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                            <Link to="/cart" className="cart-icon">
                                🛒 ({cartItems.length})
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
