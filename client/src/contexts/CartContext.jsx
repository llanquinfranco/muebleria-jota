import { createContext, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [panelAbierto, setPanelAbierto] = useState(false);
    
    function abrirPanel() {
        setPanelAbierto(true);
    }
    
    function cerrarPanel() {
        setPanelAbierto(false);
    }

    function agregarAlCarrito(producto) {
        setCarrito((prevCarrito) => {
            const productoExistente = prevCarrito.find((item) => item.id == producto.id);
            if (productoExistente) {
                return prevCarrito.map((item) => (item.id == producto.id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item));
            }
            // Si es nuevo, lo agregamos con cantidad inicial en 1
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        });
    }

    function sumarUnidad(id) {
        setCarrito(
            carrito.map((item) => {
                return item.id === id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item;
            }),
        );
    }

    function restarUnidad(id) {
        setCarrito(
            carrito
                .map((item) => {
                    if (item.id === id) {
                        return { ...item, cantidad: item.cantidad - 1 };
                    }
                    return item;
                })
                .filter((item) => item.cantidad > 0),
        );
    }

    function eliminarDelCarrito(id) {
        setCarrito(carrito.filter((item) => item.id !== id));
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const totalPrecio = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

    const value = { carrito, panelAbierto, abrirPanel, cerrarPanel, agregarAlCarrito, sumarUnidad, restarUnidad, eliminarDelCarrito, vaciarCarrito, cantidad, totalPrecio };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
