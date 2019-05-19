// write your application configration here

const appConfig = {
  port: process.env.PORT || 3000
};

const dbConfig = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/keep'
};

const authConfig = {
  secret: 'some-secret-value',
  expiry: '10h'
};

const logConfig = {
  level: process.env.LOG_LEVEL || 'debug'
};

module.exports = {
  appConfig,
  dbConfig,
  authConfig,
  logConfig
}