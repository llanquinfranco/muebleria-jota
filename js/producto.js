import { cargarHeader, cargarFooter } from "./componentes.js";
import { pedirDatos } from "./datos.js";
import { agregarAlCarrito } from "./carrito.js";

cargarHeader();

const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get("id");

cargarDetalle();

async function cargarDetalle() {
    const contenedorImagen = document.querySelector("#detalle-imagen");
    const contenedorInfo = document.querySelector("#detalle-info");
    const contenedorPrincipal = document.querySelector("#contenedor-detalle");
    const mensajeCarga = document.querySelector("#mensaje-carga");
    
    mensajeCarga.style.display = "block";
    contenedorPrincipal.style.display = "none";
    
    contenedorInfo.innerHTML = "<h2 style='text-align: center; width: 100%; margin-top: 50px;'>Cargando Detalle...</h2>";
    
    const datos = await pedirDatos();
    const mueble = datos.find(item => item.id == idProducto);
    
    if(mueble) {
        document.title = `${mueble.nombre} - Hermanos Jota`;
        
        contenedorImagen.innerHTML = `<img src="${mueble.imagenURL}" alt="${mueble.nombre}">`;
        
        let listaDetalles = "";
        Object.entries(mueble.detalles).forEach(([clave, valor]) => {
            const claveMayuscula = clave.charAt(0).toUpperCase() + clave.slice(1);
            listaDetalles += `<dt>${claveMayuscula}</dt><dd>${valor}</dd>`;
        });
        
        contenedorInfo.innerHTML = `
            <p>${mueble.categoria}</p>
            <h1>${mueble.nombre}</h1>
            <div class="precio-y-boton">
                <p class="precio">$ ${mueble.precio.toLocaleString("es-AR")}</p>
                <button id="boton-agregar" class="boton-primario">Añadir al Carrito</button>
            </div>
            <p class="descripcion">${mueble.descripcion}</p>
            <dl id="detalle-especificaciones">
                <h3>DETALLES DE FABRICACIÓN</h3>
                ${listaDetalles}
            </dl>
        `;
        
        document.querySelector("#boton-agregar").addEventListener("click", () => {
            agregarAlCarrito(mueble);
        });
        
        mensajeCarga.style.display = "none";
        contenedorPrincipal.style.display = "grid";
        
    } else {
        document.title = "Producto no Encontrado - Hermanos Jota";
        contenedorDescripcion.innerHTML = "<h2 style='text-align: center; width: 100%; margin-top: 50px;'>Producto no encontrado</h2>";
    }
}

cargarFooter();