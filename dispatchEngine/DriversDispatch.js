const express = require("express");
const geoService = require("../services/geoService");
const driversTracking = require("./DriversTracking");
const bookingModel = require("../models/BookingModel");
const pool = require("../config/db");
const io = require("socket.io");

class DriversDispatch {
	
	async DispatchBooking (bookingModel, riderId ) {
		// Obtain from APi user-location post Api to Server: riderId, latCoords, lngCoords
		//var riderCoordinates = await this.getRiderLocation();
		// listen for incoming connections from client or Is it io.sockets.on ?
		
		io.on("connection", function (socket) {
			console.log('io on connection:', socket.id);
			console.log('io on connection:', riderId);
			
		    // start listening for coords
			socket.on('send coords', function (data) {
				// broadcast your coordinates to everyone except you
				//socket.broadcast.emit('load:coords', data);  // or is it socket.emit ?
				console.log('socket on send coords:', data);
			});
			
			// Handle disconnection
		    socket.on('disconnect', () => {
				console.log('User disconnected:', socket.id);
		    });
		});
	}
	
	async matchBookingToDriver ( bookingModel ) {	
	
	}
	
	async updateDriverLocation ( lat, lng, driverId ) {
		
	}
	
	async updateLocationDb ( lat, lng, driverId ) {
		const update = await pool.query(`
		
		// Add Driver driverIsOnline to tb
		
		update "DriverLocation"(
			"driverId", "longitude", "latitude"
			)
		where Id = driverId
		values($1, $2, $3) returuning *`
		[lat, lgn]);
	}
}

module.exports = new DriversDispatch();

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

// https://pmc.ncbi.nlm.nih.gov/articles/PMC7055897/	??? 
// mapserver npm ?
// geoServer npm ?
// Postgis google maps - mapbox ?
// Postgis google maps
// https://stackoverflow.com/questions/11234413/node-js-library-for-geospatial-operations/11942832
// https://dev.to/biswasprasana001/designing-a-ride-hailing-service-system-eg-uberlyft-a-beginner-friendly-guide-252o
// https://stackoverflow.com/questions/68294906/how-does-uber-send-new-ride-requests-to-drivers

/*
3. 🔄 Matching Engine (Dispatch System)
What happens?
The system matches a passenger with the nearest available driver.
How it works:
    A passenger sends a ride request.
    Backend queries nearby drivers (using location data).
    It selects the best one based on distance, rating, etc.
    Driver receives the request and accepts or declines.
Tech used:
    Geospatial indexing (e.g., using Haversine formula + R-tree or GeoHash)
    Priority queues for driver selection.
    Use Redis or Elasticsearch for fast geo queries.
*/
// Start by matching based on nearest distance and availability. Add complexity like surge pricing, ratings, or driver preferences later.

// https://pmc.ncbi.nlm.nih.gov/articles/PMC7055897/	??? 
// mapserver npm ?
// geoServer npm ?
// Postgis google maps - mapbox ?
// Postgis google maps
// https://stackoverflow.com/questions/11234413/node-js-library-for-geospatial-operations/11942832
// https://dev.to/biswasprasana001/designing-a-ride-hailing-service-system-eg-uberlyft-a-beginner-friendly-guide-252o
// https://stackoverflow.com/questions/68294906/how-does-uber-send-new-ride-requests-to-drivers