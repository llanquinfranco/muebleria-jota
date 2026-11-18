const express = require("express");
const router = express.Router();

const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productosController");
const { verifyToken, onlyAdmin } = require("../middlewares/authMiddleware");

// RUTAS PÚBLICAS
router.get("/", getProducts);
router.get("/:id", getProductById);

// RUTAS PRIVADAS
router.post("/", verifyToken, onlyAdmin, createProduct);
router.put("/:id", verifyToken, onlyAdmin, updateProduct);
router.delete("/:id", verifyToken, onlyAdmin, deleteProduct);

module.exports = router;
