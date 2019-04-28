const router = require('express').Router();
const userRoutes = require('./users');
const { authRouter } = require('./auth');

router.use('/users', userRoutes);
router.use('/auth', authRouter);

module.exports = router;