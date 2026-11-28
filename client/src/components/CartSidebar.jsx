import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

function CartSidebar() {
    const navigate = useNavigate();
    const { carrito, panelAbierto, cerrarPanel, sumarUnidad, restarUnidad, eliminarDelCarrito, vaciarCarrito, totalPrecio } = useContext(CartContext);

    return (
        <>
            <div id="overlay-carrito" className={panelAbierto ? "" : "oculto"} onClick={cerrarPanel}></div>

            <aside id="panel-carrito" className={panelAbierto ? "" : "oculto"}>
                <div className="panel-cabecera">
                    <h2>Mi carrito</h2>
                    <button id="boton-cerrar-panel" onClick={cerrarPanel}>
                        X
                    </button>
                </div>
                <div id="panel-contenido">
                    {carrito.length === 0 ? (
                        <p>Tu carrito está vacío.</p>
                    ) : (
                        carrito.map((producto) => (
                            <div className="fila-panel" key={producto._id}>
                                <img src={producto.imagenUrl} alt={producto.nombre} />
                                <div className="fila-info">
                                    <h4>{producto.nombre}</h4>
                                    <div className="controles-cantidad">
                                        <button className="boton-restar" onClick={() => restarUnidad(producto._id)}>
                                            -
                                        </button>
                                        <span>{producto.cantidad}</span>
                                        <button className="boton-sumar" disabled={producto.cantidad >= Number(producto.stock ?? 0)} onClick={() => sumarUnidad(producto._id)}>
                                            +
                                        </button>
                                    </div>

                                    <p className="fila-subtotal">${(producto.precio * producto.cantidad).toLocaleString("es-AR")}</p>
                                </div>
                                <button className="boton-eliminar-item" onClick={() => eliminarDelCarrito(producto._id)}>
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

                    <button
                        className="boton-primario"
                        onClick={() => {
                            cerrarPanel();
                            navigate("/finalizar-compra");
                        }}>
                        Ir al Pago
                    </button>
                </div>
            </aside>
        </>
    );
}

export default CartSidebar;
