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
