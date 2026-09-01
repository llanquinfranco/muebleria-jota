export function cargarHeader() {
    const header = document.createElement("header");
    header.innerHTML = `
        <div id="contenedor-header">
            <a href="index.html" id="header-logo">
                <img src="assets/icons/logo.svg" alt="">
                Hermanos Jota
            </a>
                
            <nav id="header-nav">
                <ul>
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="productos.html">Catálogo</a></li>
                    <li><a href="contacto.html">Contacto</a></li>
                </ul>
            </nav>
                
            <span id="contador-carrito">0</span>
        </div>`;
    document.body.prepend(header);
}

export function cargarFooter() {
    const footer = document.createElement("footer");
    footer.innerHTML = `
        <div id="contenedor-footer">
                
            <div class="footer-columna">
                <h3>Navegación</h3>
                <ul>
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="productos.html">Catálogo de productos</a></li>
                    <li><a href="contacto.html">Contacto</a></li>
                </ul>
            </div>
                
            <div class="footer-columna">
                <h3>Dirección</h3>
                <p>Av. San Juan 2847</p>
                <p>C1232AAB — Barrio de San Cristóbal</p>
                <p>CABA, Argentina</p>
                <h3>Horarios</h3>
                <p>Lunes a Viernes: 10:00 - 19:00</p>
                <p>Sábados: 10:00 - 14:00</p>
            </div>
                
            <div class="footer-columna">
                <h3>Contactanos</h3>
                <p>wpp: +54 11 4567-8900</p>
                <p>mail: info@hermanosjota.com.ar</p>
                <p>mail: ventas@hermanosjota.com.ar</p>
                <p>ig: @hermanosjota_ba</p>
            </div>
                
        </div>
            
        <div id="footer-copyright">
            <p><strong>© 2026 Hermanos Jota.</strong> Todos los derechos reservados</p>
        </div>`;
    document.body.appendChild(footer);
}