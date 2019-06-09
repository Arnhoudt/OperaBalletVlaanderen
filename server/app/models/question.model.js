const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema(
  {
    question: String,
    type: String,
    answers: [String],
    location: mongoose.Schema.Types.Mixed,
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

module.exports = mongoose.model('Question', QuestionSchema);
