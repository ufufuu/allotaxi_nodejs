const express = require('express');
const http = require("http");
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const { remoteDBConn, localDbConn } = require("./src/config/db");
const swaggerSpec = require("./swaggerDoc.json");
const hostName=process.env.RENDER_HOST || 'http://localhost';
const path = require('path');
const pg = require('pg');
const { Client } = require("pg");
const socketio = require("./src/sockets/initSocket");

const { WebSocketServer }= require("ws");
const WebSocket = require("ws");

const bookingRoutes = require("./src/routes/bookingRoutes");
const userRoutes = require('./src/routes/userRoutes');
const driverRoutes = require("./src/routes/driverRoutes");

//const rideBookedHandler = require("./sockets/whandlers/rideBookingHandler");
//const cookieParser = require("cookie-parser");
//const jwt = require('jsonwebtoken');
//const userAuth = require("./middlewares/auth");

const app = express();
const httpServer = http.createServer(app);
const io = socketio.getSocketIo(httpServer);

app.use(cors({ origin: hostName}));
const hostPORT = process.env.PORT || 3001;

var options = {
  explorer: true
};

const pool = new pg.Pool(remoteDBConn);
/*
const pool546 = new pg.Pool({
  connectionString: `postgres://allopromo_db_px8b_user:Gel30X8RPqqksAO1LDHlJRali2hFA1ep@Hdpg-d4909rm3jp1c73cqqo00-a.oregon-postgres.render.com/allopromo_db_px8b?ssl=true`
})
*/

/*
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
*/


pool.connect()
.then(()=>{
  console.log("Db Started");
})
.catch((err) => {
  console.log(" Error in Db Connection ", err);
});


//app.disable("x-powered-by");
//app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/user", userRoutes);
app.use("/bookings", bookingRoutes);  // userAuth, bookingRoutes);

var customSwaggerOptions = {
  explorer: true,
  swaggerOptions: {
    authAction: {
      JWT: {
        name: 'JWT',
        schema: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: ''
        },
        value: 'Bearer <my own JWT token>'
      }
    }
  }
}
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, customSwaggerOptions)); //swaggerDocument, options));

app.use((req, res, next ) => {
	req.io =io;
	next();
});

io.on('connection', (socket) => {
	console.log("A user connected from main server ID is :", socket.id);

	/*socket.emit("onRideBooking", function() {
		console.log("event emitted from server");
	});*/

	//registerUserHandlers(io, socket);

	//socket.on('disconnect', () => {
		//console.log('User disconnected, server');
	//});
});

const wss = new WebSocket.Server({
	port:3003
});

wss.on("connection", function connection(ws) {
	console.log("web Sockets on Connected, ID in WS is:");
	ws.on('error', console.error);

	ws.on("message", function message(data) {
		console.log('received: %s', data);
	});

	ws.send("something");
});



httpServer.listen( hostPORT, () =>{
	console.log(`app started and listening on ${hostName} and ${hostPORT}`);
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
// https://www.codemag.com/Article/2305031/Building-Web-APIs-Using-Node.js-and-Express-Part-1

/*
Comptes

    Non enregistré
    REER
    CELI
    CELIAPP
    REEE
    CRI
    FERR
    FRV
*/


// https://socket.io/docs/v4/listening-to-events/