import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function ProductCard({ producto, esDestacado = false }) {
    const navigate = useNavigate();
    const { agregarAlCarrito } = useContext(CartContext);

    return (
        <div className="tarjeta-producto" onClick={() => navigate(`/productos/${producto._id}`)}>
            <img src={producto.imagenUrl} alt={producto.nombre} />
            <h2>{producto.nombre}</h2>
            <p className="producto-precio">${producto.precio.toLocaleString("es-AR")}</p>
            {!esDestacado && (
                <p className="producto-descripcion">{producto.descripcion}</p>
            )}
            <button
                className="boton-primario"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    agregarAlCarrito(producto);
                }}>
                Añadir al carrito
            </button>
        </div>
    );
}

export default ProductCard;
