const NotificationModel = require('./notifications.entity');
const log = require('../../../logging');

const notifyUers = (userId, notificationNotes) => {
  return new Promise((resolve, reject) => {
    log.info('adding notification');

    try {
      const notificationsToAdd = notificationNotes.notes.map(n => {
        return new NotificationModel({
          userId: userId,
          userName: notificationNotes.userName,
          isReminded: false,
          remindAt: new Date().toISOString(),
          self: false,
          note: n
        });
      });

      NotificationModel.insertMany(notificationsToAdd, (err, savedNotifications) => {
        if (err) throw err;
        log.info('notifications saved : ', savedNotifications);

        resolve({
          message: 'notifications added to share',
          status: 201,
          notifications: savedNotifications
        });

      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to notify due to internal error', status: 500 });
    }
  });
};

const addNotificationsForUserID = (userId, notification) => {
  return new Promise((resolve, reject) => {
    log.info('adding notification/ adding reminder');

    try {
      const notificationToAdd = new NotificationModel({
        userId: userId,
        userName: notification.userName,
        isReminded: false,
        remindAt: notification.remindAt,
        note: notification.note
      });

      notificationToAdd.save((err, savedNotification) => {
        if (err) throw err;
        log.info('notification saved : ', savedNotification);
        resolve({
          message: 'notification added',
          status: 201,
          notification: savedNotification
        });

      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to notify due to internal error', status: 500 });
    }
  });
};

const getNotificationsForSelf = (userId) => {
  return new Promise((resolve, reject) => {
    log.info('fetching notification/reminder for userid');

    try {
      const query = {
        userId: userId
      };

      NotificationModel.find(query, (err, notificationsInDb) => {
        if (err) throw err;
        const notifications = notificationsInDb.filter(n => n.self);
        log.info('notification found and returning - ', notifications);

        resolve({
          message: 'notification found',
          status: 200,
          notifications: notifications
        });

      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to get reminders/notifications  due to internal error', status: 500 });
    }
  });
};

const updateReminderForNotificationID = (notificationId, notification) => {
  return new Promise((resolve, reject) => {
    log.info('updating reminder for notificationId : ', notificationId);

    try {
      const query = {
        _id: notificationId
      };

      const updateData = {
        remindAt: notification.remindAt,
        isSent: false
      }
  
      NotificationModel.findOneAndUpdate(query, updateData, (err, savedNotification) => {
        if(err) throw err;
        log.info('reminder updated : ', savedNotification);
        
        resolve({ 
          message: 'reminder updated', 
          status: 200, 
          notification: savedNotification 
        });

      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to update due to internal error', status: 500 });
    }
  });
};

const deleteReminderForNotificationID = (notificationId) => {
  return new Promise((resolve, reject) => {
    log.info('deleting notification/reminder for id - ', notificationId);

    try {  
      NotificationModel.deleteOne({ _id: notificationId }, (err) => {
        if(err) throw err;
        log.info('reminder deleted');
        resolve({ 
          message: 'reminder dismissed', 
          status: 200 
        });

      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to delete due to internal error', status: 500 });
    }
  });
};

const markNotificationSentForNotificationID = (notificationId) => {
  return new Promise((resolve, reject) => {
    log.info('mark notification/reminder sent for id - ', notificationId);

    try {
      const query = {
        _id: notificationId
      };

      const updateData = {
        isSent: true
      };
  
      NotificationModel.findOneAndUpdate(query, updateData, (err, savedNotification) => {
        if(err) throw err;
        log.info('notification marked sent - ', savedNotification);

        resolve({ 
          message: 'reminder updated', 
          status: 200, 
          notification: savedNotification 
        });

      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to update due to internal error', status: 500 });
    }
  });
};

const getAllNotificationsToProcess = (callback) => {
  log.info('getting all notifications to process');
  NotificationModel.find()
    .exec(callback);
};

const getReminderForNotificationID = (notificationId) => {
  return new Promise((resolve, reject) => {
    log.info('fetching notification/reminder for notificationId : ', notificationId);

    try {
      const query = {
        _id: notificationId
      };

      NotificationModel.find(query, (err, notifications) => {
        if (err) throw err;
        log.info('notification found and returning - ', notifications);

        resolve({
          message: 'notification found',
          status: 200,
          notifications: notifications
        });

      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to get reminders/notifications  due to internal error', status: 500 });
    }
  });
};

module.exports = {
  notifyUers,
  addNotificationsForUserID,
  getNotificationsForSelf,
  updateReminderForNotificationID,
  deleteReminderForNotificationID,
  markNotificationSentForNotificationID,
  getAllNotificationsToProcess,
  getReminderForNotificationID
}