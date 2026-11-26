import ProductForm from "../components/ProductForm";

function CreateProductPage({ cargarProductos }) {
    return (
        <section id="contenedor-abm-producto">
            <h2>Alta de Nuevo Producto</h2>
            <p>Completá los detalles del nuevo mueble para sumarlo al catálogo</p>
            <ProductForm cargarProductos={cargarProductos} />
        </section>
    );
}

export default CreateProductPage;
