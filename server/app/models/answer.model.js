const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const AnswerSchema = mongoose.Schema(
  {
    questionId: ObjectId,
    answerBool: Boolean,
    answerText: String,
    userId: ObjectId,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Answer', AnswerSchema);
