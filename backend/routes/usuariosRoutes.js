const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/authMiddleware");

// GET /api/usuarios/profile - Obtener perfil del usuario autenticado (RUTA PROTEGIDA)
router.get("/profile", verifyToken, (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
});

// POST /api/usuarios/register - Registrar un nuevo usuario (RUTA PÚBLICA)
router.post("/register", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        
        // Validación preventiva antes de persistir
        if (!username || typeof username !== "string" || username.trim() === "") {
            return res.status(400).json({ message: "El campo 'username' es obligatorio y no puede estar vacío" });
        }

        if (!email || typeof email !== "string" || email.trim() === "") {
            return res.status(400).json({ message: "El campo 'email' es obligatorio y no puede estar vacío" });
        }

        if (!password || typeof password !== "string" || password.trim() === "") {
            return res.status(400).json({ message: "El campo 'password' es obligatorio y no puede estar vacío" });
        }
        
        const usernameLimpio = username.trim();
        const emailLimpio = email.trim().toLowerCase();
        
        // Verificamos si el usuario o email ya existen
        const existingUser = await User.findOne({ $or: [{ username: usernameLimpio }, { email: emailLimpio }] });
        if (existingUser) {
            return res.status(400).json({ message: "El nombre de usuario o email ya está en uso." });
        }
        
        // Hasheamos la contraseña y creamos el nuevo usuario con la contraseña hasheada
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const nuevoUsuario = await User.create({
            username: usernameLimpio,
            email: emailLimpio,
            password: hashedPassword,
        });
        
        // Respondemos al frontend (sin enviar la contraseña)
        res.status(201).json({
            _id: nuevoUsuario._id,
            username: nuevoUsuario.username,
            email: nuevoUsuario.email,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
});

// POST /api/usuarios/login - Iniciar sesión y generar token (RUTA PÚBLICA)
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Validación preventiva antes de consultar
        if (!email || typeof email !== "string" || email.trim() === "") {
            return res.status(400).json({ message: "El campo 'email' es obligatorio y no puede estar vacío" });
        }

        if (!password || typeof password !== "string" || password.trim() === "") {
            return res.status(400).json({ message: "El campo 'password' es obligatorio y no puede estar vacío" });
        }
        
        // Buscamos al usuario por su email
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }
        
        // Comparamos la contraseña enviada con la hasheada en la BD
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }
        
        // Si las credenciales son correctas, generamos el JWT
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
        );
        
        // Respondemos con el token y datos del usuario (sin el password)
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;
