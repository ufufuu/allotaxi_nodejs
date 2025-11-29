const Booking = require('../models/BookingModel');


exports.createBooking = async( req, res, next ) => {
	const { originAdress, destinationAdress, specialInstructions } = req.body;
	
	//try {
        //if (!req?.session?.user?.id) {
			//return res.status(400).json({ message: " Unauthorized " });
		//}
        //const user = new User({ name, email, password, role: "admin" });
        //const savedUser = await user.save();
		
		const booking = new Booking({
			"reference": "4idfk",
			"fromOrigin": "orign",
			"toDestination":"dest",
			"createdAt":"2025 11 28",
		});
		const savedRideRequest = await booking.save();
		const  pool = new Pool({
			user: 'postgres',
			host: 'localhost',
			database: 'postgres',
			password: 'Kad@1207',
			port: 5432,
		});
		const userLogin = await pool.query(
		`INSERT INTO "RideRequest"(
		"Id",
		"created"
		)
		values($1, $2, $3, $4, $5) returning *`, [userName,userPassword]);
        res.status(201).json(booking);
		
		
    //} catch (error) {
      //  res.status(400).json({ message: "Failed to register user" });
    //}
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
	
	