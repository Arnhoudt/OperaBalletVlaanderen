const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userToken: String,
  ipAdres: Number
});

module.exports = mongoose.model('User', UserSchema);
