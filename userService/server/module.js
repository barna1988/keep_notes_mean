const initializeMongooseConnection = require('./db').createDbConnection;
const userModel = require('./api/v1/users/users.entity');
const signJWTToken = require('./api/v1/auth').signToken;
const verifyJWTToken = require('./api/v1/auth').verifyToken;

module.exports = {
    initializeMongooseConnection,
    userModel,
    signJWTToken,
    verifyJWTToken
}
