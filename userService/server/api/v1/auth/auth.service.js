const jwt = require('jsonwebtoken');

const signToken = (payload, secret, expireIn, cb) => {
    jwt.sign(payload, secret, { expiresIn: expireIn }, (err, token) => {
      if(err) return cb(err.message);
      return cb(null, token);
    });
};

const verifyToken = (token, secret, cb) => {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) return cb(err.message);
      return cb(null, decoded);
    });
};

module.exports = {
    signToken,
    verifyToken
};