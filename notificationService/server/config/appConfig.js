// write your application configration here

const appConfig = {
  port: process.env.PORT || 3003,
  sleepDuration: 10000
};

const dbConfig = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/keep'
};

const logConfig = {
  level: process.env.LOG_LEVEL || 'debug'
};

const authConfig = {
  secret: 'some-secret-value',
  expiry: '10h'
};

const externalAPI = {
  userAuthentication : {
    URL : process.env.USER_URL || 'http://localhost:3000/api/v1/auth',
    method : 'POST'
  }
}

module.exports = {
  appConfig,
  dbConfig,
  logConfig,
  authConfig,
  externalAPI
}
