const Character = require('../models/character.model.js');

exports.create = async (req, res) => {
  const {name} = req.body;
  try {
    const character = new Character({
      name: name
    });
    const r = await character.save();
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAll = async (req, res) => {
  try {
    const r = await Character.find();
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findById = async (req, res) => {
  try {
    const r = await Character.findOne({_id: req.params.characterId});
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  const {name} = req.body;
  try {
    const r = await Character.findByIdAndUpdate(
      req.params.characterId,
      {
        $set: {
          name: name
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
    const r = await Character.deleteOne({_id: req.params.characterId});
    res.status(200).send(r);
  } catch (error) {
    res.status(500).send(error);
  }
};
