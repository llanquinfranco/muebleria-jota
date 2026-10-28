import { useState } from "react";

function ContactForm() {
    
    const [enviado, setEnviado] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        mensaje: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        console.log("Datos a enviar:", formData);
        /* Aca va despues el POST cuando conecte con Mongoose */
        
        setEnviado(true);
        
        setFormData({
            nombre: "",
            correo: "",
            mensaje: "",
        });

        setTimeout(() => {
            setEnviado(false);
        }, 3000);
        
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

                <button type="submit" className="boton-primario">
                    Enviar Mensaje
                </button>
            </form>
            <h3 id="mensaje-estado" style={{display: enviado ? "block" : "none"}}>
                ¡Tu consulta fue enviada correctamente y ya la recibimos!
            </h3>
        </>
    );
}

export default ContactForm;
