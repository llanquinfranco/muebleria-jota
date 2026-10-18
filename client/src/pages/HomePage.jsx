import { Link, useNavigate } from "react-router-dom";

function HomePage({productos, cargando, error, agregarAlCarrito}) {
    
    const navigate = useNavigate();
    const destacados = productos.filter((producto) => producto.destacado).slice(0, 4);
    
    return (
        <>
            <section id="hero-banner">
                <div className="hero-contenido">
                    <h1>Muebles que alimentan el alma</h1>
                    <p>Existimos en la intersección entre herencia e innovación. La calidez del optimismo de los años 60 se encuentra con la conciencia de la sustentabilidad del 2026.</p>
                    <Link to={"/productos"} className="boton-primario">Explorar Catalogo</Link>
                    
                </div>
            </section>
            <section id="productos-destacados">
                <div id="cabecera-destacados">
                    <h2>Productos Destacados</h2>
                    <Link to={"/productos"} className="boton-secundario">Ver Todo</Link>
                </div>
                <div id="contenedor-destacados">
                    {cargando ? (
                        <p>Cargando destacados...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        destacados.map((producto) => (
                            <div
                                className="tarjeta-destacado"
                                key={producto.id}
                                onClick={() => navigate(`/productos/${producto.id}`)}>
                                <img src={producto.imagenURL} alt={producto.nombre} />
                                <h2>{producto.nombre}</h2>
                                <p>${producto.precio.toLocaleString("es-AR")}</p>
                                <button
                                    className="boton-primario"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        agregarAlCarrito(producto);
                                    }}>
                                    Añadir al Carrito
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </>
    );
}

export default HomePage;
