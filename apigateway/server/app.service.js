const proxy = require('http-proxy-middleware');
const config = require('./config');
const bodyParser = require('body-parser');

const log = require('./logging');

const morgan = require('morgan');

const setAppMiddleWare = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    morgan.token('time', () => new Date().toISOString());
    app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));
}

const getNoteProxy = () => {
    return proxy({
        target: config.NOTES_GET_URL,
        pathRewrite: {
            '^/notes/': '/api/v1/notes/'
        }
    });
}

const getUsersProxy = () => {
    return proxy({
        target: config.USERS_GET_URL,
        // pathRewrite : (path, req) => {
        //     let newpath = path.replace('/users/','/api/v1/users/');
        //     log.info('newpath', newpath)
        //     return newpath;
        // }
        pathRewrite: {
            '^/users/': '/api/v1/users/'
        }
    });
}

const getWebProxy = () => {
    return proxy({
        target: config.WEB_URL,
        pathRewrite: {
            '^/web/': '/web/'
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

    //web proxy
    // app.use('/web/', getWebProxy());

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