const authService = require('./auth.service');
const authConfig = require('../../../config').authConfig;
const log = require('../../../logging');

const checkAuthentication = (req, res, next) => {
  try {
    log.info('Authentication check');
    const authHeader = req.get('Authorization');
    if(!authHeader) {
      res.status(403).send('Not authenticated'); return;
    }
    const token = authHeader.replace('Bearer ', '');
    if(!token) { 
      res.status(403).send('Unauthorized'); return;
    }
    authService.verifyToken(token, authConfig.secret, (err, decoded) => {
      if(err) {
        res.status(403).send('invalid token'); return;
      }
      req.userData = decoded;
      log.info('User authenticated');
      next();
    });
  } catch (err) {
    log.error(err);
    res.status(403).send('Error occurred in authentication. Error: ', err); return;
  }
}

module.exports = checkAuthentication;