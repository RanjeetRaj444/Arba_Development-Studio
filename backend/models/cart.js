const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	items: [
		{
			product: {
				type: String,
				ref: "Product",
				required: true,
			},
			quantity: { type: Number, default: 1 },
		},
	],
});

module.exports = mongoose.model("Cart", cartSchema);
