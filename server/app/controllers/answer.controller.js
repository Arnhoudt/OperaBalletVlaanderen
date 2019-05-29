const Answer = require('../models/answer.model.js');

exports.create = async (req, res) => {
  const {questionId, answerBool, answerText, userId} = req.body;
  try {
    const answer = new Answer({
      questionId: questionId,
      answerBool: answerBool,
      answerText: answerText,
      userId: userId
    });
    answer
      .save()
      .then(answer => {
        res.send(answer);
      })
      .catch(err => {
        res.status(500).send({error: err.todo || 'Error'});
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const answers = await Answer.find();
    res.send(answers);
  } catch (err) {
    return res.status(500).send(err);
  }
};
