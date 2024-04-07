// controllers/userController.js
const User = require("../models/user");
const upload = require("../middleware/uploadMiddleware");
const bcrypt = require("bcryptjs");
const fs = require("fs");

// Update Profile
exports.updateProfile = async (req, res) => {
	const { fullName, password } = req.body;
	const avatar = req.file ? req.file.filename : null;

	try {
		let user = await User.findById(req.user.id);

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}
		// Update profile fields
		user.fullName = fullName;
		if (avatar) {
			// Delete old avatar
			if (user.avatar) {
				fs.unlinkSync(`uploads/${user.avatar}`);
			}
			user.avatar = avatar;
		}

		if (password) {
			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
		}

		await user.save();
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};
