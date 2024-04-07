const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
// const cpUpload = upload.fields([{ name: "avatarImg", maxCount: 1 }]);
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");
const { resetPassword } = require("../controllers/resetPasswordController");
const cloudinary = require("../utils/cloudinary");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authenticate, authController.forgotPassword);
router.patch(
	"/update-profile",
	authenticate,
	upload.single("avatarImg"),
	authController.updateProfile,
);
router.patch("/reset-password", authenticate, resetPassword);

module.exports = router;
