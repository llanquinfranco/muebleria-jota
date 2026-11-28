import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <section className="mensaje-estado">
            <h2>Página no encontrada</h2>
            <Link to="/">Volver al inicio</Link>
        </section>
    );
}

export default NotFoundPage;