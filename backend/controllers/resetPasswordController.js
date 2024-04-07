// controllers/resetPasswordController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.resetPassword = async (req, res) => {
	try {
		const { token, oldPassword, newPassword } = req.body;

		// Verify token
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decodedToken.user.id);

		if (!user) {
			return res.status(400).json({ msg: "Invalid token" });
		}
		// Compare passwords
		const isMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ errors: { msg: "Invalid oldPassword. Please try again." } });
		}
		// Hash new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update user's password
		user.password = hashedPassword;
		await user.save();

		res.json({ message: "Password reset successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};
