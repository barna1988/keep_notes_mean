const log = require('./logging');
const appConfig = require('./config').appConfig;
const notificationsDao = require('./api/v1/notifications/notifications.dao');
const socket = require('./socket');
const async = require('async');

const registerWorker = () => {
  async.forever(
    (next) => {
      doWork();
      //Repeat after the delay
      setTimeout(() => { /* eslint-disable-line no-undef */
        next();
      }, appConfig.sleepDuration)
    },
    (err) => {
      log.error('Error occurred while polling database');
      log.error(err);
    }
  )
}

const doWork = () => {
  log.info('starting process');
  notificationsDao.getNotificationsToProcess((err, notifications) => {
    if(err) {
      log.error('Error occurred while fetching notifications');
      log.error(err);
    }
    log.info('notifications fetched from db');
    if (notifications && notifications.length > 0) {
      log.info('notifications found');
      notifications.map(n => {
        if (IsLessThanCurrentTime(n.remindAt) && !n.isSent) {
          const res = socket.notify(n);
          if(res) {
            notificationsDao.markNotificationSent(n._id)
            .then(res => log.debug(res))
            .catch(err => log.error(err));
          }
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
  registerWorker
};