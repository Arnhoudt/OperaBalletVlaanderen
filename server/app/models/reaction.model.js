const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ReactionSchema = mongoose.Schema(
  {
    actId: ObjectId,
    userId: ObjectId,
    title: String,
    text: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Reaction', ReactionSchema);
