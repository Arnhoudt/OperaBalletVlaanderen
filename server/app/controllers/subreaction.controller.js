const Subreaction = require('../models/subreaction.model.js');

exports.create = async (req, res) => {
  const {reactionId, title, text} = req.body;
  try {
    const subreaction = new Subreaction({
      reactionId: reactionId,
      userId: req.authUserId,
      title: title,
      text: text
    });
    const r = await subreaction.save();
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAll = async (req, res) => {
  try {
    const r = await Subreaction.find();
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAllByReactionId = async (req, res) => {
  const {reactionId} = req.params;
  try {
    const r = await Subreaction.find({reactionId: reactionId});
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAllByUserId = async (req, res) => {
  const {userId} = req.params;
  try {
    const r = await Subreaction.find({userId: userId});
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  const {reactionId, title, text} = req.body;
  try {
    const r = await Subreaction.findByIdAndUpdate(
      req.params.subreactionId,
      {
        $set: {
          reactionId: reactionId,
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
    const r = await Subreaction.deleteOne({_id: req.params.subreactionId});
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};
