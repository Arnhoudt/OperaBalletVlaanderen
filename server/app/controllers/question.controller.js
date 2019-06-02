const Question = require('../models/question.model.js');

exports.create = async (req, res) => {
  const {
    value,
    param1,
    param2,
    param3,
    param4,
    param5,
    answer1,
    answer2
  } = req.body;
  try {
    const question = new Question({
      value: value,
      param1: param1,
      param2: param2,
      param3: param3,
      param4: param4,
      param5: param5,
      answer1: answer1,
      answer2: answer2
    });
    const r = await question.save();
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAll = async (req, res) => {
  try {
    const r = await Question.find();
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  const {
    value,
    param1,
    param2,
    param3,
    param4,
    param5,
    answer1,
    answer2
  } = req.body;
  try {
    const r = await Question.findByIdAndUpdate(
      req.params.questionId,
      {
        $set: {
          value: value,
          param1: param1,
          param2: param2,
          param3: param3,
          param4: param4,
          param5: param5,
          answer1: answer1,
          answer2: answer2
        }
      },
      {new: true}
    );
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const r = await Question.deleteOne({_id: req.params.questionId});
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};
