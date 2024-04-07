// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decodedToken.user.id);

		if (!user) {
			return res.status(401).json({ message: "Unauthorized", user });
		}

		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		res.status(401).json({ message: "Unauthorized" });
	}
};
