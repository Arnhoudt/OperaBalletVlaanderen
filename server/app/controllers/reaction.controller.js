const Reaction = require('../models/reaction.model.js');

exports.create = async (req, res) => {
  const {actId, title, text} = req.body;
  try {
    const reaction = new Reaction({
      actId: actId,
      userId: req.authUserId,
      title: title,
      text: text
    });
    const r = await reaction.save();
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAll = async (req, res) => {
  try {
    const r = await Reaction.find();
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAllByUserId = async (req, res) => {
  const {userId} = req.params;
  try {
    const r = await Reaction.find({userId: userId});
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  const {actId, title, text} = req.body;
  try {
    const r = await Reaction.findByIdAndUpdate(
      req.params.reactionId,
      {
        $set: {
          actId: actId,
          userId: req.authUserId,
          title: title,
          text: text
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
    const r = await Reaction.deleteOne({_id: req.params.reactionId});
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};
