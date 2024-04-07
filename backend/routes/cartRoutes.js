// routes/cart.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware.authenticate, cartController.addItemToCart);
router.get("/view", authMiddleware.authenticate, cartController.viewCart);
router.patch("/update", authMiddleware.authenticate, cartController.updateCart);
router.delete(
	"/remove/:productId",
	authMiddleware.authenticate,
	cartController.removeItemFromCart,
);

module.exports = router;
