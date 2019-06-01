const Act = require('../models/act.model.js');

exports.create = async (req, res) => {
  const {
    name,
    spotifyPlaylist,
    param1,
    param2,
    param3,
    param4,
    param5
  } = req.body;
  try {
    const act = new Act({
      name: name,
      spotifyPlaylist: spotifyPlaylist,
      param1: param1,
      param2: param2,
      param3: param3,
      param4: param4,
      param5: param5
    });
    act
      .save()
      .then(act => {
        res.send(act);
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
    const acts = await Act.find();
    res.send(acts);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.findById = async (req, res) => {
  try {
    const act = await Act.findOne({_id: req.params.actId});
    res.send(act);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  const {
    name,
    spotifyPlaylist,
    param1,
    param2,
    param3,
    param4,
    param5
  } = req.body;
  try {
    Act.findByIdAndUpdate(
      req.params.actId,
      {
        $set: {
          name: name,
          spotifyPlaylist: spotifyPlaylist,
          param1: param1,
          param2: param2,
          param3: param3,
          param4: param4,
          param5: param5
        }
      },
      {new: true}
    )
      .then(act => {
        res.send(act);
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
    Act.deleteOne({_id: req.params.actId})
      .then(act => {
        res.status(200).send({success: true, data: act});
      })
      .catch(err => {
        res.status(500).send({error: err.todo || 'Error'});
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};
