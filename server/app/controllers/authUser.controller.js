const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const UnregisteredUser = require('../models/unregisteredUser.model.js');
const mongoose = require('mongoose');

const tokenCookie = {
  maxAge: 1800000,
  sameSite: true
};
const signatureCookie = {
  maxAge: 86400000,
  httpOnly: true,
  sameSite: true
};

exports.login = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({error: 'We hebben je email en wachtwoord nodig'});
  }
  try {
    const emailLowerCase = email.toLowerCase();
    const user = await User.findOne({email: emailLowerCase});
    if (!user) {
      res.status(401).send({error: 'Email of wachtwoord is niet juist'});
    } else {
      const isPasswordCorrect = await user.validPassword(password);
      if (isPasswordCorrect) {
        const {_id, name, roles} = user;
        const token = jwt.sign({_id, name, roles}, process.env.SECRET, {
          expiresIn: '24h'
        });
        const parts = token.split('.');
        const signature = parts.splice(2);
        res
          .cookie('tokenUser', parts.join('.'), tokenCookie)
          .cookie('signatureUser', signature, signatureCookie)
          .status(200)
          .send({
            success: true,
            message: 'Succesvol ingelogd'
          });
      } else {
        res.status(401).send({
          message: 'Email of wachtwoord is niet juist'
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .send({message: 'Internal error, please try again', error});
  }
};

exports.logout = (req, res) => {
  res
    .clearCookie('tokenUser', tokenCookie)
    .clearCookie('signatureUser', signatureCookie)
    .sendStatus(200);
};

exports.register = async (req, res) => {
  const {email, password, name} = req.body;
  const user = new User({_id: req.authUserId, email, password, name});
  user.save(async err => {
    if (err) {
      res.status(500).send({
        success: false,
        message: 'Email is al in gebruik'
      });
    } else {
      await UnregisteredUser.deleteOne({_id: req.authUserId});
      res
        .clearCookie('token', tokenCookie)
        .clearCookie('signature', signatureCookie)
        .status(200)
        .send({
          success: true,
          message: 'Welkom bij obv dashboard!'
        });
    }
  });
};

exports.registerRandom = async (req, res) => {
  const customId = mongoose.Types.ObjectId();
  const token = jwt.sign(
    {_id: customId, name: `random`},
    process.env.SECRET,
    {
      expiresIn: '24h'
    }
  );
  const parts = token.split('.');
  const signature = parts.splice(2);
  const unregisteredUser = new UnregisteredUser({_id: customId, token});
  unregisteredUser.save(err => {
    if (err) {
      res.status(500).send({
        success: false,
        message: 'User niet geregistreerd'
      });
    } else {
      res
        .cookie('token', parts.join('.'), tokenCookie)
        .cookie('signature', signature, signatureCookie)
        .status(200)
        .send({
          success: true,
          message: 'Succesvol geregistreerd'
        });
    }
  });
};

exports.delete = async (req, res) => {
  try {
    User.deleteOne({_id: req.authUserId})
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
