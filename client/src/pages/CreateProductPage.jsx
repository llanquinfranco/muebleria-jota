import ProductForm from "../components/ProductForm";

function CreateProductPage() {
    return (
        <section id="contenedor-crear-producto">
            <h2>Alta de Nuevo Producto</h2>
            <p>Completá los detalles del nuevo mueble para sumarlo al catálogo</p>
            <ProductForm />
        </section>
    );
}

export default CreateProductPage;
