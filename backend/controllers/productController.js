const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Product = require("../models/Product");

/**
 *  @route   GET /api/productos
 *  @desc    Listar todos los productos
 *  @access  Público
 */
const getProducts = asyncHandler(async (req, res) => {
    const productos = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(productos);
});

/**
 *  @route   GET /api/productos/:id
 *  @desc    Obtener detalle de un producto por ID
 *  @access  Público
 */
const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "El ID proporcionado no tiene un formato válido" });
    }
    const producto = await Product.findById(id);
    if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(producto);
});

/**
 *  @route   POST /api/productos
 *  @desc    Crear un nuevo producto
 *  @access  Privado (JWT)
 */
const createProduct = asyncHandler(async (req, res) => {
    const { nombre, categoria, precio, imagenUrl, descripcion, detalles, stock } = req.body;

    // Validación preventiva antes de persistir
    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
        return res.status(400).json({ message: "El campo 'nombre' es obligatorio y no puede estar vacío" });
    }

    if (precio === undefined || precio === null || isNaN(Number(precio)) || Number(precio) < 0) {
        return res.status(400).json({ message: "El campo 'precio' es obligatorio y debe ser un número mayor o igual a 0" });
    }

    if (stock !== undefined && stock !== null && (isNaN(Number(stock)) || Number(stock) < 0)) {
        return res.status(400).json({ message: "El campo 'stock' debe ser un número mayor o igual a 0" });
    }

    const nuevoProducto = await Product.create({
        nombre: nombre.trim(),
        categoria: categoria !== undefined ? categoria.trim() : "A definir",
        precio: Number(precio),
        imagenUrl: typeof imagenUrl === "string" ? imagenUrl.trim() : "",
        descripcion: typeof descripcion === "string" ? descripcion.trim() : "",
        detalles: detalles || {},
        stock: stock !== undefined && stock !== null ? Number(stock) : 0,
    });
    res.status(201).json(nuevoProducto);
});

/**
 *  @route   PUT /api/productos/:id
 *  @desc    Actualizar un producto existente
 *  @access  Privado (JWT)
 */
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "El ID proporcionado no tiene un formato válido" });
    }
    const productoActualizado = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!productoActualizado) {
        return res.status(404).json({ message: "Producto no encontrado para actualizar" });
    }
    res.json(productoActualizado);
});

/**
 *  @route   DELETE /api/productos/:id
 *  @desc    Eliminar un producto por ID
 *  @access  Privado (JWT)
 */
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "El ID proporcionado no tiene un formato válido" });
    }

    const productoEliminado = await Product.findByIdAndDelete(id);
    if (!productoEliminado) {
        return res.status(404).json({ message: "Producto no encontrado para eliminar" });
    }
    res.json({ message: "Producto eliminado correctamente" });
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};