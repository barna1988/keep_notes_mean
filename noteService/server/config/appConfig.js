// write your application configration here

const appConfig = {
  port: 3001
};

const dbConfig = {
  mongoUrl: 'mongodb://localhost:27017/keep'
};

const authConfig = {
  secret: 'some-secret-value',
  expiry: '10h'
};

const logConfig = {
  level: 'debug'
};

const externalAPI = {
  userAuthentication : {
    URL : 'http://localhost:3000/api/v1/auth',
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