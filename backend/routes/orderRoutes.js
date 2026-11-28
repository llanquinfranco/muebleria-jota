const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { createOrder, getMyOrders } = require("../controllers/orderController");

router.post("/", verifyToken, createOrder);
router.get("/my", verifyToken, getMyOrders);

module.exports = router;