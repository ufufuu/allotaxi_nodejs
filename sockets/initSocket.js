


const initSocket = (server) => {
	
  io = require('socket.io')(server);
  
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    
  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized!');
  }
  return io;
};

module.exports = {
  initSocket,
  getIO,
};

/*
{
  cors: {
    origin: "*", // Or '*' for any origin (less secure)
    methods: ["GET", "POST"],
    credentials: true
  }
  */