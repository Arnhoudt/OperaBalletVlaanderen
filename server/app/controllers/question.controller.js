const Question = require('../models/question.model.js');

exports.create = async (req, res) => {
  const {questionValue, param1, param2, param3, param4, param5} = req.body;
  try {
    const question = new Question({
      question: questionValue,
      param1: param1,
      param2: param2,
      param3: param3,
      param4: param4,
      param5: param5
    });
    question
      .save()
      .then(question => {
        res.send(question);
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
    const questions = await Question.find();
    res.send(questions);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  const {question, param1, param2, param3, param4, param5} = req.body;
  try {
    Question.findByIdAndUpdate(
      req.params.questionId,
      {
        $set: {
          question: question,
          param1: param1,
          param2: param2,
          param3: param3,
          param4: param4,
          param5: param5
        }
      },
      {new: true}
    )
      .then(question => {
        res.send(question);
      })
      .catch(err => {
        res.status(500).send({error: err.todo || 'Error'});
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    Question.deleteOne({_id: req.params.questionId})
      .then(question => {
        res.status(200).send({success: true, data: question});
      })
      .catch(err => {
        res.status(500).send({error: err.todo || 'Error'});
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};
