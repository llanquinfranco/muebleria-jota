import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
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
                setProductos(data);
                setCargando(false);
            })
            .catch((err) => {
                setError(err.message);
                setCargando(false);
            });
    }, []);

    const quitarAcentos = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const textoBuscado = quitarAcentos(busqueda.trim());
    const productosFiltrados = productos.filter((mueble) => {
        const nombreMueble = quitarAcentos(mueble.nombre || "");
        const categoriaMueble = quitarAcentos(mueble.categoria || "");
        return nombreMueble.startsWith(textoBuscado) || categoriaMueble.startsWith(textoBuscado);
    });

    if (error) {
        return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    return (
        <main>
            <h2>Nuestro Catalogo</h2>
            
            <input 
                type="text" 
                id="buscador" 
                placeholder="Busque su mueble aquí" 
                value={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)} 
            />
            
            <div id="contenedor-catalogo">
                {cargando ? (
                    <p>Cargando catálogo de muebles...</p>
                ) : productosFiltrados.length > 0 ? (
                    productosFiltrados.map((prod) => <ProductCard key={prod.id} producto={prod} />)
                ) : (
                    <h3>No se encontraron muebles que coincidan con la búsqueda</h3>
                )}
            </div>
        </main>
    );
}

export default ProductList;
