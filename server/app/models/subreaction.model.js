const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SubreactionSchema = mongoose.Schema(
  {
    reactionId: ObjectId,
    userId: ObjectId,
    title: String,
    text: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Subreaction', SubreactionSchema);
