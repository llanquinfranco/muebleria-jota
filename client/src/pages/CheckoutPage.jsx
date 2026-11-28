import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "";

function CheckoutPage() {
    const { token } = useContext(AuthContext);
    const { carrito, totalPrecio, vaciarCarrito } = useContext(CartContext);
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);
    const navigate = useNavigate();

    async function finalizarCompra() {
        setError("");
        setEnviando(true);

        try {
            const res = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    items: carrito.map((item) => ({
                        productId: item._id,
                        quantity: item.cantidad,
                    })),
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "No se pudo crear el pedido");

            vaciarCarrito();
            navigate("/mis-pedidos", { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <section>
            <h2>Confirmar pedido</h2>
            <p>Total aproximado: ${totalPrecio.toLocaleString("es-AR")}</p>
            {error && <p className="mensaje-estado">{error}</p>}
            <button className="boton-primario" onClick={finalizarCompra} disabled={enviando || carrito.length === 0}>
                {enviando ? "Procesando..." : "Confirmar pedido"}
            </button>
        </section>
    );
}

export default CheckoutPage;
