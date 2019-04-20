// write your application configuration here

const appConfig = {
    port: 3000
  };
  
  const dbConfig = {
    mongoUrl: 'mongodb://localhost:27017/keep'
  };
  
  const authConfig = {
    secret: 'hashItOut',
    expiry: '12h'
  };
  
  const logConfig = {
    level: 'debug'
  };
  
  module.exports = {
    appConfig,
    dbConfig,
    authConfig,
    logConfig
  }
  