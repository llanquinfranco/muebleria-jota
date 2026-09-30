import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

function App() {
    const [vista, setVista] = useState("home");
    const [carrito, setCarrito] = useState([]);
    const [destacados, setDestacados] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(true);

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
                console.error("Error al cargar el detalle:", err);
                setCargando(false);
            });
    }, []);

    function agregarAlCarrito(producto) {
        setCarrito((prevCarrito) => {
            const productoExistente = prevCarrito.find((item) => item.id == producto.id);
            if (productoExistente) {
                return prevCarrito.map((item) => (item.id == producto.id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item));
            }
            // Si es nuevo, lo agregamos con cantidad inicial en 1
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        });
    }

    return (
        <>
            <Navbar vista={vista} setVista={setVista} carrito={carrito} setCarrito={setCarrito} agregarAlCarrito={agregarAlCarrito} />

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
                                    destacados.map((producto) => (
                                        <div
                                            className="tarjeta-destacado"
                                            key={producto.id}
                                            onClick={() => {
                                                setProductoSeleccionado(producto.id);
                                                setVista("detalle");
                                            }}>
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
                )}

                {vista === "productos" && <ProductList setVista={setVista} setProductoSeleccionado={setProductoSeleccionado} agregarAlCarrito={agregarAlCarrito} />}

                {vista === "detalle" && <ProductDetail productoId={productoSeleccionado} setVista={setVista} agregarAlCarrito={agregarAlCarrito} />}

                {vista === "contacto" && <ContactForm />}
            </main>

            <Footer setVista={setVista} />
        </>
    );
}

export default App;
