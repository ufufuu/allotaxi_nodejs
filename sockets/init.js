const socketio = require("socket.io");
const { Server } = require("socket.io");

let io;

/*
const initSock =() => {
	//let io;
	
module.exports = {
  init: function(server) {
    io = require("socket.io")(server);
    return io;
  },
  getio: function() {
    if (!io) {
      throw new Error("You must call .init(server) first");
    }
    return io;
  }
};
}
*/


/*
const io = require('socket.io')( httpServer, {
  cors: {
    origin: "*", // localhost :port Or '*' for any origin (less secure) 
    methods: ["GET", "POST"],
    credentials: true
  }
});
*/

/*
const io = socketio ( server ) => {
//const io = initSocket(httpServer, {
  cors: {
    origin: "*", // Or '*' for any origin (less secure)
    methods: ["GET", "POST"],
    credentials: true
  }
};*/

/*
const getIO = ( ) => {
  //io = require("socket.io")(server);
  if (!io) {
    throw new Error('Socket.IO not initialized!');
  }
  return io;
};
*/
module.exports = {
    getIO: async (server) => {
        const io = new Server(server, {
			cors: {
			origin: "*", // Or '*' for any origin (less secure)
			methods: ["GET", "POST"],
			credentials: true
		}});
        io.on("connection", (socket) => {
			console.log("a User connected :", socket.id);
			
			socket.on("disconnect", function () {
				console.log(" user disconnected !");
			});
        });
		io.on("onBookingRequest", function () {
			console.log('onBookingRequest: ', origin);
		});
        return io;
    }
}

/*
const configureSockets = ( io, socket ) => {
	return {
		driverLocation:userIODriver(io),
		riderLocation:userIODriver(io),
	};
};
const onSocketConnection = ( io) => ( socket ) => {
	const { driverLocation } = configureSockets(io, socket);
	socket.on("driver-move", driverLocation);
};
*/


/*
module.exports = {
  initSocket,
  getIO,
  getIo
};*/