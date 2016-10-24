/**
 * Created by jahansj on 23/10/2016.
 */
module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('New user connected.');
    
    socket.on('something', (sock) => {
      console.log('something sock: ' + sock);

      socket.emit('another', 'some data');
    });
  });
};