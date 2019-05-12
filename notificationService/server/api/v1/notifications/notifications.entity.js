const mongoose = require('mongoose');

let notificationsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  remindAt: {
    type: String,
    default: new Date().toISOString(),
    required: true
  },
  note: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false
    }
  },
  self: {
    type: Boolean,
    required: true,
    default: true
  },
  isSent: {
    type: Boolean,
    default: false
  }
});

notificationsSchema.methods.findByUserId = function (callback) {
  return this.model('notification')
    .find({ userId: this.userId })
    .exec(callback);
};

notificationsSchema.methods.findAndUpdateNotification = function (callback) {
  return this.model('notification').findOneAndUpdate(
    { _id: this._id },
    { $set: {
        remindAt: this.remindAt,
        isSent: this.isSent
      }
    },
    { new: true },
    callback);
};

notificationsSchema.methods.markNotificationSent = function (callback) {
  return this.model('notification').findOneAndUpdate(
    { _id: this._id },
    { $set: {
        isSent: true
      }
    },
    { new: true },
    callback);
};

module.exports = mongoose.model('notification', notificationsSchema);
