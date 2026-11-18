const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "El nombre de usuario es obligatorio"],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "El email es obligatorio"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "La contraseña es obligatoria"],
            trim: true,
        },
        rol: {
            type: String,
            enum: ["cliente", "admin"],
            default: "cliente",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
