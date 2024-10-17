import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail,setUserEmail]=useState(null);

    const login = (email) => {
        setIsAuthenticated(true);
        setUserEmail(email);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated,userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
