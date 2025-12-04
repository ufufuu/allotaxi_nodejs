const express = require("express");
const io = require("socket.io");
const pg = require("pg");

class DriversTracking {
	
	/*
	async updateDriverLocation(lng, lat, driverId) {
		const update = await pool.query(`
		update "DriverLocation"(
			"driverId", "longitude", "latitude"
			)
		where Id = driverId
		values($1, $2, $3) returuning *`
		[lng, lat]);
	}
	
	updateDriversLocations() {
		
	}
	*/
	
}

module.exports = new DriversTracking();




/*
2. 📍 Real-Time Location Tracking
What happens?
The app continuously updates the location of drivers and passengers.
COntinuously Updatet Location Table per se driver
Key Concepts:
    Use the phone’s GPS and mobile network.
    Send location updates every few seconds.
    Backend uses WebSockets or MQTT for real-time updates.
*/

// Using socket io Events transfer drivers gps coordinates 2 server 