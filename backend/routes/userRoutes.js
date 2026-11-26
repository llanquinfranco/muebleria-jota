const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { getProfile, registerUser, loginUser } = require("../controllers/userController");

// RUTA PROTEGIDA
router.get("/profile", verifyToken, getProfile);

// RUTAS PÚBLICAS
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
