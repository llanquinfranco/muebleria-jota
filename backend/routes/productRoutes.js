const express = require("express");
const router = express.Router();
const { verifyToken, onlyAdmin } = require("../middlewares/authMiddleware");
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

// RUTAS PÚBLICAS
router.get("/", getProducts);
router.get("/:id", getProductById);

// RUTAS PRIVADAS
router.post("/", verifyToken, onlyAdmin, createProduct);
router.put("/:id", verifyToken, onlyAdmin, updateProduct);
router.delete("/:id", verifyToken, onlyAdmin, deleteProduct);

module.exports = router;
