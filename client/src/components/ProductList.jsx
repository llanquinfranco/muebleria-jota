import ProductCard from "./ProductCard";

function ProductList({ productos }) {
    
    if (productos.length === 0) {
        return <h2 className="mensaje-estado">No se encontraron muebles que coincidan con la búsqueda</h2>;
    }
    
    return (
        <div id="contenedor-catalogo">
            {productos.map((producto) => (
                <ProductCard key={producto._id} producto={producto} />
            ))}
        </div>
    );
}

export default ProductList;
