const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary_js_config = require("../utils/cloudinary");
const upload = require("../middleware/uploadMiddleware");
// Register
exports.register = async (req, res) => {
	const { fullName, userName, email, password, avatar } = req.body;
	try {
		// Check if user exists
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ errors: [{ msg: "User already exists" }] });
		}

		user = new User({
			fullName,
			userName,
			email,
			password,
			avatar,
		});

		// Encrypt password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		// Return JWT
		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			process.env.jwtSecret,
			{ expiresIn: "1h" },
			(err, token) => {
				if (err) throw err;
				res.json({ token, user, message: "Registration successful." });
			},
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};
// Login
exports.login = async (req, res) => {
	const { username, password } = req.body;
	// console.log(username, password);
	try {
		// Check if user exists
		let user = await User.findOne({ userName: username });
		if (!user) {
			return res.status(400).json({ errors: [{ msg: "Invalid username" }] });
		}

		// Compare passwords
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ errors: [{ msg: "Invalid password" }] });
		}

		// Return JWT
		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(payload, process.env.jwtSecret, (err, token) => {
			if (err) throw err;
			res.json({ token, user, message: "Login successful." });
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

// Update Profile
(exports.updateProfile = (req, res) => {
	cloudinary_js_config.uploader.upload(
		req.file.path,
		async function (err, result) {
			if (err) {
				console.log(err);
				return res.status(500).send(err.message);
			} else {
				const imgUrl = result.url;
				try {
					let user = await User.findById(req.user.id);

					if (!user) {
						return res.status(404).json({ msg: "User not found" });
					}

					// Update profile fields
					user.fullName = fullName;
					user.avatar = imgUrl;
					if (password) {
						// Encrypt password
						const salt = await bcrypt.genSalt(10);
						user.password = await bcrypt.hash(password, salt);
					}

					await user.save();
					res.json({ user, message: "User Updated Successful." });
				} catch (err) {
					console.error(err.message);
					res.status(500).send({ error: "Server Error" });
				}
				// console.log(imgUrl);
				// User.findByIdAndUpdate(req.user.id, { avatar: imgUrl }, { new: true })
				// 	.then((profile) => {
				// 		res.json(profile);
				// 	})
				// 	.catch((err) => console.error(err));
			}
		},
	);
	const { fullName, password } = req.body;
}),
	(exports.forgotPassword = async (req, res) => {
		try {
			const { email } = req.body;

			// Check if user exists
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: "User not found" });
			}

			// Generate token for password reset link
			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
				expiresIn: "30m",
			});

			// Send password reset link (for demonstration, let's just return the token)
			res.json({ token });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	});
