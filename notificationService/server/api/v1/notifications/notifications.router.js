const router = require('express').Router();
const ctrl = require('./notifications.controller');
const checkAuthentication = require('../../../services');

router.use(checkAuthentication); //Notes will be accessible only if User is authenticated

router.post('/', ctrl.notifyUsers);
router.get('/reminders', ctrl.getReminders);
router.post('/reminders', ctrl.addReminder);
router.get('/reminders/:reminderId', ctrl.getReminder);
router.put('/reminders/:reminderId', ctrl.snoozeReminder);
router.delete('/reminders/:reminderId', ctrl.dismissReminder);

module.exports = router;