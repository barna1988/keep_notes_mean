const bodyParser = require('body-parser');
//const swaggerUi = require('swagger-ui-express');
//const YAML = require('yamljs');
//const path = require('path');
const morgan = require('morgan');
const db = require('./db');
const apiV1 = require('./api/v1');

const log = require('./logging');

log.info('Setting up API middleware');
// const apiSpecPath = path.resolve(__dirname, '..', 'api-spec.yaml'); //eslint-disable-line no-undef
// const swaggerDocument = YAML.load(apiSpecPath);

const setMiddleware = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    //app.use('/api/v1/users/api-specs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    morgan.token('time', () => new Date().toISOString());
    app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));
}

const setDbConnection = () => {
    db.createDbConnection();
    let dbConnection = db.getDbConnection();
    dbConnection.on('error', db.onError);
    dbConnection.once('open', db.onSuccess);
}

const apiSetup = (app) => {
    app.use('/api/v1/', apiV1);

    app.get('/', (req, res) => {
        res.send('ok');
    })
}

module.exports = {
    setMiddleware,
    setDbConnection,
    apiSetup
};