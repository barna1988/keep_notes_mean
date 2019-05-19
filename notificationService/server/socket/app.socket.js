const socketIo = require('socket.io');
const log = require('../logging');

let io;
let connectedSessions = [];

const setupSocket = (server) => {
  log.info('setting up socket');
  io = socketIo(server);

  io.on('connection', onSocketConnect);
}

const onSocketConnect = (socket) => {
  log.info("A client is connected. Id: " + socket.id);

  socket.on('register', userName => {
    log.debug('client is registered.');
    connectedSessions = connectedSessions.filter(thesession => thesession.userName !== userName);
    
    let newSession = {
      id: socket.id, 
      userName: userName
    };
    
    log.info('Registering new session : ', newSession);
    connectedSessions.push(newSession);

  });

  socket.on('deregister', userName => {
    log.info('client disconnected. userName: ' + userName);
    connectedSessions = connectedSessions.filter(thesession => thesession.userName !== userName);
 });
};

// notification = { userName: <userName>, note: <note>}
const sendNotification = (notification) => {

  log.info('notifying: ', notification);
  log.info('users: ', connectedSessions);
  
  const session = connectedSessions.find(thesession => thesession.userName == notification.userName);
  
  if(session) {
    log.info('user session found to send notification - ', session);

    const socketId = session.id;
    if(!notification.self) {
      io.to(socketId).emit('share-note', notification);
      log.info('notified user');
    } else {
      io.to(socketId).emit('reminder', notification);
      log.info('reminded user about note');
    }
    return true;
  } else {
    log.info('user session not found');
    return false;
  }
}

module.exports = {
  setupSocket,
  sendNotification
}
