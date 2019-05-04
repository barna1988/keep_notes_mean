const express = require('express');
let app = express();

const appservice = require('./app.service');

//set middleware
appservice.setAppMiddleWare(app);

//set api
appservice.setAPIproxy(app);

module.exports = app;