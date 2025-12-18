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

/*
function getSocketIo ( server ) {
	io = new Server(server, {
		cors: {
		origin: "*", // Or '*' for any origin (less secure)
		methods: ["GET", "POST"],
		credentials: true
	}});
	io.on("connection", (socket) => {
		console.log(" a User connected  from socket init:", socket.id);	
		socket.on("disconnect", function () {
			console.log(" user disconnected from init!");
		});
    });
    return io;
}

const sendMessageToAll = (eventName, message) => {
	const io = getSocketIO();
	if (io) {
	  io.emit(eventName, message); // io.emit() sends to all connected clients
	} else {
	  console.error('Socket.io not initialized.');
	}
}*/
	
module.exports = {
	
	init: function (server ) {
		io = require('socketio')(server);
		return io;
	},
	
	getIo: function () {
		if(!io) {
			throw new Error("socket not initialized");
		}
		return io;
	},
	
    getSocketIo: (server) => {
		
        io = new Server(server, {
			cors: {
			origin: "*", // Or '*' for any origin (less secure)
			methods: ["GET", "POST"],
			credentials: true
		}});
        io.on("connection", (socket) => {
			
			console.log(" User connected  from socket init: ", socket.id);
			
			/*socket.emit("onBookingRequest", function (data) {
				console.log("emit onBookingRequest:", "baby");
			});*/
			
			socket.on("disconnect", function () {
				console.log( " user disconnected from init!", socket.id );
			});
        });
        return io;
    },
	sendMessageToAll: (eventName, message) => {
		const io = getSocketIO();
		if (io) {
		  io.emit(eventName, message); // io.emit() sends to all connected clients
		} else {
		  console.error( 'Socket.io not initialized.');
		}
	},
	
	sendMessageToUser: (socketId, eventName, message) => {
		const io = getSocketIO();
		if (io) {
		  io.to(socketId).emit(eventName, message); // io.to(roomId).emit() targets a specific socket/room
		} else {
		  console.error( 'Socket.io not initialized.');
		}
	}
}
//module.exports = { getSocketIo, sendMessageToAll };

// Trans Europ Expresss - transafr