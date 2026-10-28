import { Fragment } from "react";
import { Link } from "react-router-dom";

function ProductDetail({ producto, agregarAlCarrito }) {
    
    return (
        <>
            <div id="detalle-volver">
                <Link to={"/productos"}>
                    ← Volver al catálogo
                </Link>
            </div>
            <div id="contenedor-detalle">
                <div id="detalle-imagen">
                    <img src={producto.imagenUrl} alt={producto.nombre} />
                </div>
                <div id="detalle-info">
                    <p>{producto.categoria}</p>
                    <h1>{producto.nombre}</h1>
                    <div className="precio-y-boton">
                        <p className="precio">${producto.precio.toLocaleString("es-AR")}</p>
                        <button id="boton-agregar" className="boton-primario" onClick={() => agregarAlCarrito(producto)}>
                            Añadir al Carrito
                        </button>
                    </div>
                    <p className="descripcion">{producto.descripcion}</p>
                    <dl id="detalle-especificaciones">
                        <h3>DETALLES DE FABRICACIÓN</h3>
                        {Object.entries(producto.detalles || {}).map(([clave, valor]) => {
                            const claveMayuscula = clave.charAt(0).toUpperCase() + clave.slice(1);
                            return (
                                <Fragment key={clave}>
                                    <dt>{claveMayuscula}</dt>
                                    <dd>{valor}</dd>
                                </Fragment>
                            );
                        })}
                    </dl>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
