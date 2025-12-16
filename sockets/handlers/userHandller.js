module.exports = (io, socket) => {
  const updatePassword = (payload) => {
    // Logic for updating a user password
    console.log('Password updated for user:', socket.id);
    // Emit only to the current socket
    socket.emit('user:password-changed', { status: 'success' });
  };

  // Register the specific event listeners for this module
  socket.on('user:update-password', updatePassword);
};