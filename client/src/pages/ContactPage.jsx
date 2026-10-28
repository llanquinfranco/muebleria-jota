import ContactForm from "../components/ContactForm";

function ContactPage() {
    return(
        <section id="contenedor-contacto">
            <h2>Centro de ayuda y contacto</h2>
            <p>Completá los datos y te responderemos a la brevedad</p>
            <ContactForm />
        </section>
    );
}

export default ContactPage;