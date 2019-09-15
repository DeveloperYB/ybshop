module.exports =  (io) => {
  const testVar = [];
  io.on('connection', (socket) => {
    socket.on('client message', (data) => {
      testVar.push(data);
      console.log(testVar);
      io.emit('server message', data);
    });
  });
};
