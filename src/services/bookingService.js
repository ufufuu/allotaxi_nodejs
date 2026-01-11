const crypto = require("crypto");
const Booking = require('../models/BookingModel');
const { pool } = require("../config/db");
const { userIODriver } = require("../sockets/driverGeoLocation");
const { BookingStatus } = require("../models/enum/index.js");
const userModel = require("../models/userModel");
const radius = process.env.LOCATION_MATCHING_RADIUS;

class BookingService {
	
	async createBooking ( riderId, driverId, origin, destination ) 
	{
		const bookingId = crypto.randomBytes(20).toString('hex');
		riderId = "8acc817e9c5601ab841c3c758934f384c12394a7";
		const _query= `INSERT INTO "Bookings"(
			"Id",
			"Origin",
			"Destination",
			"Fare",
			"Status",
			"Created",
			"Expiry",
			"RiderId",
			"DriverId")
			values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
		
		const booking = await pool.query(_query, [bookingId, origin, destination, 100, 1, "2020-03-10T04:05:06.157Z", "2020-03-10T04:05:06.157Z", riderId, null]);
		
		//io.on("connection", onSocketConnection(io));
		//var currentLocation = await geoService.getCurrentPosition();
		//var nearbyDrivers = await geoService.queryNearByDrivers(lat, lng, radius );
		//var bestDriverMatch =  await geoService.getBestDriverMatch(nearbyDrivers);
	
		//const passenger = await passengerService.find(passengerId)
		//const booking = await this.insert({ driver, passenger, origin, destination })
		//passenger.bookings.push(booking);
		//await passenger.save();
		
		return booking;
    }
	
	async GetBookings () {
		const _query = `SELECT * FROM "Bookings"`;
		const bookings = await pool.query(_query);
		return bookings.rows;
	}
	
	async getBooking(Id) {
		const Query =`SELECT * FROM "Bookings" WHERE "Id"=$1`;
		
		try{
			const booking = await pool.query(Query,[Id]);
			return booking.rows;
		} catch(err) {
			console.log("err:", err);
		}
	}
	
	async acceptBooking() {
	}
	async denyBooking() {
	}
	async rerouteBooking() {
	}
	
	async updateBooking(bookingId, updatedValue, driverAccept ) {
		//const booking = this.getBooking(bookingId);
		const _query = `UPDATE "Bookings" SET "Status"=$1, "DriverId"=$2 WHERE "Id"=$3`;
		try{
			const res = await pool.query(_query, [2, updatedValue, bookingId]);
			return res;
		} catch(err) {
			console.log("err:", err);
		}	
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