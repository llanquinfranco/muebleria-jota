import { useState, useEffect, useCallback, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import ProfilePage from "./pages/ProfilePage";
import MyOrdersPage from "./pages/MyOrdersPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const API_URL = import.meta.env.VITE_API_URL || "";

function App() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const ultimaCarga = useRef(0);

    // Se llama al montar y después de eliminar un producto, para que el catálogo se actualice
    const cargarProductos = useCallback(async () => {
        const cargaActual = ++ultimaCarga.current;
        try {
            setCargando(true);
            const res = await fetch(`${API_URL}/api/productos`);
            if (!res.ok) {
                throw new Error("Error al conectar con el servidor");
            }
            const data = await res.json();
            if (cargaActual !== ultimaCarga.current) {
                return;
            }
            setProductos(data);
            setError(null);
        } catch (err) {
            if (cargaActual !== ultimaCarga.current) {
                return;
            }
            console.error("Error al cargar los productos:", err);
            setError(err.message);
        } finally {
            if (cargaActual === ultimaCarga.current) {
                setCargando(false);
            }
        }
    }, []);

    // Carga inicial de productos desde la API
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarProductos();
    }, [cargarProductos]);

    return (
        <>
            <ScrollToTop />

            <Navbar />
            <CartSidebar />

            <main>
                <Routes>
                    <Route path="/" element={<HomePage productos={productos} cargando={cargando} error={error} />} />

                    <Route path="/productos" element={<ProductsPage productos={productos} cargando={cargando} error={error} />} />

                    <Route path="/productos/:id" element={<ProductDetailPage cargarProductos={cargarProductos} />} />

                    <Route path="/contacto" element={<ContactPage />} />

                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/registro" element={<RegisterPage />} />

                    <Route
                        path="/perfil"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/mis-pedidos"
                        element={
                            <ProtectedRoute>
                                <MyOrdersPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/finalizar-compra"
                        element={
                            <ProtectedRoute>
                                <CheckoutPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/crear-producto"
                        element={
                            <ProtectedRoute soloAdmin>
                                <CreateProductPage key="crear" cargarProductos={cargarProductos} />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/editar-producto/:id"
                        element={
                            <ProtectedRoute soloAdmin>
                                <EditProductPage cargarProductos={cargarProductos} />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route path="*" element={<NotFoundPage />} />
                    
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
