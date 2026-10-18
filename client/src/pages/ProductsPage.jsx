import { useState } from "react";
import ProductList from "../components/ProductList";

function ProductsPage({ productos, cargando, error, agregarAlCarrito }) {
    
    const [busqueda, setBusqueda] = useState("");

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

    return (
        <section>
            <h2 id="titulo-catalogo">Nuestro Catalogo</h2>

            <input type="text" id="buscador" placeholder="Busque su mueble aquí" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

            <ProductList productos={productosFiltrados} cargando={cargando} error={error} agregarAlCarrito={agregarAlCarrito} />
        </section>
    );
}

export default ProductsPage;
