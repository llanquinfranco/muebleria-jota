import { cargarHeader, cargarFooter } from "./componentes.js";
import { pedirDatos, mostrarProductos } from "./productos.js";

cargarHeader();

const contenedorDestacados = document.querySelector("#contenedor-destacados");

iniciarDestacados();

async function iniciarDestacados() {
    contenedorDestacados.innerHTML = "<h2>Cargando Destacados</h2>"
    const mueblesDescargados = await pedirDatos();
    
    let descatadosAleatorios = mueblesDescargados.filter(mueble => mueble.destacado);
    descatadosAleatorios = descatadosAleatorios.sort(() => Math.random() - 0.5);
    descatadosAleatorios = descatadosAleatorios.slice(0, 4);
    
    mostrarProductos(descatadosAleatorios, contenedorDestacados);
}

cargarFooter();
