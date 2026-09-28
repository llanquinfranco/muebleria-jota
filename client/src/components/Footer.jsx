function Footer({setVista}) {
    return (
        <footer>
            <div id="contenedor-footer">
                <div className="footer-columna columna-logo">
                    <img src="/icons/logo.svg" alt="Hermanos Jota" id="logo-footer" />
                    <div className="logo-info">
                        <p>
                            <strong>Hermanos Jota</strong>
                        </p>
                        <p>Somos el redescubrimiento de un arte olvidado</p>
                    </div>
                </div>

                <div className="footer-columna">
                    <h3>Dirección</h3>
                    <p>Av. San Juan 2847</p>
                    <p>C1232AAB — Barrio de San Cristóbal</p>
                    <p>CABA, Argentina</p>
                    <h3>Horarios</h3>
                    <p>Lunes a Viernes: 10:00 - 19:00</p>
                    <p>Sábados: 10:00 - 14:00</p>
                </div>

                <div className="footer-columna">
                    <h3>Contactanos</h3>
                    <p>
                        <img src="/icons/whatsapp-white.svg" alt="WhatsApp" className="icono-footer" id="icono-wpp" />
                        +54 11 4567-8900
                    </p>
                    <p>
                        <img src="/icons/gmail-white.svg" alt="Gmail" className="icono-footer" />
                        info@hermanosjota.com.ar
                    </p>
                    <p>
                        <img src="/icons/gmail-white.svg" alt="Gmail" className="icono-footer" />
                        ventas@hermanosjota.com.ar
                    </p>
                    <p>
                        <img src="/icons/instagram-white.svg" alt="Instagram" className="icono-footer" />
                        @hermanosjota_ba
                    </p>
                    <h3>Navegación</h3>
                    <ul>
                        <li>
                            <a onClick={(e) => { e.preventDefault(); setVista('home'); }}>Inicio</a>
                        </li>
                        <li>
                            <a onClick={(e) => { e.preventDefault(); setVista('productos'); }}>Catálogo de productos</a>
                        </li>
                        <li>
                            <a onClick={(e) => { e.preventDefault(); setVista('contacto'); }}>Contacto</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="footer-copyright">
                <p>
                    <strong>© 2026 Hermanos Jota.</strong> Todos los derechos reservados
                </p>
            </div>
        </footer>
    );
}

export default Footer;
