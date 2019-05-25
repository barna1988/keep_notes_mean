const initializeMongooseConnection = require('./db').createDbConnection;
const noteModel = require('./api/v1/notes/notes.entity');

const signJWTToken = require('./services/auth.service').signToken;
const verifyJWTToken = require('./services/auth.service').verifyToken;

module.exports = {
    initializeMongooseConnection,
    noteModel,
    signJWTToken,
    verifyJWTToken
}