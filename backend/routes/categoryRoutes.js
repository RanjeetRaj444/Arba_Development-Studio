const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { authenticate } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
router.post(
	"/create",
	upload.single("categoryImg"),
	authenticate,
	categoryController.createCategory,
);
router.patch(
	"/update/:categoryId",
	upload.single("categoryImg"),
	authenticate,
	categoryController.updateCategory,
);
router.get("/", authenticate, categoryController.getCategories);
router.get("/:categoryId", authenticate, categoryController.getCategory);
router.delete(
	"/delete/:categoryId",
	authenticate,
	categoryController.deleteCategory,
);

module.exports = router;
