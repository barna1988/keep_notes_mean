const router = require('express').Router();
const middleware = require('./auth.middleware');

router.post('/checkAuthetication', middleware);

module.exports = router;