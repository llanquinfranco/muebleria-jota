import ProductForm from "../components/ProductForm";

function EditProductPage() {
    return (
        <section id="contenedor-editar-producto">
            <h2>Edición de Producto</h2>
            <p>Modifique los campos que quiera para actualizar el catálogo</p>
            <ProductForm />
        </section>
    );
}

export default EditProductPage;