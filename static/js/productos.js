import { catalogo, pedirDatos } from "./datos.js";
import { cargarHeader, cargarFooter } from "./componentes.js";
import { agregarAlCarrito } from "./carrito.js";

const contenedorCatalogo = document.querySelector("#contenedor-catalogo");
const inputBuscador = document.querySelector("#buscador");
let mueblesDescargados = [];

cargarHeader();

contenedorCatalogo.innerHTML = "<h2>Cargando Catálogo</h2>";
mueblesDescargados = await pedirDatos();

iniciarCatalogo(mueblesDescargados);

cargarFooter();

inputBuscador.addEventListener("input", function (evento) {
    const textoBuscado = quitarAcentos(evento.target.value.toLowerCase());
    const resultadosFiltrados = catalogo.filter(function (mueble) {
        const nombreMueble = quitarAcentos(mueble.nombre.toLowerCase());
        const categoriaMueble = quitarAcentos(mueble.categoria.toLowerCase());
        return nombreMueble.startsWith(textoBuscado) || categoriaMueble.startsWith(textoBuscado);
    });

    // Faltaba agregar contenedorCatalogo como destino
    iniciarCatalogo(resultadosFiltrados);
});

//Simular una petición de datos asíncrona para cargar el catálogo
async function iniciarCatalogo(muebles) {
    
    contenedorCatalogo.innerHTML = "";

    muebles.forEach((mueble) => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("tarjeta-producto");

        // Cada producto detalla su enlace
        divProducto.addEventListener("click", function () {
            window.location.href = `producto.html?id=${mueble.id}`;
        });

        const imagen = document.createElement("img");
        imagen.src = mueble.imagenURL;
        divProducto.appendChild(imagen);
        
        const nombre = document.createElement("h2");
        nombre.textContent = mueble.nombre;
        divProducto.appendChild(nombre);

        const precio = document.createElement("p");
        precio.textContent = `$ ${mueble.precio.toLocaleString("es-AR")}`;
        precio.classList.add("producto-precio");
        divProducto.appendChild(precio);
        
        const descripcion = document.createElement("p");
        descripcion.textContent = mueble.descripcion;
        descripcion.classList.add("producto-descripcion");
        divProducto.appendChild(descripcion);
        
        const boton = document.createElement("button");
        boton.textContent = "Añadir al Carrito";
        boton.classList.add("boton-primario");
        boton.addEventListener("click", function(evento) {
            evento.stopPropagation();
            agregarAlCarrito(mueble);
        });
        divProducto.appendChild(boton);

        contenedorCatalogo.appendChild(divProducto);
    });
}

function quitarAcentos(texto) {
    return texto.replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
}
