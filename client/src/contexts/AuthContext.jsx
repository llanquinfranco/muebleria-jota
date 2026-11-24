import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL || "";

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

    const login = async (email, password) => {
        const respuesta = await fetch(`${API_URL}/api/usuarios/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const datos = await respuesta.json();
        if (!respuesta.ok) {
            throw new Error(datos.message || datos.mensaje || "No se pudo iniciar sesión");
        }
        localStorage.setItem("authToken", datos.token);
        const decodedUser = jwtDecode(datos.token);
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


