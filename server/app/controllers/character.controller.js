const Character = require('../models/character.model.js');

exports.create = async (req, res) => {
  const {name, param1, param2, param3, param4, param5} = req.body;
  try {
    const character = new Character({
      name: name,
      param1: param1,
      param2: param2,
      param3: param3,
      param4: param4,
      param5: param5
    });
    const r = await character.save();
    res.status(200).send(r);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const r = await Character.find();
    res.status(200).send(r);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  const {name, param1, param2, param3, param4, param5} = req.body;
  try {
    const r = await Character.findByIdAndUpdate(
      req.params.characterId,
      {
        $set: {
          name: name,
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
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const r = await Character.deleteOne({_id: req.params.characterId});
    res.status(200).send(r);
  } catch (err) {
    res.status(500).send(err);
  }
};
