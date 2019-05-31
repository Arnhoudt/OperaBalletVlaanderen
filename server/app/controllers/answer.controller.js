const Answer = require('../models/answer.model.js');

exports.create = async (req, res) => {
  const {index, value, user} = req.body;
  this.findByUserIdAndQuestionId(user, index).then(Currentanswer => {
    try {
      const answer = new Answer({
        questionId: index,
        value: value,
        userId: user
      });
      console.log('current answer');
      console.log(Currentanswer[0]._id);
      if (Currentanswer.length === 0) {
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
          Currentanswer[0]._id,
          {
            $set: {
              questionId: index,
              value: value,
              userId: user
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
  });
};

exports.findByUserIdAndQuestionId = async (userId, questionId) => {
  try {
    return await Answer.find({userId, questionId});
  } catch (err) {
    console.log(`find by id did not work`);
    console.log(err);
    return `could not complete find by userId and Question id`;
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
