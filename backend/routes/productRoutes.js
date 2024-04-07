const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");
const cpUpload = upload.fields([{ name: "productImg", maxCount: 1 }]);

router.post(
	"/create",
	upload.single("productImg"),
	authenticate,
	productController.createProduct,
);
router.patch(
	"/update/:productId",
	upload.single("productImg"),
	authenticate,
	productController.updateProduct,
);
router.get("/", authenticate, productController.getProducts);
router.get("/:productId", authenticate, productController.getProduct);
router.delete(
	"/delete/:productId",
	authenticate,
	productController.deleteProduct,
);

module.exports = router;
