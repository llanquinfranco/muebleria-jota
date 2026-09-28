
function ProductCard({ producto, verDetalle }) {
    
    return (
        <div className="tarjeta-producto" onClick={() => verDetalle(producto)}>
            <img src={producto.imagenURL} alt={producto.nombre} />
            <h2>{producto.nombre}</h2>
            <p className="producto-precio">${producto.precio.toLocaleString("es-AR")}</p>
            <p className="producto-descripcion">{producto.descripcion}</p>
            <button className="boton-primario" onClick={(e) => e.stopPropagation()}>
                Añadir al carrito
            </button>
            
        </div>);
}

export default ProductCard;
