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
	
	async queryNearByDrivers ( lat, lng, radius ) {
		const findNearbyDrivers = await pool.query(
			`SELECT * FROM "Locations"
			WHERE "latitude"=${lat} AND "longitude"=${lng}`);
		return findNearbyDrivers;
	};
	
	async HHJ(){
		// Get nearby locations API
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
	
	async kkj () {
		//try{
		const { lat, lng } = response.data.results[0].geometry.location;
		if (response.data.status !== 'OK') 
		{
			return res.status(400).send('Invalid address');
			//} catch(err){
				console.log("Error gain - ouatchi --- watchi vs ewe --- tem vs kabye"); 
			//}
		}
	}
	
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
	
	async getBestDriverMatch() {
		const latitude = 22.304239;
		const longitude = 114.179677;
		return "821650f4f7416524";
		
		return {
			'lat': latitude,
			'lng': longitude
		};
	}
}
module.exports = new GeoService();

// https://medium.com/@deepdeepak2222/how-to-implement-a-ride-matching-system-using-postgres-postgis-and-python-93cdcc5d0d55
// https://medium.com/@shubhamrajput252000/how-to-find-the-nearest-location-using-google-maps-in-a-mern-stack-application-81baab1cca1c
// https://dev.to/biswasprasana001/designing-a-ride-hailing-service-system-eg-uberlyft-a-beginner-friendly-guide-252oz
// https://sigm.tg/portal/apps/webappviewer/index.html?id=a1cd40a866d14a8f9112bc887af88bda

//WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint (${lng}, ${lat}), 4326, ${radius})
//name, ST_AsText(geom)