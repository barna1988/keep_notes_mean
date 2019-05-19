const app = require('../app');
const appConfig = require('../config').appConfig;
const log = require('../logging');
const socket = require('../socket/app.socket');
const socketClient = require('../app.client');

const port = appConfig.port;
const server = require('http').createServer(app);
socket.setupSocket(server);
socketClient.registerSocket();

server.listen(port, () => {
  log.info(`Server is running on port ${port}`);
});
