import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { abrirPanel, cantidad } = useContext(CartContext);
    const { currentUser, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        setMenuAbierto(false);
        navigate("/");
    };

    return (
        <header>
            <div id="contenedor-header">
                <Link to={"/"} id="header-logo" onClick={() => setMenuAbierto(false)}>
                    <img src="/icons/logo.svg" alt="" />
                    Hermanos Jota
                </Link>

                <nav>
                    <ul id="nav-lista" className={menuAbierto ? "activo" : ""}>
                        <li>
                            <Link to={"/"} className={location.pathname === "/" ? "active" : ""} onClick={() => setMenuAbierto(false)}>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to={"/productos"} className={location.pathname === "/productos" ? "active" : ""} onClick={() => setMenuAbierto(false)}>
                                Catálogo
                            </Link>
                        </li>
                        <li>
                            <Link to={"/contacto"} className={location.pathname === "/contacto" ? "active" : ""} onClick={() => setMenuAbierto(false)}>
                                Contacto
                            </Link>
                        </li>
                        {currentUser?.rol === "admin" && (
                            <li>
                                <Link to={"/admin/crear-producto"} className={location.pathname === "/admin/crear-producto" ? "active" : ""} onClick={() => setMenuAbierto(false)}>
                                    Crear Producto
                                </Link>
                            </li>
                        )}

                        {currentUser ? (
                            <>
                                <li>
                                    <Link to={"/profile"} className={location.pathname === "/profile" ? "active" : ""} onClick={() => setMenuAbierto(false)}>
                                        Hola, {currentUser.username}
                                    </Link>
                                </li>
                                <li>
                                    <button type="button" className="boton-secundario" onClick={handleLogout}>
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to={"/login"} className={location.pathname === "/login" ? "active" : ""} onClick={() => setMenuAbierto(false)}>
                                        Ingresar
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/registro"} className={location.pathname === "/registro" ? "active" : ""} onClick={() => setMenuAbierto(false)}>
                                        Registrarse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                <button id="header-carrito" onClick={() => abrirPanel}>
                    <img src="/icons/carrito.svg" alt="Ver Carrito" />
                    <span id="contador-carrito">{cantidad}</span>
                </button>
                <button id="boton-menu" onClick={() => setMenuAbierto(!menuAbierto)}>
                    ☰
                </button>
            </div>
        </header>
    );
}

export default Navbar;
