import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";

const API_URL = import.meta.env.VITE_API_URL || "";

function ProductDetailPage( {agregarAlCarrito} ) {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = `${API_URL}/api/productos/${id}`;
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al conectar con el servidor");
                }
                return res.json();
            })
            .then((data) => {
                setProducto(data);
                setError(null);
            })
            .catch((err) => {
                console.error("Error al cargar el detalle:", err);
                setError(err.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, [id]);
    
    
    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/api/productos/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("No se pudo eliminar el producto");
            }
            navigate("/productos");
        } catch (err) {
            console.error("Error al eliminar:", err);
            alert(err.message);
        }
    };
    
    if (cargando) {
        return <h2 className="mensaje-estado">Cargando detalle del producto...</h2>;
    }

    if (error) {
        return <h2 className="mensaje-estado">Error al cargar el detalle del producto {id}:<br />
                "{error}"</h2>;
    }
    
    return(
        <>
            <ProductDetail producto={producto} agregarAlCarrito={agregarAlCarrito} handleDelete={handleDelete} />
        </>
    );
}

export default ProductDetailPage;