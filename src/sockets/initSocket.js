const socketio = require("socket.io");
const { Server } = require("socket.io");
let io;

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
			credentials: true,
			allowEIO3: true,
		}});
        io.on("connection", (socket) => {
			//console.log(" User connected  from socket init: ", io);
			
			/*socket.emit("onRideBooking", function () {
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
};


//module.exports = { getSocketIo, sendMessageToAll };
// Trans Europ Expresss - transafr