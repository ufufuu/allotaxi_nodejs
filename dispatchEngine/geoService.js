const express = require("express");

const { pool } = require("../config/db");
const config = require('dotenv').config();
const address = '';
const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;
const geoCodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

const app = express();
app.use(express.json());

class geoService {
	
	async getCurrentLocation(){
		const response = await axios.post(geoCodingUrl);
		if (response.data.status !== 'OK') {
			return res.status(400).send('Invalid address');
		}
		const { lat, lng } = response.data.results[0].geometry.location;
		//const newLocation = new Location({ name, address, lat, lng });
		return response.data.results[0].geometry.location;
	}
	
	async getCloseDrivers ( longitude, latitude, radius ) {
		const drivers = await pool.query(
			`SELECT * from "AspNetUsers" WHERE "isDriver=true
			AND "Longitude" = longitude ANd "Latitude" = latitude`);
	
	};
	
	async findNearbyPoints (lng, lat, radius) {
		const result = await pool.query(
			`SELECT * FROM "Locations"
			`);
		console.log(result.rows);
		return result;
	}
	
	async getCloseDriverEs ( longitude, latitude, radius ) {
		const drivers = await pool.query(
			`SELECT * from "AspNetUsers" WHERE "isDriver=true
			AND "Longitude" = longitude ANd "Latitude" = latitude`
		);
	};

	HHJ () {
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
	/*
	kkj (){
			try{
				const { lat, lng } = response.data.results[0].geometry.location;
				if (response.data.status !== 'OK') {
				return res.status(400).send('Invalid address');
			} catch(err){
				console.log("Error");
			}	
		}
	}
	*/
}
module.exports = new geoService();



// https://medium.com/@deepdeepak2222/how-to-implement-a-ride-matching-system-using-postgres-postgis-and-python-93cdcc5d0d55
//https://medium.com/@shubhamrajput252000/how-to-find-the-nearest-location-using-google-maps-in-a-mern-stack-application-81baab1cca1c
// https://dev.to/biswasprasana001/designing-a-ride-hailing-service-system-eg-uberlyft-a-beginner-friendly-guide-252oz
// https://sigm.tg/portal/apps/webappviewer/index.html?id=a1cd40a866d14a8f9112bc887af88bda


//WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint (${lng}, ${lat}), 4326, ${radius})

//name, ST_AsText(geom)