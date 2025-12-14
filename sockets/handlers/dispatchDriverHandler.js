//const express = require("express");
//const socketio = require("socket.io");
//const http = require("http");
//const app = express();
//const httpServer = http.createServer(app);

/*
const io = socketio(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});*/

/*
const dispatchDriverHandler = () => {
	
	io.on("connection", function (socket) 
	{
		console.log(" Driver Id in dispatch io on connection : ", driverId);
		console.log("sending Notify to user with Socket Id in io on connection:", driver.socketId);
			
		socket.on('onPickUpRider', function (data) {
			console.log('onPickUpRider:', data);
		});
			
		// Handle disconnection
		socket.on('disconnect', () => {
			console.log('User disconnected:', socket.id);
		});
	});
};
/*/


//module.exports = { dispatchDriverHandler };