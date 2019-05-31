const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const unregisteredUserSchema = mongoose.Schema(
  {
    _id: {type: ObjectId, required: true},
    token: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('unregisteredUser', unregisteredUserSchema);
