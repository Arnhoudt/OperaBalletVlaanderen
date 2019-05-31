const Answer = require('../models/answer.model.js');

exports.create = async (req, res) => {
  const {questionId, value, userId} = req.body;
  try {
    const currentAnswer = await Answer.findOne({
      userId: userId,
      questionId: questionId
    });
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
    const answers = await Answer.aggregate([
      {
        $lookup: {
          from: 'questions',
          localField: 'questionId',
          foreignField: '_id',
          as: 'question'
        }
      },
      {
        $project: {
          value: 1,
          question: {value: 1}
        }
      },
      {
        $unwind: '$question'
      }
    ]);
    res.send(answers);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.getAllByUserId = async (req, res) => {
  const {userId} = req.params;
  try {
    const answers = await Answer.find({userId: userId});
    res.send(answers);
  } catch (err) {
    return res.status(500).send(err);
  }
};
