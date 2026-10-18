import ProductCard from "./ProductCard";

function ProductList({ productos, cargando, error, agregarAlCarrito }) {
    return (
        <div id="contenedor-catalogo">
            {cargando ? (
                <p>Cargando catálogo...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : productos.length > 0 ? (
                productos.map((producto) => <ProductCard key={producto.id} producto={producto} agregarAlCarrito={agregarAlCarrito} />)
            ) : (
                <h3>No se encontraron muebles que coincidan con la búsqueda</h3>
            )}
        </div>
    );
}

export default ProductList;
