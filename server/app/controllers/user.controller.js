const User = require('../models/user.model.js');

exports.create = async (req, res) => {
  const {userToken} = req.body;
  try {
    const user = new User({
      userToken: userToken
    });
    user
      .save()
      .then(user => {
        res.send(user);
      })
      .catch(err => {
        res.status(500).send({error: err.todo || 'Error'});
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.findOneByToken = async (req, res) => {
  try {
    const user = await User.findOne({userToken: req.params.userToken});
    res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    User.remove({_id: req.params.id})
      .then(user => {
        res.status(200).send({success: true, data: user});
      })
      .catch(err => {
        res.status(500).send({error: err.todo || 'Error'});
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};
