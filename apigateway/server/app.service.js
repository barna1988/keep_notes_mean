const proxy = require('http-proxy-middleware');
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

const log = require('./logging');

const morgan = require('morgan');

const setAppMiddleWare = (app) => {
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: false }));

    // app.use(cors());
    app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

    morgan.token('time', () => new Date().toISOString());
    app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));
}

const getNoteProxy = () => {
    return proxy({
        target: config.NOTES_URL,
        pathRewrite: {
            '^/notes/': '/api/v1/notes/'
        }
    });
}

const getUsersProxy = () => {
    return proxy({
        target: config.USERS_URL,
        changeOrigin: true,
        pathRewrite: {
            '^/users/': '/api/v1/users/'
        }
    });
}

const getAuthenticationProxy = () => {
    return proxy({
        target: config.USERS_URL,
        changeOrigin: true,
        pathRewrite: {
            '^/auth/': '/api/v1/auth/'
        }
    });
}

const getNotificationProxy = () => {
    return proxy({
        target: config.NOTIFICATION_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/notifications/': '/api/v1/notifications/'
        }
    });
}

const setAPIproxy = (app) => {
    //dummy
    app.use('/apigateway', (request, response) => {
        response.send("Showing API Gateway");
    });

    //notes proxy
    app.use('/notes/', getNoteProxy());

    //users proxy
    app.use('/users/', getUsersProxy());

    //notifications proxy
    app.use('/notifications/', getNotificationProxy());

    //authentication proxy
    app.use('/auth/', getAuthenticationProxy());

    //error
    app.use((request, response) => {
        response.status(404).send({
            "message": "Not Found."
        })
    })
}

module.exports = {
    setAppMiddleWare,
    setAPIproxy
};