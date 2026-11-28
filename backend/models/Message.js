const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            maxlength: 100,
        },
        correo: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 254,
        },
        mensaje: {
            type: String,
            required: true,
            trim: true,
            minlength: 15,
            maxlength: 5000,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

module.exports = mongoose.model("Message", messageSchema);
