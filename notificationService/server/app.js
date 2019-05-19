let express = require('express');
const appSvc = require('./app.service');
const apiV1 = require('./api/v1');
const db = require('./db');

let app = express();

// create db connection
appSvc.setDbConnection();

// express middleware
appSvc.setMiddleware(app);

// api configuration
app.use('/api/v1/', apiV1);

app.use('/', (req, res) => {
    res.send('ok notification service');
})

module.exports = app;
