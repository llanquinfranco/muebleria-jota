import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

function ContactForm() {
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        mensaje: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setEnviando(true);

        try {
            const res = await fetch(`${API_URL}/api/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "No se pudo enviar el mensaje");

            setEnviado(true);
            setFormData({ nombre: "", correo: "", mensaje: "" });
            setTimeout(() => {
                setEnviado(false);
            }, 3000);
        } catch (err) {
            setError(err.message || "Error al enviar el mensaje");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <>
            <form className="formulario-base" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre y Apellido</label>
                <input type="text" id="nombre" name="nombre" minLength="8" required value={formData.nombre} onChange={handleChange} />

                <label htmlFor="correo">Correo Electrónico</label>
                <input type="email" id="correo" name="correo" required value={formData.correo} onChange={handleChange} />

                <label htmlFor="mensaje">Tu Consulta / Feedback</label>
                <textarea name="mensaje" id="" rows="5" minLength="15" required value={formData.mensaje} onChange={handleChange}></textarea>

                <button type="submit" className="boton-primario" disabled={enviando}>
                    {enviando ? "Enviando..." : "Enviar Mensaje"}
                </button>
            </form>
            <h3 id="mensaje-estado" style={{ display: enviado ? "block" : "none" }}>
                ¡Tu consulta fue enviada correctamente y ya la recibimos!
            </h3>
            {error && <h3 className="mensaje-estado">{error}</h3>}
        </>
    );
}

export default ContactForm;
