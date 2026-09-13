// Las functions que deben ser llamadas por varios html, van separadas asi se evita la duplicacion, y las llamo desde otro js. En este caso el header/footer ya no se duplican cada vez que paso de inicio a catalogo
import { iniciarCarrito, renderizarCarrito} from "./carrito.js";

export function cargarHeader() {
    const header = document.createElement("header");
    header.innerHTML = `
        <div id="contenedor-header">
            <a href="index.html" id="header-logo">
                <img src="assets/icons/logo.svg" alt="">
                Hermanos Jota
            </a>
                
            <nav>
                <ul id="nav-lista">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="productos.html">Catálogo</a></li>
                    <li><a href="contacto.html">Contacto</a></li>
                </ul>
            </nav>
                
            <button id="header-carrito">
                <img src="assets/icons/carrito.svg" alt="Ver Carrito">
                <span id="contador-carrito">0</span>
            </button>
            <button id="boton-menu">☰</button>
        </div>`;
    document.body.prepend(header);
    
    // Para detectar pagina actual y dejar activo el boton de enlace
    const paginaActual = window.location.pathname.split("/").pop();
    const enlacesNav = header.querySelectorAll("#nav-lista a");
    enlacesNav.forEach(enlace =>{
        const hrefEnlace = enlace.getAttribute("href");
        if(paginaActual === hrefEnlace || (paginaActual === "" && hrefEnlace === "index.html")) {
            enlace.classList.add("active");
        }
    });
    
    // Crear el fondo oscuro (overlay) dinámicamente
    const overlay = document.createElement("div");
    overlay.id = "overlay-carrito";
    overlay.classList.add("oculto");
    document.body.appendChild(overlay);
   
    // Panel para el carrito (oculto), y no crear otro HTML por que la consigna no deja 
    const panel = document.createElement("aside");
    panel.id = "panel-carrito";
    panel.classList.add("oculto");  // No se debe ver apenas abris la pagina
    panel.innerHTML = `
        <div class="panel-cabecera">
            <h2>Mi carrito</h2>
            <button id="boton-cerrar-panel">X</button>
        </div>
        <div id="panel-contenido"></div>
        <div class="panel-pie">
            <h3 id="panel-total">Total: $0</h3>
            <button id="boton-vaciar-panel" class="boton-secundario">Vaciar Carrito</button>
            <button class="boton-primario">Ir al Pago</button>
        </div>`;
    document.body.appendChild(panel);
    
    // Eventos para abrir y cerrar el panel
    document.querySelector("#header-carrito").addEventListener("click", () => {
        document.querySelector("#panel-carrito").classList.remove("oculto");
        document.querySelector("#overlay-carrito").classList.remove("oculto");
        renderizarCarrito();
    });

    document.querySelector("#boton-cerrar-panel").addEventListener("click", () => {
        document.querySelector("#panel-carrito").classList.add("oculto");
        document.querySelector("#overlay-carrito").classList.add("oculto");
    });
    
    // Si tocan el overlay del carrito, también se cierra
    document.querySelector("#overlay-carrito").addEventListener("click", () => {
        document.querySelector("#panel-carrito").classList.add("oculto");
        document.querySelector("#overlay-carrito").classList.add("oculto");
    });
    
    // Para medir la altura exacta del header ya renderizado
    const alturaHeader = header.offsetHeight;
    document.documentElement.style.setProperty('--alto-header', `${alturaHeader}px`);
    
    const botonMenu = document.querySelector("#boton-menu");
    const navLista = document.querySelector("#nav-lista");

    botonMenu.addEventListener("click", () => {
    navLista.classList.toggle("activo");
});
    
    iniciarCarrito();
}

export function cargarFooter() {
    const footer = document.createElement("footer");
    footer.innerHTML = `
        <div id="contenedor-footer">
                
            <div class="footer-columna columna-logo">
                <img src="assets/icons/logo.svg" alt="Hermanos Jota" id="logo-footer">
                <div class="logo-info">
                    <p><strong>Hermanos Jota</strong></p>
                    <p>Somos el redescubrimiento de un arte olvidado</p>
                </div>
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
                <p> <img src="assets/icons/whatsapp-white.svg" alt="WhatsApp" class="icono-footer" id="icono-wpp">
                    +54 11 4567-8900
                </p>
                <p> <img src="assets/icons/gmail-white.svg" alt="Gmail" class="icono-footer">
                    info@hermanosjota.com.ar
                </p>
                <p> <img src="assets/icons/gmail-white.svg" alt="Gmail" class="icono-footer">
                    ventas@hermanosjota.com.ar
                </p>
                <p> <img src="assets/icons/instagram-white.svg" alt="Instagram" class="icono-footer">
                    @hermanosjota_ba
                </p>
                <h3>Navegación</h3>
                <ul>
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="productos.html">Catálogo de productos</a></li>
                    <li><a href="contacto.html">Contacto</a></li>
                </ul>
            </div>
                
        </div>
            
        <div id="footer-copyright">
            <p><strong>© 2026 Hermanos Jota.</strong> Todos los derechos reservados</p>
        </div>`;
    document.body.appendChild(footer);
}


