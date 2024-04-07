const Product = require("../models/product");
const { validationResult } = require("express-validator");
const { authenticate } = require("../middleware/authMiddleware");
const multer = require("../middleware/uploadMiddleware");
const upload = require("../middleware/uploadMiddleware");
const fs = require("fs");
const cloudinary_js_config = require("../utils/cloudinary");

// Create Product
(exports.createProduct = (req, res) => {
	cloudinary_js_config.uploader.upload(
		req.file.path,
		async function (err, result) {
			if (err) {
				console.log(err);
				return res.status(500).send(err.message);
			} else {
				const imgUrl = result.url;
				try {
					const { title, description, price, category } = req.body;
					const product = new Product({
						title,
						description,
						price,
						category,
						image: imgUrl,
						owner: req.user.id,
					});

					await product.save();
					res
						.status(201)
						.json({ product, message: "Produdct created successful" });
				} catch (err) {
					console.error(err.message);
					res.status(500).send("Server Error");
				}
			}
		},
	);
}),
	// Update Product
	(exports.updateProduct = async (req, res) => {
		cloudinary_js_config.uploader.upload(
			req.file.path,
			async function (err, result) {
				if (err) {
					console.log(err);
					return res.status(500).send(err.message);
				} else {
					const imgUrl = result.url;
					try {
						const { title, description, price, category } = req.body;
						const { productId } = req.params;
						let product = await Product.findById(productId);
						if (!product) {
							return res.status(404).json({ msg: "Product not found" });
						}

						product.title = title;
						product.description = description;
						product.price = price;
						product.category = category;
						product.image = imgUrl;
						await product.save();
						res.json({ product, message: "Produdct updated successful" });
					} catch (err) {
						console.error(err.message);
						res.status(500).send("Server Error");
					}
				}
			},
		);
	}),
	// Get Products
	(exports.getProducts = async (req, res) => {
		try {
			const { userId, title, sortBy, categoryId } = req.query;

			let query = {};

			// Apply title filter (case insensitive)
			if (title) {
				query.title = { $regex: new RegExp(title, "i") };
			}
			// apply user filter
			if (userId) {
				query.owner = userId;
			}
			// Apply category filter
			if (categoryId) {
				query.category = categoryId;
			}

			let products;

			if (sortBy === "price") {
				// Sort by price
				products = await Product.find(query).sort({ price: 1 });
			} else {
				// Default sorting
				products = await Product.find(query);
			}

			res.json(products);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	});

// Get Single Product
exports.getProduct = async (req, res) => {
	try {
		const { productId } = req.params;
		const product = await Product.findById(productId).populate(
			"category",
			"name",
		);

		if (!product) {
			return res.status(404).json({ msg: "Product not found" });
		}

		res.json(product);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Product not found" });
		}
		res.status(500).send("Server Error");
	}
};

// Delete Product
exports.deleteProduct = async (req, res) => {
	try {
		const { productId } = req.params;

		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ msg: "Product not found" });
		}
		await Product.findByIdAndDelete(productId);
		res.json({ msg: "Product removed" });
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Product not found" });
		}
		res.status(500).send("Server Error");
	}
};
