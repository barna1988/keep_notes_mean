let express = require('express');
let app = express();
const appSvc = require('./app.service');

// create db connection
appSvc.setDbConnection();

// express middleware
appSvc.setMiddleware(app);

// api configuration
appSvc.apiSetup(app);

module.exports = app;