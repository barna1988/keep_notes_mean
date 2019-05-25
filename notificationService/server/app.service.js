const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const log = require('./logging');
const db = require('./db');

//swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const setDbConnection = () => {
  db.createDbConnection();
  let dbConnection = db.getDbConnection();
  dbConnection.on('error', db.onError);
  dbConnection.once('open', db.onSuccess);
}

const setMiddleware = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  
  //swagger setup
  const apiSpec = path.resolve(__dirname, '..', 'api-spec-swagger.yaml'); 
  const swaggerDoc = YAML.load(apiSpec);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  morgan.token('time', () => new Date().toISOString());
  app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));
}

module.exports = {
  setMiddleware,
  setDbConnection
};
