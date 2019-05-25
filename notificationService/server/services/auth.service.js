const request = require('request');
const { userAuthentication } = require('../config').externalAPI;

const jwt = require('jsonwebtoken');
const log = require('../logging');

const checkAuth = (req, res, next) => {

    const authHeader = req.get('Authorization');

    //log.info('authHeader : ', authHeader);
    
    if (!authHeader) {
      res.status(403).send({
        isAutheticated : false,
        message : 'Not authenticated'
      }); return;
    }
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      res.status(403).send({
        isAutheticated : false,
        message : 'Unauthorised'
      }); return;
    }

    request.post(userAuthentication.URL, {
        'auth': {
            'bearer': token
        }
    }, (error, response, body) => {

        log.info('body in auth svc', body);

        if(!error && response.statusCode === 200) {
            log.info('authenticated');
            next();
        } else {
            log.info('error in notes auth svc', error);
            res.status(403).send({
                isAutheticated : false,
                message : 'Unauthorised'
              });
        }
        
    });
};

const signToken = (payload, secret, expireIn, cb) => {
    jwt.sign(payload, secret, { expiresIn: expireIn }, (err, token) => {
        if (err) return cb(err.message);
        return cb(null, token);
    });
};

const verifyToken = (token, secret, cb) => {
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return cb(err.message);
        return cb(null, decoded);
    });
};

module.exports = {
    checkAuth,
    signToken,
    verifyToken
};