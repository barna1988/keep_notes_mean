const initializeMongooseConnection = require('./db').createDbConnection;
const noteModel = require('./api/v1/notes/notes.entity');

module.exports = {
    initializeMongooseConnection,
    noteModel
}