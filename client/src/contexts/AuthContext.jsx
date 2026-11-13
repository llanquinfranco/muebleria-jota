import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // Este efecto se ejecuta solo una vez, cuando la app carga.
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const decodedUser = jwtDecode(token);
                    setCurrentUser(decodedUser);
                } catch (error) {
                    // Token inválido o expirado, lo borramos
                    localStorage.removeItem("authToken");
                    console.log(error);
                }
            }
        };
        checkAuth();
    }, []);

    const login = (token) => {
        localStorage.setItem("authToken", token);
        const decodedUser = jwtDecode(token);
        setCurrentUser(decodedUser);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setCurrentUser(null);
    };
    
    const value = { currentUser, login, logout };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


