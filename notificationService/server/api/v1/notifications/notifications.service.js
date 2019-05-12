const dao = require('./notifications.dao');
const log = require('../../../logging');

const notifyUsers = (userId, notificationNotes) => {
  return dao.notifyUers(userId, notificationNotes);
};

const getReminders = (userId) => {
  return dao.getNotificationsForSelf(userId);
};

const addReminder = (userId, notification) => {
  return dao.addNotificationsForUserID(userId, notification);
};

const snoozeReminder = (notificationId, notification) => {
  return dao.updateReminderForNotificationID(notificationId, notification);
};

const dismissReminder = (notificationId) => {
  return dao.deleteReminderForNotificationID(notificationId);
};

const getReminder = (notificationId) => {
  return dao.getReminderForNotificationID(notificationId);
}

module.exports = {
  notifyUsers,
  getReminders,
  addReminder,
  snoozeReminder,
  dismissReminder,
  getReminder
};
