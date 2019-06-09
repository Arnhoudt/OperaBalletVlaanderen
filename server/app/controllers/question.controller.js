const Question = require('../models/question.model.js');

exports.create = async (req, res) => {
  const {question, type, answers, location, param1, param2, param3, param4, param5} = req.body;
  try {
    const questionValue = new Question({
      question: question,
      type: type,
      answers: answers,
      location: location,
      param1: param1,
      param2: param2,
      param3: param3,
      param4: param4,
      param5: param5
    });
    const r = await questionValue.save();
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
  const {question, type, answers, location, param1, param2, param3, param4, param5} = req.body;
  try {
    const r = await Question.findByIdAndUpdate(
      req.params.questionId,
      {
        $set: {
          question: question,
          type: type,
          answers: answers,
          location: location,
          param1: param1,
          param2: param2,
          param3: param3,
          param4: param4,
          param5: param5
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
