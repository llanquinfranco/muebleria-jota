import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({carrito, setCarrito}) {
    const [panelAbierto, setPanelAbierto] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);
    
    const location = useLocation();

    function sumarUnidad(id) {
        setCarrito(
            carrito.map((item) => {
                return item.id === id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item;
            }),
        );
    }

    function restarUnidad(id) {
        setCarrito(
            carrito
                .map((item) => {
                    if (item.id === id) {
                        return { ...item, cantidad: item.cantidad - 1 };
                    }
                    return item;
                })
                .filter((item) => item.cantidad > 0),
        );
    }

    function eliminarDelCarrito(id) {
        setCarrito(carrito.filter((item) => item.id !== id));
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const totalPrecio = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

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
                    </ul>
                </nav>

                <button id="header-carrito" onClick={() => setPanelAbierto(true)}>
                    <img src="/icons/carrito.svg" alt="Ver Carrito" />
                    <span id="contador-carrito">{cantidad}</span>
                </button>
                <button id="boton-menu" onClick={() => setMenuAbierto(!menuAbierto)}>
                    ☰
                </button>
            </div>

            <div id="overlay-carrito" className={panelAbierto ? "" : "oculto"} onClick={() => setPanelAbierto(false)}></div>

            <aside id="panel-carrito" className={panelAbierto ? "" : "oculto"}>
                <div className="panel-cabecera">
                    <h2>Mi carrito</h2>
                    <button id="boton-cerrar-panel" onClick={() => setPanelAbierto(false)}>
                        X
                    </button>
                </div>
                <div id="panel-contenido">
                    {carrito.length === 0 ? (
                        <p>Tu carrito está vacío.</p>
                    ) : (
                        carrito.map((producto) => (
                            <div className="fila-panel" key={producto.id}>
                                <img src={producto.imagenURL} alt={producto.nombre} />
                                <div className="fila-info">
                                    <h4>{producto.nombre}</h4>
                                    <div className="controles-cantidad">
                                        <button className="boton-restar" onClick={() => restarUnidad(producto.id)}>
                                            -
                                        </button>
                                        <span>{producto.cantidad}</span>
                                        <button className="boton-sumar" onClick={() => sumarUnidad(producto.id)}>
                                            +
                                        </button>
                                    </div>

                                    <p className="fila-subtotal">${(producto.precio * producto.cantidad).toLocaleString("es-AR")}</p>
                                </div>
                                <button className="boton-eliminar-item" onClick={() => eliminarDelCarrito(producto.id)}>
                                    <img src="/icons/trash.svg" alt="Eliminar" className="icono-basura" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="panel-pie">
                    <h3 id="panel-total">Total: ${totalPrecio.toLocaleString("es-AR")}</h3>
                    {carrito.length > 0 && (
                        <button id="boton-vaciar-panel" className="boton-secundario" onClick={vaciarCarrito}>
                            Vaciar Carrito
                        </button>
                    )}

                    <button className="boton-primario">Ir al Pago</button>
                </div>
            </aside>
        </header>
    );
}

export default Navbar;
