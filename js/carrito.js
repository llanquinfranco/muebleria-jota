// Tiene que ser persistene asi si cierro la pagina, que se guarde lo que tenia en el carrito y me lo devuelva

let carrito = [];
const claveCarrito = "carritoHermanosJota";

export function iniciarCarrito() {
    const guardado = localStorage.getItem(claveCarrito);
    if(guardado) {
        carrito = JSON.parse(guardado);
    }
    actualizarContador();
}

function guardarCarrito() {
    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    actualizarContador();
}

export function agregarAlCarrito(mueble) {
    // Busca si el ID ya existe adentro del carrito
    const productoExistente = carrito.find(item => item.id == mueble.id);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...mueble, cantidad: 1 });
    }
    guardarCarrito();
}

export function renderizarCarrito() {
    const contenedor = document.querySelector("#panel-contenido");
    const totalElemento = document.querySelector("#panel-total");
    
    contenedor.innerHTML = ""; // Limpiamos
    let total = 0;
    
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalElemento.textContent = "Total: $0";
        return;
    }
    
    carrito.forEach(mueble => {
        const subtotal = mueble.precio * mueble.cantidad;
        total += subtotal;
        
        const fila = document.createElement("div");
        fila.classList.add("fila-panel");
        fila.innerHTML = `
            <img src="${mueble.imagenURL}" alt="${mueble.nombre}">
            <div class="fila-info">
                <h4>${mueble.nombre}</h4>
                
                <div class="controles-cantidad">
                    <button class="boton-restar" data-id="${mueble.id}">-</button>
                    <span>${mueble.cantidad}</span>
                    <button class="boton-sumar" data-id="${mueble.id}">+</button>
                </div>
                
                <p class="fila-subtotal">$${subtotal}</p>
            </div>
            <button class="boton-eliminar-item" data-id="${mueble.id}">🗑️</button>
        `;
        contenedor.appendChild(fila);
    });
    
    totalElemento.textContent = `Total: $${total}`;
    
    // EVENTOS: Eliminar completo
    document.querySelectorAll(".boton-eliminar-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
            eliminarDelCarrito(e.target.getAttribute("data-id"));
            renderizarCarrito(); 
        });
    });
    
    // EVENTOS: Restar uno
    document.querySelectorAll(".boton-restar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            restarUnidad(e.target.getAttribute("data-id"));
            renderizarCarrito();
        });
    });

    // EVENTOS: Sumar uno
    document.querySelectorAll(".boton-sumar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            sumarUnidad(e.target.getAttribute("data-id"));
            renderizarCarrito();
        });
    });
}

document.addEventListener("click", (e) => {
    if (e.target.id === "boton-vaciar-panel") {
        vaciarCarrito();
        renderizarCarrito();
    }
});

export function sumarUnidad(idProducto) {
    const producto = carrito.find(item => item.id == idProducto);
    if (producto) {
        producto.cantidad += 1;
        guardarCarrito();
    }
}

// Resta la cantidad y lo elimina si llega a 0
export function restarUnidad(idProducto) {
    const producto = carrito.find(item => item.id == idProducto);
    if (producto) {
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
            guardarCarrito();
        } else {
            eliminarDelCarrito(idProducto);
        }
    }
}

export function eliminarDelCarrito(idProducto) {
    // Filtra el array dejando todos los muebles MENOS el que coincide con el ID
    carrito = carrito.filter(item => item.id != idProducto);
    guardarCarrito();
}

export function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
}

export function actualizarContador() {
    const contador = document.querySelector("#contador-carrito");
    if(contador) {
        const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);
        contador.textContent = totalItems;
    }
}

export function obtenerCarrito() {
    return carrito;
}
