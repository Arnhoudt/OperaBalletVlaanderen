const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const AnswerSchema = mongoose.Schema(
  {
    questionId: Number,
    value: Boolean,
    userId: Number,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Answer', AnswerSchema);
