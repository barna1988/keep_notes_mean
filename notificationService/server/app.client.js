const log = require('./logging');
const appConfig = require('./config').appConfig;
const notificationsDao = require('./api/v1/notifications/notifications.dao');
const socket = require('./socket');
const async = require('async');

const registerSocket = () => {
  async.forever(
    (next) => { //Function to repeated
      processNotifications();
      //Repeat after the delay
      setTimeout(() => { 
        next();
      }, appConfig.sleepDuration)
    },
    (err) => {
      log.error('Error occurred while polling database');
      log.error(err);
    }
  )
}

const processNotifications = () => {
  log.info('starting notification process');

  notificationsDao.getAllNotificationsToProcess((err, notifications) => {
    if(err) {
      log.error('Error occurred while fetching notifications', err);
    }
    
    if (notifications && notifications.length > 0) {
      //log.info('notifications found - count = ' , notifications.length);
      
      notifications.map(n => {
        if (IsLessThanCurrentTime(n.remindAt) && !n.isSent) {

          log.info('notification sent for note.');
          const response = socket.sendNotification(n);
          if(response) {
            notificationsDao.markNotificationSentForNotificationID(n.notificationID)
            .then(res => log.debug(res))
            .catch(err => log.error(err));
          }
        } else {
          log.info('notification not sent for note.');
        }
      });
    }
  });

  log.info('process completed, waiting for next round ...');
}

const IsLessThanCurrentTime = (remindAt) => {
  log.debug('checking datetime: now: ' + new Date().toISOString() + 
    ' and reminder: ' + new Date(remindAt).toISOString());
  return new Date() >= new Date(remindAt);
}

module.exports = {
  registerSocket
};