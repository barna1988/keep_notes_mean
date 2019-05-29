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
      //console.log('token not found');
      res.status(403).send({
        isAuthenticated: false,
        message: 'Unauthorised'
      });
    } else {
      //console.log('token found');
      authService.verifyToken(token, authConfig.secret, (err, decoded) => {
        //console.log('token in auth middleware b4 verify - ', token);
        //console.log('err in auth middleware verify - ' , err);
        if (err) {
          //console.log('token found + error');
          res.status(403).send({
            isAuthenticated: false,
            message: 'Invalid token'
          });
        } else {
          //console.log('token found + success');
          req.userData = decoded;
          log.info('User authenticated');
    
          //next();
    
          res.status(200).send({
            isAuthenticated: true,
            message: 'User Authenticated'
          });
        }
        
  
  
      });
    }

    
  } catch (err) {
    log.error(err);
    res.status(403).send('Error occurred in authentication. Error: ', err);
  }
}

module.exports = checkAuthentication;