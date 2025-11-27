const BookingModel = require('../models/BookingModel');


exports.createBooking = async( req, res, next ) => {
	const { originAdress, destinationAdress, specialInstructions } = req.body;
	
	try {
        if (!req?.session?.user?.id) {
			
			return res.status(400).json({ message: " Booking from Controller called !" });
		}
        const user = new User({ name, email, password, role: "admin" });
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: "Failed to register user" });
    }
};


exports.updateBooking = async (req, res) => {
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

exports.cancelBooking = async ( req, res, next ) => {
	return res.status(400).json({ message: "cancelling booking"});
};
	
	