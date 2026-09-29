import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

import Footer from "./components/Footer";

function App() {
    const [vista, setVista] = useState("home");
    const [carrito, setCarrito] = useState([]);
    const [destacados, setDestacados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = "http://localhost:3000/api/productos";
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al conectar con el servidor");
                }
                return res.json();
            })
            .then((data) => {
                const productosDestacados = data
                    .filter((mueble) => mueble.destacado)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 4);
                setDestacados(productosDestacados);
                setCargando(false);
            })
            .catch((err) => {
                setError(err.message);
                setCargando(false);
            });
    }, []);

    function agregarAlCarrito(producto) {
        setCarrito([...carrito, producto]);
    }

    return (
        <>
            <Navbar vista={vista} setVista={setVista} cantidad={carrito.length} />

            <main>
                {vista === "home" && (
                    <>
                        <section id="hero-banner">
                            <div className="hero-contenido">
                                <h1>Muebles que alimentan el alma</h1>
                                <p>Existimos en la intersección entre herencia e innovación. La calidez del optimismo de los años 60 se encuentra con la conciencia de la sustentabilidad del 2026.</p>
                                <a
                                    href="#"
                                    className="boton-primario"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setVista("productos");
                                    }}>
                                    Explorar Catálogo
                                </a>
                            </div>
                        </section>
                        <section id="productos-destacados">
                            <div id="cabecera-destacados">
                                <h2>Productos Destacados</h2>
                                <a
                                    href="#"
                                    className="boton-secundario"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setVista("productos");
                                    }}>
                                    Ver Todo
                                </a>
                            </div>
                            <div id="contenedor-destacados">
                                {cargando ? (
                                    <p>Cargando destacados...</p>
                                ) : (
                                    destacados.map((mueble) => (
                                        <div className="tarjeta-destacado" key={mueble.id}>
                                            <img src={mueble.imagenURL} alt={mueble.nombre} />
                                            <h2>{mueble.nombre}</h2>
                                            <p>${mueble.precio.toLocaleString("es-AR")}</p>
                                            <button className="boton-primario" onClick={() => agregarAlCarrito(mueble)}>
                                                Añadir al Carrito
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </>
                )}

                {vista === "productos" && <ProductList />}
            </main>

            <Footer setVista={setVista} />
        </>
    );
}

export default App;
