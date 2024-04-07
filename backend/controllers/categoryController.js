const Category = require("../models/category");
const { validationResult } = require("express-validator");
const upload = require("../middleware/uploadMiddleware");
const fs = require("fs");
const cloudinary_js_config = require("../utils/cloudinary");
exports.createCategory = (req, res) => {
	cloudinary_js_config.uploader.upload(
		req.file.path,
		async function (err, result) {
			if (err) {
				console.log(err);
				return res.status(500).send(err.message);
			} else {
				try {
					const { name, slug } = req.body;
					const imgUrl = result.url;
					const category = new Category({
						name,
						slug,
						image: imgUrl,
						owner: req.user.id,
					});

					await category.save();
					res.status(201).json(category);
				} catch (err) {
					console.error(err.message);
					res.status(500).send("Server Error");
				}
			}
		},
	);
};

// Update Category
exports.updateCategory = (req, res) => {
	cloudinary_js_config.uploader.upload(
		req.file.path,
		async function (err, result) {
			if (err) {
				console.log(err);
				return res.status(500).send(err.message);
			} else {
				// console.log(result);
				const imgUrl = result.url;
				try {
					const { name, slug } = req.body;
					const { categoryId } = req.params;

					let category = await Category.findById(categoryId);
					if (!category) {
						return res.status(404).json({ msg: "Category not found" });
					}

					category.name = name;
					category.slug = slug;
					category.image = imgUrl;

					await category.save();
					res.json(category);
				} catch (err) {
					console.error(err.message);
					res.status(500).send("Server Error");
				}
			}
		},
	);
};

// Get Categories
exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.find().populate("owner", [
			"fullName",
			"email",
		]);
		res.json(categories);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

// Get Single Category
exports.getCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;
		const category = await Category.findById(categoryId).populate("owner", [
			"fullName",
			"email",
		]);

		if (!category) {
			return res.status(404).json({ msg: "Category not found" });
		}

		res.json(category);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Category not found" });
		}
		res.status(500).send("Server Error");
	}
};

// Delete Category
exports.deleteCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;

		const category = await Category.findById(categoryId);
		if (!category) {
			return res.status(404).json({ msg: "Category not found" });
		}
		await Category.findByIdAndDelete(categoryId);
		res.json({ msg: "Category removed" });
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Category not found" });
		}
		res.status(500).send("Server Error");
	}
};
