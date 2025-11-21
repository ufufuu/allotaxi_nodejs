const express = require("express");
const router = express.Router();

const driverModel = require("../models/driverModel");


module.exports.registerDriver = async( req, res ) => {
	const { amount, sellerId } = req.body;
	try {
        if (!req?.session?.user?.id) { 
			return res.status(400).json({ message: " User already exists " });
		}
        const user = new User({ name, email, password, role: "admin" });
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: "Failed to register user" });
    }
};


module.exports.loginDriver = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email, password }).select("-password");
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password." });
        }
        req.session.user = {
            id: user._id.toString(),
            email: user.email,
            stripeAccountId: user.stripeAccountId || null,
        };

        return res.status(200).json({
            message: "Login successful",
            user: user
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Failed to log in." });
    }
};