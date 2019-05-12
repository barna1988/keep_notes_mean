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
  // groupName: {
  //   type: String,
  //   enum: ['group1', 'group2', 'group3'],
  //   default: 'group1'
  // }
});

module.exports = mongoose.model('user', userSchema);