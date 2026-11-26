import ProductForm from "../components/ProductForm";

function EditProductPage({ cargarProductos }) {
    return (
        <section id="contenedor-abm-producto">
            <h2>Edición de Producto</h2>
            <p>Modifique los campos que quiera para actualizar el catálogo</p>
            <ProductForm cargarProductos={cargarProductos} />
        </section>
    );
}

export default EditProductPage;