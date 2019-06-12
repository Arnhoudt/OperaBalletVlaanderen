const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const AnswerSchema = mongoose.Schema(
  {
    question: String,
    answers: [String],
    userId: ObjectId,
    param1: {type: Number, min: 0, max: 50},
    param2: {type: Number, min: 0, max: 50},
    param3: {type: Number, min: 0, max: 50},
    param4: {type: Number, min: 0, max: 50},
    param5: {type: Number, min: 0, max: 50}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Answer', AnswerSchema);
