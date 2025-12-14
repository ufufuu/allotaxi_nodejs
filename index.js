const express = require('express');
const http = require("http");
const app = express();

const httpServer = http.createServer(app);
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const userController = require('./controllers/userController');
//const { initSocket } = require("./sockets/initSocket");

const socketio = require("./sockets/init");
const swaggerDocument = require('./swagger.js');

const swaggerSpec = require('./swagger');
const path = require('path');
const pg = require('pg');
const { Client } = require("pg");
const Postgis = require("postgis");

const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require("./routes/driverRoutes");
const userAuth = require("./middlewares/auth");
const { connectionString } = require("./config/db");

//const cookieParser = require("cookie-parser");
//const jwt = require('jsonwebtoken');
app.use(cors({ origin: 'http://localhost:3000'}));

const PORT = process.env.PORT || 3001;
var options = {
  explorer: true
};

const pool = new pg.Pool(connectionString);

pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
});
function startUpApp () {
}
app.disable("x-powered-by");
//app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/user", userRoutes);
app.use("/bookings", bookingRoutes);  // userAuth, bookingRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec)); //swaggerDocument, options));

//initSocket(httpServer);
const io = socketio.getIO(httpServer);

httpServer.listen( PORT, () =>{
	console.log(`app started and listening on ${PORT}`);
});

// Handling Errors
app.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  httpServer.close(() => process.exit(1))
});

module.exports={
	//appConfig
};


// https://www.tigerdata.com/blog/how-we-made-postgresql-the-best-vector-database
// https://dev.to/biswasprasana001/designing-a-ride-hailing-service-system-eg-uberlyft-a-beginner-friendly-guide-252o
// https://www.geeksforgeeks.org/sql/how-to-design-a-database-for-ride-sharing-and-carpooling-services/
// // https://stackoverflow.com/questions/34997598/sql-database-ride-sharing
// https://analyticsengines.com/resources/insights/analysing-nyc-taxi-data-with-postgresql-timescaledb-and-python/
// https://www.hellointerview.com/learn/system-design/problem-breakdowns/uber
// https://www.alibabacloud.com/blog/database-design-and-implementation-of-a-ride-hailing-dispatch-system_597161
// https://medium.com/@deepdeepak2222/how-to-implement-a-ride-matching-system-using-postgres-postgis-and-python-93cdcc5d0d55
// https://www.geeksforgeeks.org/sql/how-to-design-a-database-for-ride-sharing-and-carpooling-services/
// POST GRES GIS Extensions for Ride Sharing ?

// event and delega in nodejs ?

// #######################
// Carte Vurtuelle de Wave
// Carte virtuelle Wave , Visa
// Intercargo Cote d-Ivoire, es ivoiriens ne peuvent faire les adresses en Erurope ni aux Etas-Unis 
// Kady Liliane Samassi - Intercargo CI 
// 212 390 54 54 ?
//2-8 cenral avennu # 100
// -- suite 100 nj 07
// city East Orange nj  07018
// make this my default adress

//2. Broadcast the update in real-time to other subscribers
//socket.emit('onPickUpRider', data);   // vs io.emit to All connected clients
		
//io.to('CI3bN_CtNW5T9SrMAAAH').emit('onPickUpRider', data);
	
// from client
// io.addEventListener('user-ocation-update', ()=> {
//})
// socket.emit('udpateLocation', {driverId, lng, lat});

// https://dev.to/olatisunkanmi/building-robust-nodejs-applications-with-socketio-best-practices-5hm5

// https://ably.com/topic/socketio

//https://medium.com/@mogold/nodejs-socket-io-express-multiple-modules-13f9f7daed4c