// write your application configration here

const appConfig = {
  port: 3003,
  sleepDuration: 5000
};

const dbConfig = {
  mongoUrl: 'mongodb://localhost:27017/keep'
};

const logConfig = {
  level: 'debug'
};

const authConfig = {
  secret: 'some-secret-value',
  expiry: '10h'
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
  logConfig,
  authConfig,
  externalAPI
}
