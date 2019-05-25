const authService = require('./auth.service');
const authConfig = require('../../../config').authConfig;
const log = require('../../../logging');

const checkAuthentication = (req, res, next) => {
  try {
    log.info('Authentication check');
    const authHeader = req.get('Authorization');

    //log.info('authHeader : ', authHeader);

    if (!authHeader) {
      res.status(403).send({
        isAuthenticated: false,
        message: 'Not authenticated'
      });
    }
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      res.status(403).send({
        isAuthenticated: false,
        message: 'Unauthorised'
      });
    }
    authService.verifyToken(token, authConfig.secret, (err, decoded) => {
      if (err) {
        res.status(403).send({
          isAuthenticated: false,
          message: 'Invalid token'
        });
      }
      req.userData = decoded;
      log.info('User authenticated');

      //next();

      res.status(200).send({
        isAuthenticated: true,
        message: 'User Authenticated'
      });


    });
  } catch (err) {
    log.error(err);
    res.status(403).send('Error occurred in authentication. Error: ', err); return;
  }
}

module.exports = checkAuthentication;