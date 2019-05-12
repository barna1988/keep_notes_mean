const request = require('request');
const { userAuthentication } = require('../config').externalAPI;

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

module.exports = checkAuth;