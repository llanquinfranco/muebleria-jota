import { useState, useEffect } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const API_URL = import.meta.env.VITE_API_URL || "";

function App() {
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

    return (
        <>
            <ScrollToTop />

            <Navbar />
            <CartSidebar />

            <main>
                <Routes>
                    <Route path="/" element={<HomePage productos={productos} cargando={cargando} error={error} />} />

                    <Route path="/productos" element={<ProductsPage productos={productos} cargando={cargando} error={error} />} />

                    <Route path="/productos/:id" element={<ProductDetailPage />} />

                    <Route path="/contacto" element={<ContactPage />} />

                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/registro" element={<RegisterPage />} />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/crear-producto"
                        element={
                            <ProtectedRoute soloAdmin>
                                <CreateProductPage key="crear" />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/editar-producto/:id"
                        element={
                            <ProtectedRoute soloAdmin>
                                <EditProductPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
