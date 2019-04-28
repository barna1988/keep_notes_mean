const router = require('express').Router();
const userRoutes = require('./users');

const middleware = require('./auth/auth.middleware');

router.use('/users', userRoutes);
router.post('/auth', middleware);


module.exports = router;