import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); 
        setSuccessMessage(''); 

        if (password !== confirmPassword) {
            setErrorMessage("Password and ConfirmPassword do not match.");
            return;
        }

        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            setErrorMessage("User already exists. Please Login!!");
        } else {
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            setSuccessMessage("Signup successful! You can now log in.");
        }
    };

    return (
        <div className='signup-container'>
            <form onSubmit={handleSubmit} className='signup-form'>
                <h2>Signup</h2>
                <div className='signupinput-group'>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='signupinput-group'>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='signupinput-group'>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='signup-btn'>Signup</button>
                {errorMessage && <p className="signuperror-message">{errorMessage}</p>}
                {successMessage && <p className="signupsuccess-message">{successMessage}</p>}
            </form>
        </div>
    );
};

export default Signup;
