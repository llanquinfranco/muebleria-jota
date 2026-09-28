function Navbar({ vista, setVista, cantidad }) {
    return (
        <header>
            <div id="contenedor-header">
                <a
                    href="#"
                    id="header-logo"
                    onClick={(e) => {
                        e.preventDefault();
                        setVista("home");
                    }}>
                    <img src="/icons/logo.svg" alt="" />
                    Hermanos Jota
                </a>

                <nav>
                    <ul id="nav-lista">
                        <li>
                            <a
                                href="#"
                                className={vista === "home" ? "active" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setVista("home");
                                }}>
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={vista === "productos" ? "active" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setVista("productos");
                                }}>
                                Catálogo
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={vista === "contacto" ? "active" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setVista("contacto");
                                }}>
                                Contacto
                            </a>
                        </li>
                    </ul>
                </nav>

                <button id="header-carrito">
                    <img src="/icons/carrito.svg" alt="Ver Carrito" />
                    <span id="contador-carrito">{cantidad}</span>
                </button>
                <button id="boton-menu">☰</button>
            </div>
        </header>
    );
}

export default Navbar;
