const express = require("express");

//const pool = require("..\..\config\db");

//const notificationService = require("firebASE"); // firebase cloud messaging

const geoService = require("./geoService");
const driversTracking = require("./DriversTracking");


class DispatchService {
	
	
}


module.exports = new DispatchService();




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