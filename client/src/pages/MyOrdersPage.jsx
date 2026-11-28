import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "";

function MyOrdersPage() {
    const { token } = useContext(AuthContext);
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let activo = true;

        async function cargarPedidos() {
            try {
                const res = await fetch(`${API_URL}/api/orders/my`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "No se pudieron cargar los pedidos");
                if (activo) setPedidos(data);
            } catch (err) {
                if (activo) setError(err.message);
            } finally {
                if (activo) setCargando(false);
            }
        }

        cargarPedidos();
        return () => {
            activo = false;
        };
    }, [token]);

    if (cargando) return <p className="mensaje-estado">Cargando pedidos...</p>;
    if (error) return <p className="mensaje-estado">{error}</p>;

    return (
        <section>
            <h2>Mis pedidos</h2>
            {pedidos.length === 0 ? (
                <p>Todavía no tenés pedidos.</p>
            ) : (
                pedidos.map((pedido) => (
                    <article key={pedido._id}>
                        <h3>Pedido {pedido._id}</h3>
                        <p>Estado: {pedido.estado}</p>
                        {pedido.items.map((item, index) => (
                            <p key={`${pedido._id}-${index}`}>
                                {item.nombre} — {item.cantidad} × ${item.precio.toLocaleString("es-AR")}
                            </p>
                        ))}
                        <p>Total: ${pedido.total.toLocaleString("es-AR")}</p>
                    </article>
                ))
            )}
        </section>
    );
}

export default MyOrdersPage;
