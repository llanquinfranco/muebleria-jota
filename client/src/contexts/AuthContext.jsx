import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL || "";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    const [cargando, setCargando] = useState(true);

    // Este efecto se ejecuta solo una vez, cuando la app carga.
    useEffect(() => {
        const checkAuth = () => {
            const savedToken = localStorage.getItem("authToken");
            if (!savedToken) {
                setCargando(false);
                return;
            }
            try {
                const decodedUser = jwtDecode(savedToken);

                // Comprobar si el token expiró
                if (decodedUser.exp && decodedUser.exp * 1000 < Date.now()) {
                    localStorage.removeItem("authToken");
                    setCurrentUser(null);
                    setToken(null);
                    return;
                }

                // Si el token sigue vigente, restaurar la sesión
                setToken(savedToken);
                setCurrentUser(decodedUser);
            } catch (error) {
                localStorage.removeItem("authToken");
                setCurrentUser(null);
                setToken(null);
                console.error("Error al restaurar la sesión:", error);
            } finally {
                setCargando(false);
            }
        };
        checkAuth();
    }, []);

    async function login({ email, password }){
        const respuesta = await fetch(`${API_URL}/api/usuarios/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await respuesta.json();
        if (!respuesta.ok) {
            throw new Error(data.message || "Error al iniciar sesión");
        }
        localStorage.setItem("authToken", data.token);
        const decodedUser = jwtDecode(data.token);
        setToken(data.token);
        setCurrentUser(decodedUser);
    }

    function logout() {
        localStorage.removeItem("authToken");
        setToken(null);
        setCurrentUser(null);
    }
    
    async function registrar({ username, email, password }) {
        const res = await fetch(`${API_URL}/api/usuarios/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || "Error al registrarse");
        }
        await login({ email, password });
    }
    
    const value = { currentUser, token, cargando, login, logout, registrar };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
