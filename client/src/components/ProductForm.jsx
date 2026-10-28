import { useState } from "react";

function ProductForm() {
    const API_URL = import.meta.env.VITE_API_URL || "";

    const [enviado, setEnviado] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagenUrl: "",
    });
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCargando(true);
        setError(null);

        try {
            const productoAEnviar = {
                ...formData,
                precio: Number(formData.precio),
                stock: Number(formData.stock),
            };

            const response = await fetch(`${API_URL}/api/productos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoAEnviar),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Error al crear el producto");
            }

            setEnviado(true);

            setFormData({
                nombre: "",
                descripcion: "",
                precio: "",
                stock: "",
                imagenUrl: "",
            });

            setTimeout(() => {
                setEnviado(false);
            }, 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <form className="formulario-base" onSubmit={handleSubmit}>
                <label>Nombre del mueble *</label>
                <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} />

                <label>Descripción</label>
                <textarea name="descripcion" rows="3" value={formData.descripcion} onChange={handleChange}></textarea>

                <label>Precio ($) *</label>
                <input type="number" name="precio" min="0" required value={formData.precio} onChange={handleChange} />

                <label>Stock disponible</label>
                <input type="number" name="stock" min="0" value={formData.stock} onChange={handleChange} />

                <label>URL de la imagen</label>
                <input type="text" name="imagenUrl" value={formData.imagenUrl} onChange={handleChange} />

                <button type="submit" className="boton-primario" disabled={cargando}>
                    {cargando ? "Guardando en MongoDB..." : "Crear Producto"}
                </button>
            </form>
            <h3 className="mensaje-estado" style={{ display: enviado || error ? "block" : "none" }}>
                {error ? error : "¡El producto fue creado y guardado en la base de datos exitosamente!"}
            </h3>
        </>
    );
}

export default ProductForm;
