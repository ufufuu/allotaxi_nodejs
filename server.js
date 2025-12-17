const express = require('express');
const http = require("http");
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const userController = require('./controllers/userController');
const swaggerDocument = require('./swagger.js');
const swaggerSpec = require('./swagger');
const path = require('path');
const pg = require('pg');
const { Client } = require("pg");
const Postgis = require("postgis");
const socketio = require("./sockets/init");
//const socketio = require("socket.io");
//const { Server } = require("socket.io");
//const dispatchDrivers = require("./dispatchEngine/DriversDispatch.js");
//const { initSocket } = require("./sockets/initSocket");
//const rideBookedHandler = require("./sockets/whandlers/rideBookingHandler");



const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require("./routes/driverRoutes");
const userAuth = require("./middlewares/auth");

const { connectionString } = require("./config/db");
//const cookieParser = require("cookie-parser");
//const jwt = require('jsonwebtoken');

const app = express();
const httpServer = http.createServer(app);
const io = socketio.getSocketIO(httpServer);

app.use(cors({ origin: 'http://localhost:3001'}));
const PORT = process.env.PORT || 3001;
var options = {
  explorer: true
};

//const io = new Server (httpServer, {
/*
  cors: {
    origin: "*", // Or '*' for any origin (less secure)
    methods: ["GET", "POST"],
    credentials: true
}});*/

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

//app.disable("x-powered-by");
//app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/user", userRoutes);
app.use("/bookings", bookingRoutes);  // userAuth, bookingRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec)); //swaggerDocument, options));

io.on('connection', (socket) => {
	console.log('A user connected from main server', socket.id);  
	if (process.env.ENVIRONMENT == "production") {
      socket.on("log", async (log) => {
        log.formattedTimestamp = moment().tz("Asia/Kolkata").format("MMM DD hh:mm:ss A");
        try {
          await frontendLogModel.create(log);
        } catch (error) {
          console.log("Error sending logs...");
        }
      });
    }
	//socket.emit("onRideBooking", function() {
		//console.log("booking emitted from index");
	//});
	
	//registerUserHandlers(io, socket);

	socket.on('disconnect', () => {
		console.log('User disconnected, server');
	});
});

httpServer.listen( PORT, () =>{
	console.log(`app started and listening on ${PORT}`);
});

app.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  httpServer.close(() => process.exit(1))
});

module.exports={
	app, 
	httpServer, 
	io
};
