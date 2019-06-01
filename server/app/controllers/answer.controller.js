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
      const r = await answer.save();
      res.status(200).send(r);
    } else {
      const r = await Answer.findByIdAndUpdate(
        currentAnswer._id,
        {
          $set: {
            questionId: questionId,
            value: value,
            userId: userId
          }
        },
        {new: true}
      );
      res.status(200).send(r);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const r = await Answer.aggregate([
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
    res.status(200).send(r);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAllByUserId = async (req, res) => {
  try {
    const r = await Answer.find({userId: req.authUserId});
    res.status(200).send(r);
  } catch (err) {
    res.status(500).send(err);
  }
};
