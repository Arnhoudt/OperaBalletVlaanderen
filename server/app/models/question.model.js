const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema(
  {
    value: String,
    param1: {type: Number, min: 0, max: 100},
    param2: {type: Number, min: 0, max: 100},
    param3: {type: Number, min: 0, max: 100},
    param4: {type: Number, min: 0, max: 100},
    param5: {type: Number, min: 0, max: 100},
    answer1: String,
    answer2: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Question', QuestionSchema);
