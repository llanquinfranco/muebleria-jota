import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("carrito")) || [];
        } catch {
            return [];
        }
    });
    const [panelAbierto, setPanelAbierto] = useState(false);
    
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    function abrirPanel() {
        setPanelAbierto(true);
    }

    function cerrarPanel() {
        setPanelAbierto(false);
    }

    function agregarAlCarrito(producto) {
        setCarrito((prevCarrito) => {
            const productoExistente = prevCarrito.find((item) => item._id == producto._id);
            if (productoExistente) {
                return prevCarrito.map((item) => (item._id == producto._id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item));
            }
            // Si es nuevo, lo agregamos con cantidad inicial en 1
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        });
    }

    function sumarUnidad(_id) {
        setCarrito(
            carrito.map((item) => {
                return item._id === _id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item;
            }),
        );
    }

    function restarUnidad(_id) {
        setCarrito(
            carrito
                .map((item) => {
                    if (item._id === _id) {
                        return { ...item, cantidad: item.cantidad - 1 };
                    }
                    return item;
                })
                .filter((item) => item.cantidad > 0),
        );
    }

    function eliminarDelCarrito(_id) {
        setCarrito(carrito.filter((item) => item._id !== _id));
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const totalPrecio = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

    const value = { carrito, panelAbierto, abrirPanel, cerrarPanel, agregarAlCarrito, sumarUnidad, restarUnidad, eliminarDelCarrito, vaciarCarrito, cantidad, totalPrecio };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
