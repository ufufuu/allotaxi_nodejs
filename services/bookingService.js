const userModel = require("../models/userModel");
const radius = process.env.LOCATION_MATCHING_RADIUS;
const { userIODriver } = require("../sockets/driverSocket");
//const { usreIORider } = require("../sockets/riderSocket");
const { onSocketConnection } = require("../sockets/");
const { pool } = require("../config/db");

class BookingService {
	
	async createBooking ( passengerId, driverId, origin, destination ) {
	
		io.on("connection", onSocketConnection(io));
		var currentLocation = await geoService.getCurrentPosition();
		const lat = currentLocation.latitude;
		const lng = currentLocation.longitude;
		
		var nearbyDrivers = await geoService.queryNearByDrivers(lat, lng, radius );
		var bestDriverMatch =  await geoService.getBestDriverMatch(nearbyDrivers);
	
		//const passenger = await passengerService.find(passengerId)
		//const driver = await driverService.find(driverId)
		//io.to('bestDriverMatch.socketId').emit('onPickUpRider', data);   

		const booking = await this.insert({ driver, passenger, origin, destination })
		passenger.bookings.push(booking)

		await passenger.save()
		return booking;
    }
	
	async GetBookings () {
		const bookings = await pool.query(
			`SELECT * FROM "Bookings"
			`);
		return bookings;
	}
	
	async deleteBooking( bookingId){
		const query = `DELETE FROM "Bookings" WHERE "Id"= $1 RETURNING *`;
		try{
			await pool.query(
			`DELETE FROM "Bookings"
			WHERE "Id"=$1 RETURNING*`,[bookingId]);
			return true;
		} catch(err) {
			console.log("err:", err);
		}
		
	}
}

module.exports = new BookingService();

// https://www.capitalonecareers.com/job/new-york/senior-software-engineer-back-end-scala/1732/89303877920