import { cargarHeader, cargarFooter } from "./componentes.js";
import { pedirDatos } from "./datos.js";
import { agregarAlCarrito } from "./carrito.js";

cargarHeader();

const contenedorDestacados = document.querySelector("#contenedor-destacados");
iniciarDestacados();

cargarFooter();

async function iniciarDestacados() {
    contenedorDestacados.innerHTML = "<h2>Cargando Destacados</h2>"
    const mueblesDescargados = await pedirDatos();
    
    let descatadosAleatorios = mueblesDescargados.filter(mueble => mueble.destacado);
    descatadosAleatorios = descatadosAleatorios.sort(() => Math.random() - 0.5);
    descatadosAleatorios = descatadosAleatorios.slice(0, 4);
    
    contenedorDestacados.innerHTML = "";
    
        descatadosAleatorios.forEach((mueble) => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("tarjeta-destacado");
    
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
            divProducto.appendChild(precio);
            
            const boton = document.createElement("button");
            boton.textContent = "Añadir al Carrito";
            boton.classList.add("boton-primario");
            boton.addEventListener("click", function(evento) {
                evento.stopPropagation();
                agregarAlCarrito(mueble);
            });
            divProducto.appendChild(boton);
    
            contenedorDestacados.appendChild(divProducto);
        });
    
}