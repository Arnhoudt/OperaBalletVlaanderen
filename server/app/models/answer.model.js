const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const AnswerSchema = mongoose.Schema(
  {
    question: String,
    answer: String,
    userId: ObjectId,
    param1: {type: Number, min: 0, max: 10},
    param2: {type: Number, min: 0, max: 10},
    param3: {type: Number, min: 0, max: 10}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Answer', AnswerSchema);
