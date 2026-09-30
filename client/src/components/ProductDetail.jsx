import { useEffect, useState, Fragment } from "react";

function ProductDetail({ productoId, setVista, agregarAlCarrito }) {
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const url = `http://localhost:3000/api/productos/${productoId}`;
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al conectar con el servidor");
                }
                return res.json();
            })
            .then((data) => {
                setProducto(data);
                setCargando(false);
            })
            .catch((err) => {
                console.error("Error al cargar el detalle:", err);
                setCargando(false);
            });
    }, [productoId]);
    
    if (cargando || !producto) {
        return <h2 id="mensaje-carga" style={{ textAlign: "center", marginTop: "50px" }}>Cargando Detalle...</h2>;
    }

    return (
        <>
            <div id="detalle-volver">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setVista("productos");
                    }}>
                    ← Volver al catálogo
                </a>
            </div>
            <div id="contenedor-detalle">
                <div id="detalle-imagen">
                    <img src={producto.imagenURL} alt={producto.nombre} />
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
                        {Object.entries(producto.detalles).map(([clave, valor]) => {
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
