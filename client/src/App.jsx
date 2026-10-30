import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import Footer from "./components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "";

function App() {
    
    const [carrito, setCarrito] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = `${API_URL}/api/productos`;
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al conectar con el servidor");
                }
                return res.json();
            })
            .then((data) => {
                setProductos(data);
                setError(null);
            })
            .catch((err) => {
                console.error("Error al cargar el detalle:", err);
                setError(err.message);
            })
            .finally(() => {
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
            <Navbar carrito={carrito} setCarrito={setCarrito}/>

            <main>
                <Routes>
                    
                    <Route path="/" element={<HomePage productos={productos} cargando={cargando} error={error} agregarAlCarrito={agregarAlCarrito}/>} />
                    
                    <Route path="/productos" element={<ProductsPage productos={productos} cargando={cargando} error={error} agregarAlCarrito={agregarAlCarrito} />} />
                    
                    <Route path="/productos/:id" element={<ProductDetailPage agregarAlCarrito={agregarAlCarrito} />} />
                    
                    <Route path="/contacto" element={<ContactPage />} />
                    
                    <Route path="/admin/crear-producto" element={<CreateProductPage />} />
                    
                    <Route path="/admin/editar-producto/:id" element={<EditProductPage />} />
                    
                </Routes>
            </main>

            <Footer />

        </>
    );
}

export default App;
