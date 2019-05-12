const log = require('../logging');

const socket = require('socket.io-client')('http://localhost:3003');
socket.on('connect', () => {
  log.info('Connected to the server');

  const userInfo = 'abc@g.com';
  socket.emit('register', userInfo);
})

socket.on('share-note', (shareInfo) => {
  log.info('A note has been shared with you:');
  log.info(shareInfo);
});

socket.on('disconnect', () => {
  log.info('disconnect for the server');
});