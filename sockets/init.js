const socketio = require("socket.io");
const { Server } = require("socket.io");
let io;

/*
const initSock =() => {
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
    getSocketIO: (server) => {
        const io = new Server(server, {
			cors: {
			origin: "*", // Or '*' for any origin (less secure)
			methods: ["GET", "POST"],
			credentials: true
		}});
        io.on("connection", (socket) => {
			console.log("a User connected  from socket init:", socket.id);
			
			/*socket.emit("onBookingRequest", function (data) {
				console.log("emit onBookingRequest:", "baby");
			});*/
			
			socket.on("disconnect", function () {
				console.log(" user disconnected from init!");
			});
        });
        return io;
    },
	
	// Function to send a message to all connected clients
	sendMessageToAll: (eventName, message) => {
		//let io= getIO();
		if (io) {
		  io.emit(eventName, message); // io.emit() sends to all connected clients
		} else {
		  console.error('Socket.io not initialized.');
		}
	},
	// Function to send a message to a specific client
	sendMessageToUser: (socketId, eventName, message) => {
		//let io= getIO();
		if (io) {
		  io.to(socketId).emit(eventName, message); // io.to(roomId).emit() targets a specific socket/room
		} else {
		  console.error('Socket.io not initialized.');
		}
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

// Trans Europ Expresss - transafr