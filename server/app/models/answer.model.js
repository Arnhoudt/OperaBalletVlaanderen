const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const AnswerSchema = mongoose.Schema(
  {
    questionId: ObjectId,
    answerBool: Boolean,
    answerText: String,
    userId: ObjectId,
    createdAt: {type: Date, default: Date.now}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Answer', AnswerSchema);
