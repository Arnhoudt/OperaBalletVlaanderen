const Answer = require('../models/answer.model.js');

exports.create = async (req, res) => {
  const {question, answer, userId, param1, param2, param3} = req.body;
  try {
    const currentAnswer = await Answer.findOne({
      userId: userId,
      question: question
    });
    if (!currentAnswer) {
      const answerD = new Answer({
        question: question,
        answer: answer,
        userId: userId,
        param1: param1,
        param2: param2,
        param3: param3
      });
      const r = await answerD.save();
      res.status(200).send(r);
    } else {
      const r = await Answer.findByIdAndUpdate(
        currentAnswer._id,
        {
          $set: {
            question: question,
            answer: answer,
            userId: userId,
            param1: param1,
            param2: param2,
            param3: param3
          }
        },
        {new: true}
      );
      res.status(200).send(r);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAll = async (req, res) => {
  try {
    const r = await Answer.find();
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAllByUserId = async (req, res) => {
  try {
    const r = await Answer.find({userId: req.authUserId});
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const r = await Answer.deleteOne({_id: req.params.answerId});
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};
