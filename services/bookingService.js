const userModel = require("../models/userModel");
const radius = process.env.LOCATION_MATCHING_RADIUS;
const { userIODriver } = require("../sockets/driverSocket");
//const { usreIORider } = require("../sockets/riderSocket");
//const { onSocketConnection } = require("../sockets/in");

const { pool } = require("../config/db");

class BookingService {
	
	async createBooking ( passengerId, driverId, origin, destination ) 
	{
	
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
	
	async getBooking( Id ) {
		const Query = `SELECT FROM "Bookings" WHERE "Id"= $1 RETURNING *`;
		try{
			const booking = await pool.query(Query,[Id]);
			return res.status(200).json(booking);
		} catch(err) {
			console.log("err:", err);
		}
	}
	
	async GetBookings () {
		const bookings = await pool.query(
			`SELECT * FROM "Bookings"
			`);
		return bookings;
	}
	
	async updateBooking ( Id, updatedValue ) {
		const booking = this.getBooking(Id);
		
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

// https://ably.com/topic/websocket-architecture-best-practices

// https://kenokivabe.com/nodejs-setting-up-push-notifications-using-socket-io