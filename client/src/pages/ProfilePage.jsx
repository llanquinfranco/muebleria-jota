import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const API_URL = import.meta.env.VITE_API_URL || "";

function ProfilePage() {
    const { logout } = useContext(AuthContext);
    const [perfil, setPerfil] = useState(null);
    const [mensaje, setMensaje] = useState("Cargando...");

    useEffect(() => {
        const cargarPerfil = async () => {
            const token = localStorage.getItem("authToken");
            const res = await fetch(`${API_URL}/api/usuarios/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 401) {
                logout();
                return;
            }

            const data = await res.json();
            if (!res.ok) {
                setMensaje(data.mensaje || "No se pudo cargar el perfil");
                return;
            }

            setPerfil(data.usuario || data);
            setMensaje("");
        };

        cargarPerfil();
    }, [logout]);

    if (!perfil) return <p className="mensaje-estado">{mensaje}</p>;

    return (
        <section id="contenedor-perfil">
            <h2>Mi perfil</h2>
            <div className="tarjeta-perfil">
                <p>
                    <strong>Nombre:</strong> {perfil.username}
                </p>
                <p>
                    <strong>Email:</strong> {perfil.email}
                </p>
                <p>
                    <strong>Rol:</strong> {perfil.rol}
                </p>
            </div>
        </section>
    );
}

export default ProfilePage;

{/* import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const API_URL = import.meta.env.VITE_API_URL || "";

function ProfilePage() {
    const { token, logout } = useContext(AuthContext);
    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const res = await fetch(`${API_URL}/api/usuarios/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.status === 401) {
                    logout();
                    return;
                }

                const data = await res.json();
                if (!res.ok) {
                    setError(data.message || "No se pudo cargar el perfil");
                    return;
                }

                setPerfil(data);
            } catch (err) {
                setError("Error de conexión al cargar el perfil");
            } finally {
                setCargando(false);
            }
        };

        if (token) {
            cargarPerfil();
        }
    }, [token, logout]);

    if (cargando) return <p className="mensaje-estado">Cargando...</p>;
    if (error) return <p className="mensaje-error">{error}</p>;
    if (!perfil) return null;

    return (
        <section id="contenedor-perfil">
            <h2>Mi perfil</h2>
            <div className="tarjeta-perfil">
                <p>
                    <strong>Nombre:</strong> {perfil.username}
                </p>
                <p>
                    <strong>Email:</strong> {perfil.email}
                </p>
                <p>
                    <strong>Rol:</strong> {perfil.rol}
                </p>
            </div>
        </section>
    );
}

export default ProfilePage; */}
