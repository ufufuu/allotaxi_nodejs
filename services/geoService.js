const express = require("express");
const axios = require("axios");
const { Server } = require("socket.io");
const httpServer = require("http");
const { pool } = require("../config/db");
const config = require('dotenv').config();
const address = '';
const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;
const geoCodingUrl = `https://maps.googleapis.com/maps/api/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
const baseApiUrl = process.env.BASE_API_URL;

const app = express();
app.use(express.json());
const io = new Server (httpServer, {
	cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
class GeoService {
	
	async getCurrentPosition() {
		// Get lat and lng Data from Api Being hitten by Client updating his adress
		
		const updatingApi = `api/v1/services/location-update`;
		const Url = baseApiUrl+ updatingApi;
		//const { data } = axios.post(Url, {latidude, longitude, userId});
		return {
			'latitude':6.1833216,
			'longitude':1.2025856
		}
		
		const response = await axios.post(geoCodingUrl);
		
		if (response.data.status !== 'OK') {
			return res.status(400).send('Invalid address');
		}
		const { lat, lng } = response.data.results[0].geometry.location;
		//const newLocation = new Location({ name, address, lat, lng });
		return response.data.results[0].geometry.location;
	}
	
	async continuousUpdateUserPositions(userId, userSocketId, currentLat, currentLng) {
		const updateQuery = `UPDATE "Location" SET "Latitude" = $1 "Longitude" =$2
			WHERE "UserId" = $3 RETURNNG *`;
		pool.query(updateQuery, [currentLat, currentLng, userSocketId]);
	}
	
	//async queryNearByDrivers ( Lat, Lng, radius ) {
	async queryNearByDrivers ( point, radius ) {
		/*const findNearbyDrivers = await pool.query(
			`SELECT * FROM "Locations"
			WHERE "Latitude"=${lat} AND "Longitude"=${lng}`);
		return findNearbyDrivers;*/
		
		const pointOne ={
			'Lat': point.Lat,
			'Lng':point.Lng
		};
		const pointT = { 'Lat':6.1833216,'Lng':1.2025856 };
		const nearBydrivers = 
		[	{ Lat: 55.87, Lng:  4.20 }, 
			{ Lat: 55.89, Lng:  4.20 },
			{ Lat: 55.89, Lng:  4.10 }
		];
		
		try{
			//return nearBydrivers;
			return await this.haversine(pointOne, pointT );
		}
		catch(error){
			console.log("error in haversine:", error);
		}
	};
	
	async haversine ( p1, p2 ) {	// or npm @turf/nearest-point 
	
		const R = 2.5; // radius of earth in kms: 6371 
		const r = Math.PI / 180; // degree to radian conversion
		const deltaLat = (p2.Lat - p1.Lat);
		const deltaLng = (p2.Lng - p1.Lng);
		const a = (
			Math.sin(deltaLat /2) * 2+
			Math.cos(p1.Lat * r) *
			Math.cos(p2.Lat * r) *
			Math.sin(deltaLat /2) * 2
		);
		const b = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + (p1.Lat * r) * Math.cos (p2.Lat *r ) * Math.sin (deltaLng/2) * Math.sin(deltaLng/2);
		console.log("a or b in geoService :", a);
		
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		console.log("c in geoService :", c);
		return R * c;
	}
	
	async HHJ(){
		app.get('/nearest-locations', async (req, res) => {
		  const { lat, lng } = req.query;
		  // Find locations within 10km radius (using MongoDB geospatial query)
		  const locations = await Location.find({
			lat: { $gte: lat - 0.09, $lte: lat + 0.09 },
			lng: { $gte: lng - 0.09, $lte: lng + 0.09 },
		  });

		  res.json(locations);
		});
	}
	
	//const closestLocation = locations.reduce(( r, o) => {
	/*closestLocation (){
		const distance= haversine (o, targetLocation);
		if( distance < r.minDistance || !r.minDistance) {
			return { location: o, minDistance: distance };
		}
		return r;
	}, {});*/

	async haversineDistance (location1, location2) {
		const toRad = (x) => {
			return x * Math.PI / 180;
		};
		const lat1 = location1.latitude;
		const lat2 = location2.latitude;
	  
		const dLat = toRad(location1.latitude - location2.latitude);
		const dLong = toRad( location1.longitude - location2.longitude);
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
				Math.sin(dLong / 2) * Math.sin(dLong / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = 6371 * c;
	  
		return distance;
	};
	
	async getBestDriverMatch( lt,lg ) {
		const pt1 = {'latitude' :22.304239, 'longitude': 0};
		const pt2 = {'latitude': 114.179677, 'longitude': 0};
		//const res = await this.haversine(pt1, pt2);
		//return res;
		return{
			"Id": 1,
			"UserId": "4d08af0312b492e4ef225422c140c5b45e8a833c"
		};
		return {
			'lat': latitude,
			'lng': longitude
		};
	};
	
	/*
		const closestLocation = locations.reduce(( r, o) => {
			const distance= haversine (o, targetLocation);
			if( distance < r.minDistance || !r.minDistance) {
				return { location: o, minDistance: distance };
			}
			return r;
		}, {});
	*/
	/*async updateLocationDb ( lat, lng, driverId ) {
		const update = await pool.query(`
		// Add Driver driverIsOnline to tb
		update "DriverLocation"(
			"driverId", "longitude", "latitude"
			)
		where Id = driverId
		values($1, $2, $3) returuning *`
		[lat, lgn]);
	}
	
	async updateDriverLocation ( lat, lng, driverId ) {
		
	}*/
}
module.exports = new GeoService();

// https://medium.com/@deepdeepak2222/how-to-implement-a-ride-matching-system-using-postgres-postgis-and-python-93cdcc5d0d55
// https://medium.com/@shubhamrajput252000/how-to-find-the-nearest-location-using-google-maps-in-a-mern-stack-application-81baab1cca1c
// https://dev.to/biswasprasana001/designing-a-ride-hailing-service-system-eg-uberlyft-a-beginner-friendly-guide-252oz
// https://sigm.tg/portal/apps/webappviewer/index.html?id=a1cd40a866d14a8f9112bc887af88bda
//WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint (${lng}, ${lat}), 4326, ${radius})
//name, ST_AsText(geom)