const Act = require('../models/act.model.js');

exports.create = async (req, res) => {
  const {name, spotifyPlaylist, param1, param2, param3, param4, param5} = req.body;
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
    const r = await act.save();
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAll = async (req, res) => {
  try {
    const r = await Act.find();
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findById = async (req, res) => {
  try {
    const r = await Act.findOne({_id: req.params.actId});
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  const {name, spotifyPlaylist, param1, param2, param3, param4, param5} = req.body;
  try {
    const r = await Act.findByIdAndUpdate(
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
    );
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const r = await Act.deleteOne({_id: req.params.actId});
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};
