import { useState } from "react";

function ContactForm() {
    const [formulario, setFormulario] = useState({
        nombre: "",
        correo: "",
        mensaje: "",
    });

    const [enviado, setEnviado] = useState(false);

    function cambiarFormulario(e) {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });
    }

    function enviarFormulario(e) {
        e.preventDefault();
        setEnviado(true);
        setFormulario({
            nombre: "",
            correo: "",
            mensaje: "",
        });

        setTimeout(() => {
            setEnviado(false);
        }, 2500);
    }

    return (
        <section id="contacto-formulario">
            <h2>Centro de ayuda y contacto</h2>
            <p>Completá los datos y te responderemos a la brevedad</p>

            <form id="form-contacto" onSubmit={enviarFormulario}>
                <label htmlFor="nombre">Nombre y Apellido</label>
                <input type="text" id="nombre" name="nombre" minLength="8" required value={formulario.nombre} onChange={cambiarFormulario} />

                <label htmlFor="correo">Correo Electrónico</label>
                <input type="email" id="correo" name="correo" required value={formulario.correo} onChange={cambiarFormulario} />

                <label htmlFor="mensaje">Tu Consulta / Feedback</label>
                <textarea name="mensaje" id="" rows="5" minLength="15" required value={formulario.mensaje} onChange={cambiarFormulario}></textarea>

                <button type="submit" className="boton-primario">
                    Enviar Mensaje
                </button>
            </form>
            <h3 id="mensaje-exito" style={{display: enviado ? "block" : "none"}}>
                ¡Tu consulta fue enviada correctamente y ya la recibimos!
            </h3>
        </section>
    );
}

export default ContactForm;
