// routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.put(
	"/update-profile",
	authMiddleware.authenticate,
	upload.single("avatar"),
	userController.updateProfile,
);

module.exports = router;
