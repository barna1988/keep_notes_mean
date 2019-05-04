const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

module.exports = mongoose.model('user', userSchema);