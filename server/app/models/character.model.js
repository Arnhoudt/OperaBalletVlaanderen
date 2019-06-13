const mongoose = require('mongoose');

const CharacterSchema = mongoose.Schema(
  {
    name: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Character', CharacterSchema);
