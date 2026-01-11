//const express = require("express");
//const socketio = require("socket.io");

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

module.exports = (io, socket) => {
  const createOrder = (payload) => {
    // Logic for creating an order
    console.log('Order created:', payload);
    // Emit an event to all clients in a specific room, for example
    io.to('orders').emit('order:status', { message: `Order ${payload.id} processed` });
  };

  const readOrder = (orderId, callback) => {
    console.log('Reading order:', orderId);
    if (callback) {
      callback({ orderId, details: '...' });
    }
  };
  // Register the specific event listeners for this module
  socket.on('order:create', createOrder);
  socket.on('order:read', readOrder);
};


//module.exports = { dispatchDriverHandler };