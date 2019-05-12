const svc = require('./notifications.service');

const notifyUsers = (req, res) => {

  try {
    const userId = req.userId;
    const notificationWithNotes = req.body;
    svc.notifyUsers(userId, notificationWithNotes)
      .then(response => {
        res.status(response.status).send(response);
      })
      .catch(err => {
        res.status(err.status).send(err);
      });
  } catch (error) {
    log.error(error);
    res.status(error.status).send(error);
  }
}

const getReminders = (req, res) => {

  try {
    const userId = req.userData.userId;
    svc.getReminders(userId)
      .then(response => {
        res.status(response.status).send(response.notifications);
      })
      .catch(err => {
        res.status(err.status).send(err);
      });
  } catch (error) {
    log.error(error);
    res.status(error.status).send(error);
  }
}

const addReminder = (req, res) => {

  try {
    const userId = req.userId;
    const notification = req.body;
    svc.addReminder(userId, notification)
      .then(response => {
        res.status(response.status).send(response);
      })
      .catch(err => {
        res.status(err.status).send(err);
      });
  } catch (error) {
    log.error(error);
    res.status(error.status).send(error);
  }
}

const snoozeReminder = (req, res) => {
  try {
    const notificationId = req.params.reminderId;
    const notification = req.body;
    svc.snoozeReminder(notificationId, notification)
      .then(response => {
        res.status(response.status).send(response);
      })
      .catch(err => {
        res.status(err.status).send(err);
      });
  } catch (error) {
    log.error(error);
    res.status(error.status).send(error);
  }
}

const dismissReminder = (req, res) => {
  try {
    const notificationId = req.params.reminderId;
    svc.dismissReminder(notificationId)
      .then(response => {
        res.status(response.status).send(response);
      })
      .catch(err => {
        res.status(err.status).send(err);
      });
  } catch (error) {
    log.error(error);
    res.status(error.status).send(error);
  }
}

const getReminder = (req, res) => {
  try {
    const notificationId = req.params.reminderId;
    svc.getReminder(notificationId)
      .then(response => {
        res.status(response.status).send(response);
      })
      .catch(err => {
        res.status(err.status).send(err);
      });
  } catch (error) {
    log.error(error);
    res.status(error.status).send(error);
  }
}

module.exports = {
  notifyUsers,
  getReminders,
  addReminder,
  snoozeReminder,
  dismissReminder,
  getReminder
}