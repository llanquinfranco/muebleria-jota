const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");

/**
 *  @route   POST /api/messages
 *  @desc    Crear un mensaje de consulta
 *  @access  Público
 */
const createMessage = asyncHandler(async (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    if (typeof nombre !== "string" || nombre.trim().length < 8) {
        return res.status(400).json({ message: "Ingresá un nombre válido" });
    }
    if (typeof correo !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
        return res.status(400).json({ message: "Ingresá un correo válido" });
    }
    if (typeof mensaje !== "string" || mensaje.trim().length < 15) {
        return res.status(400).json({ message: "El mensaje debe tener al menos 15 caracteres" });
    }

    const nuevoMensaje = await Message.create({
        nombre: nombre.trim(),
        correo: correo.trim().toLowerCase(),
        mensaje: mensaje.trim(),
    });

    return res.status(201).json({
        message: "Mensaje recibido correctamente",
        id: nuevoMensaje._id,
    });
});

module.exports = { createMessage };
