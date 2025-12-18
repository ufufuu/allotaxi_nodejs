const events = require("events");
const http = require("http");
const crypto = require("crypto");
const Booking = require('../models/BookingModel');
const { pool } = require("../config/db");
const driversDispatch = require("../dispatchEngine/DriversDispatch");
const bookingService = require("../services/bookingService");
const geoService = require("../services/geoService");


//const { io } = require("../server");
//const { getSocketIO } = require("../sockets/initSocket");
const socketIo = require("../sockets/initSocket");

//const io = require("../server.js");
//const matcher = require("../matching-engine/DynamicTripVehicleAssignmentMatcher");  GetBookings

const eventEmitter = new  events.EventEmitter();

exports.rideBook = async ( req, res, next ) => {
	
	//const io= req.io;
	
	const io = socketIo.getIo();
	//console.log(" io in booking controller: ", io);
	
	const { originLat, originLng,  destinationCoords, contactInfo, specialInstructions, riderId } = req.body;
	const bookingId = crypto.randomBytes(20).toString('hex');
	const originCoords ={ originLat, originLng };
	const currentLocation= { Lat: originLat, Lng: originLng };
	
	//try 
	//{
        //if (!req?.session?.user?.id) {
			//return res.status(400).json({ message: " Unauthorized " });
		//}
		const Radius_Length = 2.5; // 6371 // process.env.LOCATION_MATCHING_RADIUS
		const alldrivers = await geoService.queryNearByDrivers(currentLocation, Radius_Length );
		const nearbyDrivers = await geoService.queryNearByDrivers(currentLocation, alldrivers, 2.5 );
		var bestDriverMatch =  await geoService.getBestDriverMatch(nearbyDrivers);
		//console.log(" best driver Match is:", bestDriverMatch);
		
		const driverId = bestDriverMatch.Id;
		const driverAccepted = await driversDispatch.DispatchBooking (riderId, driverId, originCoords, destinationCoords );
		//const driverAccepted = true;
			
		io.emit("onRideBooking", function(originLat) {
			//console.log(" booking emitted from controller:", originLat);
		});
		console.log(" Driver Accepted ?", driverAccepted);
		if(driverAccepted) {
			const booking = await pool.query(
			`INSERT INTO "Bookings"(
			"Id",
			"Origin",
			"Destination",
			"Fare",
			"Status",
			"Created",
			"Expiry",
			"RiderId",
			"DriverId")
			values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`,
			[bookingId, originCoords, destinationCoords, 100, 1, "2020-03-10T04:05:06.157Z", "2020-03-10T04:05:06.157Z", null, null]);
			
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
	const bookings = await bookingService.GetBookings();
	console.log("Bookings:", bookings);
	return res.status(201).json(bookings);
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

exports.getBooking = async ( req, res, next ) => {
	return res.status(400).json({ message: "getting single get booking"});
};

exports.miseajourBooking = async ( req, res, next ) => {
	//const { driveId } = req;
	//const { bookingId } = req.headers;
	
	const bookingId ="c170b5181a26f7b99f461d98170ec9d4c0f14bfb";
	console.log("booking Id:", bookingId);
	//const { driverId } = req.body;
	const driverId="68d0066fb3e7f3c82441964af8f9478009c211de";
	try{
		
		//console.log("driver Id:", req.headers.bookingId);
		const updated = await bookingService.updateBooking(bookingId, driverId);
		
		// Listening on Accepted Bookings and Dispacth and notify User for Acceptance
		eventEmitter.on("onBookingAccepted", () => {
			console.log("Booking Accepted from User");
		});
		
		//Raising accepted Booking event
		eventEmitter.emit("onBookingAccepted");
		
		
		return res.status(200).json({message :"updated"});
	}catch(err){
		console.log("Error:", err);
	}
	
	
};








/*
Core Components : real-time communication: Implements WebSockets (e.g., Socket.IO) to 
facilitate instant updates of driver locations and ride requests/status.

Database with Geospatial Indexing: Uses solutions like MongoDB or Redis with spatial 
indexing (e.g., Geohash or R-tree) to efficiently query nearby drivers based on location data.

0. Integrates third-party APIs like Google Maps for route calculations, distance/time estimations, and map visualization

2. Geospatial Filtering
When a rider submits a request, the system first queries the database for drivers
within a certain geographical radius of the rider's origin. This initial filtering is crucial for performance

3. Feasibility Check (Spatial and Temporal)
For each potential driver match, the algorithm checks feasibility using constraints: 

    Spatial Feasibility: The rider's origin and destination must be along the driver's route or within a maximum allowed detour distance.
    Temporal Feasibility: The driver must be able to pick up the rider within their specified time window and arrive at the destination on time.
    Capacity Constraint: The driver must have enough empty seats 

Scoring/Ranking
Feasible matches are then scored based on the system's objective function. Common factors include: 

    Proximity: Closeness of the driver to the rider's pickup location.
    Efficiency: Minimal driver detour time/distance.
    User Ratings: Prioritizing drivers with higher ratings.
    Compatibility: (For shared-ride pooling) Using data like social preferences to improve match quality. 
Assignment
The system selects the best-ranked driver. In simple systems, the top choice is notified immediately. 
For complex, real-time systems with many concurrent requests, advanced algorithms like the Hungarian algorithm or 
other heuristic approaches might be used to find the optimal global matching solution across all available drivers and riders. 

*/

//  Libraries like node-geohash or built-in geospatial queries in MongoDB are very useful for the filtering step
// https://github.com/eric19960304/Ridesharing-App-For-HK-Back-End/tree/master/src
//https://github.com/eric19960304/Ridesharing-App-For-HK-Back-End
// https://github.com/hhc97/routescc-client-driver-matching-app

// - Distance Matrix API
// - Geocoding API: 
// - Maps JavaScript API Nearby Search

// https://medium.com/@shubhamrajput252000/how-to-find-the-nearest-location-using-google-maps-in-a-mern-stack-application-81baab1cca1c ***
// https://www.uber.com/en-GH/blog/tech-stack-part-one-foundation/
// ** https://www.dhiwise.com/post/ride-matching-algorithm-for-a-smoother-rideshare-experience
// https://dev.to/biswasprasana001/designing-a-ride-hailing-service-system-eg-uberlyft-a-beginner-friendly-guide-252o

// ###

//https://jurajmajerik.com/blog/matching-drivers-customers/ (3)

// https://dilipkumar.medium.com/system-design-for-uber-ride-hailing-application-b95ac796c90d

// https://www.geeksforgeeks.org/system-design/how-uber-finds-nearby-drivers-at-1-million-requests-per-second/

// " uber like ride matching algorithm

// https://github.com/hhc97/routescc-client-driver-matching-app   --- (2)

 //(1)
// https://medium.com/@shubhamrajput252000/how-to-find-the-nearest-location-using-google-maps-in-a-mern-stack-application-81baab1cca1c

// https://taborder.co.za/taborder/db-context

// https://blog.logrocket.com/building-real-time-location-app-node-js-socket-io/#rest-api-websockets

// ### 
//https://blog.logrocket.com/building-real-time-location-app-node-js-socket-io/#rest-api-websockets

// real time api gateway layer 

// non-blocking i/o model
// event-driven 
// concurrent requests  handling 
// deospatial db : quick query driver near spec. point
//redis with geohash , for in=memory location + high speed location datamngmt
// mongo db <- geospatial indexing capabilities 

//Routing Services : OSRM , open source routing machine 4 calculations distance, fastest routes , eta-scored

// Scalability , nodejs micro architec  <-- Kafka 