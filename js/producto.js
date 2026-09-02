import { cargarHeader, cargarFooter, mostrarProductos } from "./componentes.js";
import { pedirDatos } from "./datos.js";

cargarHeader();

const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get("id");

cargarDetalle();

async function cargarDetalle() {
    const contenedorImagen = document.querySelector("#detalle-imagen");
    const contenedorCompra = document.querySelector("#detalle-compra");
    const contenedorDescripcion = document.querySelector("#detalle-descripcion");
    
    contenedorDescripcion.innerHTML = "<h2 style='text-align: center; width: 100%; margin-top: 50px;'>Cargando Detalle...</h2>";
    
    const datos = await pedirDatos();
    
    const mueble = datos.find(item => item.id == idProducto);
    
    if(mueble) {
        document.title = `${mueble.nombre} - Hermanos Jota`;
        
        contenedorImagen.innerHTML = `<img src="${mueble.imagenURL}" alt="${mueble.nombre}">`;
        
        contenedorCompra.innerHTML = `
            <h1>${mueble.nombre}</h1>
            <p>$${mueble.precio}</p>
            <button id="boton-agregar" class="boton-primario">Añadir al Carrito</button>
        `;
        
        let listaDetalles = "<ul id='detalle-especificaciones'>";
        Object.entries(mueble.detalles).forEach(([clave, valor]) => {
            const claveMayuscula = clave.charAt(0).toUpperCase() + clave.slice(1);
            listaDetalles += `<li><strong>${claveMayuscula}:</strong> ${valor}</li>`;
        });
        listaDetalles += "</ul>";
        
        contenedorDescripcion.innerHTML = `
            <p>${mueble.descripcion}</p>
            ${listaDetalles}
        `;
        
        // El evento del botón descomentado para el siguiente paso
        document.querySelector("#boton-agregar").addEventListener("click", () => {
            console.log("Producto guardado:", mueble.nombre);
        });
        
    } else {
        document.title = "Producto no Encontrado - Hermanos Jota";
        contenedorDescripcion.innerHTML = "<h2 style='text-align: center; width: 100%; margin-top: 50px;'>Producto no encontrado</h2>";
    }
}

cargarFooter();