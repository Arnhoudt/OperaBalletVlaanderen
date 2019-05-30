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
    character
      .save()
      .then(character => {
        res.send(character);
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
    const characters = await Character.find();
    res.send(characters);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  const {id, name, param1, param2, param3, param4, param5} = req.body;
  try {
    Character.findByIdAndUpdate(
      id,
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
    )
      .then(character => {
        res.send(character);
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
    Character.deleteOne({_id: req.params.id})
      .then(character => {
        res.status(200).send({success: true, data: character});
      })
      .catch(err => {
        res.status(500).send({error: err.todo || 'Error'});
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};
