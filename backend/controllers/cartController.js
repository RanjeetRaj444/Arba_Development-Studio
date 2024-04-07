// controllers/cartController.js
const Cart = require("../models/cart");
const Product = require("../models/product");

// Add Item to Cart
exports.addItemToCart = async (req, res) => {
	const { productId, quantity } = req.body;

	try {
		let cart = await Cart.findOne({ user: req.user.id });

		if (!cart) {
			cart = new Cart({ user: req.user.id, items: [] });
		}

		let product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ msg: "Product not found" });
		}

		// Check if the product is already in the cart
		let existingItem = cart.items.find(
			(item) => item.product.toString() === productId,
		);
		if (existingItem) {
			// If the product is already in the cart, increase its quantity
			existingItem.quantity = quantity;
		} else {
			// If the product is not in the cart, add it as a new item
			const newItem = { product: product.id, quantity };
			cart.items.push(newItem);
		}
		await cart.save();

		res.json(cart);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

// View Cart
exports.viewCart = async (req, res) => {
	try {
		const cart = await Cart.findOne({ user: req.user.id }).populate(
			"items.product",
			"title price image description",
		);

		if (!cart) {
			return res.status(404).json({ msg: "Cart not found" });
		}

		res.json(cart);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

// Update Cart
exports.updateCart = async (req, res) => {
	const { items } = req.body;

	try {
		let cart = await Cart.findOne({ user: req.user.id });

		if (!cart) {
			return res.status(404).json({ msg: "Cart not found" });
		}

		cart.items = items;
		await cart.save();

		res.json(cart);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

// Remove Item from Cart
exports.removeItemFromCart = async (req, res) => {
	const { productId } = req.params;

	try {
		let cart = await Cart.findOne({ user: req.user.id });

		if (!cart) {
			return res.status(404).json({ msg: "Cart not found" });
		}

		// Remove item from cart
		cart.items = cart.items.filter((item) => item.product !== productId);
		await cart.save();

		res.json(cart);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};
