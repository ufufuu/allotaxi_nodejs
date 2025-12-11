const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const socketio = require("socket.io");

const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const userController = require('./controllers/userController');
const { onSocketConnection } = require("./sockets");

const swaggerDocument = require('./swagger.js');
const swaggerSpec = require('./swagger');
const path = require('path');
const pg = require('pg');
const { Client } = require("pg");
const Postgis = require("postgis");
const app = express();
const httpServer = http.createServer(app);

//const jwt = require('jsonwebtoken');
app.use(cors({ origin: 'http://localhost:3000'}));

//const io = socketio(httpServer);
const io = socketio(httpServer, {
  cors: {
    origin: "*", // Or '*' for any origin (less secure)
    methods: ["GET", "POST"],
    credentials: true
  }
});

//const cookieParser = require("cookie-parser");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require("./routes/driverRoutes");
const userAuth = require("./middlewares/auth");
const { connectionString } = require("./config/db");


const port = process.env.PORT || 3001;

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

					
app.disable("x-powered-by"); 	//// Change To Allow oringin only !
//app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/bookings", bookingRoutes);  // userAuth, bookingRoutes);
 
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec)); //swaggerDocument, options));

io.on("connection", ( socket ) => { //, onSocketConnection(io))

    console.log(' WebSocket connection from a User in index.js', socket.id);
	
	socket.on('onBookingRequest',  (data ) => {
		
		console.log(' in onBookingRequest event, position is: ', data);
		
		//2. Broadcast the update in real-time to other subscribers
		//socket.emit('onPickUpRider', data);   // vs io.emit to All connected clients
		
		io.to('CI3bN_CtNW5T9SrMAAAH').emit('onPickUpRider', data);
		
		// from client
		// io.addEventListener('user-ocation-update', ()=> {
		//})
		// socket.emit('udpateLocation', {driverId, lng, lat});
		
	});
	socket.on('disconnect', () => {
		console.log(' User disconnected', socket.id );
	});
});
io.on('user-location-update', ( userCoordinates ) => {
	//io.emi, call fct to Updsate user Location in db
	const { lat, lng, userId }  = userCoordinates;
	
});
httpServer.listen( port, () =>{
	console.log(`app started and listening on ${port}`);
});

// Handling Errors
app.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  httpServer.close(() => process.exit(1))
})



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