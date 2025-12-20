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
const socketio = require("./sockets/initSocket");
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
const io = socketio.getSocketIo(httpServer);

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

app.use((req, res, next ) => {
	req.io =io;
	next();
});
io.on('connection', (socket) => {

	//console.log("A user connected from main server: " );
	/*socket.emit("onRideBooking", function() {
		console.log("event emitted from server");
	});*/

	//registerUserHandlers(io, socket);

	//socket.on('disconnect', () => {
		//console.log('User disconnected, server');
	//});
  
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
/*
- Ronal Reagan loto via 80 Edwin Fozo 
- event Loop in JS and other features ?
- moment js 
- event Loop ,event Emitter, 
*/
/* Pembina - Emerson */
// emerson: 650 hbts in  hotel emmerson inn
//  Javascript is blocking , that is why it relies on callbacks , promises and async/await 

// JavaScript	is	synchronous	by	default,	and	is	single	threaded
/* JavaScript	is	synchronous	by	default,	and	is	single	threaded.	This	means
that	code	cannot	create	new	threads	and	run	in	parallel.	Find	out	what
asynchronous	code	means	and	how	it	looks	like
*/
/* Normally,	programming	languages	are	synchronous,	and	some	provide	a	way	to	manage
asynchronicity,	i
// non Blocking I/O ? how
// 
// Api Request
/*
const	xhr	=	new	XMLHttpRequest()
xhr.onreadystatechange	=	()	=>	{
	if	(xhr.readyState	===	4)	{
		xhr.status	===	200	?	console.log(xhr.responseText)	:	console.error('error')
	}
}
xhr.open('GET',	'https://yoursite.com')
xhr.send()
*/
// Social media Manager
// french Rotisserie Cafe 
// Palm Springs 