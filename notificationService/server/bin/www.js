const app = require('../app');
const appConfig = require('../config').appConfig;
const log = require('../logging');
const socket = require('../socket/app.socket');
const worker = require('../app.worker');

const port = appConfig.port;
const server = require('http').createServer(app);
socket.setup(server);
worker.registerWorker();

server.listen(port, () => {
  log.info(`Server is running on port ${port}`);
});
