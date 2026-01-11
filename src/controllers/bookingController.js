const events = require("events");
const http = require("http");
const driversDispatch = require("../dispatchEngine/DriversDispatch");
const bookingService = require("../services/bookingService");
const geoService = require("../services/geoService");
const socketIo = require("../sockets/initSocket");
const { getPersistedSocketId } = require("../services/socketService");
const Radius_Length = process.env.Radius_Length;

//const matcher = require("../matching-engine/DynamicTripVehicleAssignmentMatcher");  GetBookings
const eventEmitter = new  events.EventEmitter();

exports.rideBook = async ( req, res, next ) => {
	
	const io = socketIo.getIo();
	const { originLat, originLng,  destinationCoords, contactInfo, specialInstructions, rider } = req.body;
	const  nearests = await geoService.getTurfNearest ([originLat, originLng]);
	const closestDriverCoords = nearests.geometry.coordinates;
	const token = req.headers.authorization || req.headers.Authorization;
	
	//console.log(" Token in booking controller is :", token);

	console.log(" Nearest Driver Coordinates Are:", closestDriverCoords);
	
	const riderId = "8acc817e9c5601ab841c3c758934f384c12394a7";

	const originCoords ={ originLat, originLng };
	const currentLocation= { Lat: originLat, Lng: originLng };
	//try 
	//{
        //if (!req?.session?.user?.id) {
			//return res.status(400).json({ message: " Unauthorized " });
		//}
		 
		const alldrivers = await geoService.queryNearByDrivers(currentLocation, Radius_Length );
		const nearbyDrivers = await geoService.queryNearByDrivers(currentLocation, alldrivers, 2.5 );
		var bestDriverMatch =  await geoService.getBestDriverMatch(nearbyDrivers);
		
		const driverSocketId= getPersistedSocketId(closestDriverCoords);
		const driverAccepted = await driversDispatch.DispatchBooking (driverSocketId, riderId, originCoords, destinationCoords );

		/*
		io.to(driverSocketId).emit("onRideBooking", function (data) {
			console.log(" emitted onBookingRequest in driver dispatch:", origin);
		});*/
		/*
		io.emit("onRideBooking", function() {	
			//console.log(" booking emitted from controller:", originLat);
		});*/
		const authToken = req.header("Authorization");
		if(authToken === 'valid-token') {
			//res200
		} else {
			//res 401
		}
		
		console.log( " Driver Accepted ? ", driverAccepted);
		if(driverAccepted) {
			const booking = bookingService.createBooking(riderId, driverAccepted, originLat, destinationCoords);
			return res.status(201).json(booking);
			
			//return res.status(200).json(currentLocation);
		}
    //} catch(error){
		//res.status(400).json({ message: error });
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

exports.getBookings = async ( req, res, next ) => {
	console.log( " returning Bookings ");
	return res.status(200).json("Booking returned");

	const bookings = await bookingService.GetBookings();
	if(!bookings){
	}
	return res.status(200).json(bookings);
};

exports.getBooking = async ( req, res, next ) => {
	//const { bookingId } = req;
	const bookingId ="afd314b367a2c75580cbff9c9f16d5e61d65043b";
	const booking = await bookingService.getBooking (bookingId);
	
	//return res.status(400).json({ message: "getting single get booking"});
	return res.status(400).json(booking);
};

exports.miseajourBooking = async ( req, res, next ) => {
	const { bookingId, driverId , response } = req.body;
	//console.log("booking Id:", bookingId);
	//const driverId="68d0066fb3e7f3c82441964af8f9478009c211de";
	
	try{
		
		const updated = await bookingService.updateBooking(bookingId, driverId);
		
		// Listening on Accepted Bookings and Dispacth and notify User for Acceptance
		eventEmitter.on("onBookingAccepted", () => {
			console.log("Booking Accepted , notify Rider ! ");
		});
		//Raising accepted Booking event
		
		eventEmitter.emit("onBookingAccepted");
		
		return res.status(200).json({message :"updated"});
	}catch(err){
		console.log("Error:", err);
	}
};

exports.cancelBooking = async ( req, res, next ) => {
	return res.status(400).json({ message: "cancelling booking"});
};

exports.deleteBooking = async ( req, res, next ) => {
	const { bookingId } = req.body;
	const deleted = await bookingService.deleteBooking(bookingId);
	if(deleted){
		return res.status(400).json({ message: "booking deleted !"});
	}
};
