// models/product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: {
		type: String,
		ref: "Category",
		required: true,
	},
	image: { type: String },
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" }, // Reference to cart
});

module.exports = mongoose.model("Product", productSchema);
