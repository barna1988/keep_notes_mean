const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./db');
const apiV1 = require('./api/v1');
const cors = require('cors');

const log = require('./logging');

//swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const setMiddleware = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    
    //swagger setup
    const apiSpec = path.resolve(__dirname, '..', 'api-spec-swagger.yaml'); 
    const swaggerDocument = YAML.load(apiSpec);
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

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