const Answer = require('../models/answer.model.js');

exports.create = async (req, res) => {
  const {questionId, value, userId} = req.body;
  try {
    const currentAnswer = await Answer.findOne({userId, questionId});
    if (!currentAnswer) {
      const answer = new Answer({
        questionId: questionId,
        value: value,
        userId: userId
      });
      answer
        .save()
        .then(answer => {
          res.send(answer);
        })
        .catch(err => {
          res.status(500).send({error: err || 'Error'});
        });
    } else {
      Answer.findByIdAndUpdate(
        currentAnswer._id,
        {
          $set: {
            questionId: questionId,
            value: value,
            userId: userId
          }
        },
        {new: true}
      )
        .then(answer => {
          res.send(answer);
        })
        .catch(err => {
          res.status(500).send({error: err || 'Error'});
        });
    }
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
