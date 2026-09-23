import { cargarHeader, cargarFooter } from "./componentes.js";

cargarHeader();

const formulario = document.querySelector("#form-contacto");
const mensajeExito = document.querySelector("#mensaje-exito");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    mensajeExito.style.display = "block";
    formulario.reset();
    setTimeout(() => {
        mensajeExito.style.display = "none";
    }, 8000);
});

cargarFooter();
