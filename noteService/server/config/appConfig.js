// write your application configration here

const appConfig = {
  port: process.env.PORT || 3001
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

const externalAPI = {
  userAuthentication : {
    URL : process.env.USER_URL || 'http://localhost:3000/api/v1/auth',
    // URL : 'http://localhost:3000/api/v1/auth',
    method : 'POST'
  }
}

module.exports = {
  appConfig,
  dbConfig,
  authConfig,
  logConfig,
  externalAPI
}