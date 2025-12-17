const io = require("socket.io");
const { userIODriver } = require("./driverSocket");
const { userIORider } = require("./riderSocket");

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

module.exports = { onSocketConnection };