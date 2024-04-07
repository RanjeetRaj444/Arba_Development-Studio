const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const cors = require("cors");
const plate = require("./landing.js");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose
	.connect(process.env.mongoURL)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Failed to connect to MongoDB", err));
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
	res.send(plate);
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
