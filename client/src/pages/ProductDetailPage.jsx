import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";

function ProductDetailPage( {agregarAlCarrito} ) {
    
    const { id } = useParams();
    
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = `/api/productos/${id}`;
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
    
    if (cargando) {
        return <h2 className="mensaje-estado">Cargando detalle del producto...</h2>;
    }

    if (error) {
        return <h2 className="mensaje-estado">Error al cargar el detalle del producto {id}:<br />
                "{error}"</h2>;
    }
    
    return(
        <>
            <ProductDetail producto={producto} agregarAlCarrito={agregarAlCarrito}/>
        </>
    );
}

export default ProductDetailPage;