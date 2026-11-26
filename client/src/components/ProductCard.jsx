import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

function ProductCard({ producto, esDestacado = false }) {
    const navigate = useNavigate();
    const { carrito, agregarAlCarrito } = useContext(CartContext);
    const cantidadEnCarrito = carrito.find((item) => item._id === producto._id)?.cantidad ?? 0;
    const stock = Number(producto.stock ?? 0);
    const limiteAlcanzado = cantidadEnCarrito >= stock;
    
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
                disabled={limiteAlcanzado}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    agregarAlCarrito(producto);
                }}>
                {stock <= 0 ? "Sin stock" : limiteAlcanzado ? "Máximo alcanzado" : "Añadir al carrito"}
            </button>
        </div>
    );
}

export default ProductCard;
