const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model.js');

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
      .send({error: 'We hebben je email of wachtwoord nodig'});
  }
  try {
    const emailLowerCase = email.toLowerCase();
    const user = await Admin.findOne({email: emailLowerCase});
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
          .cookie('token', parts.join('.'), tokenCookie)
          .cookie('signature', signature, signatureCookie)
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
    .clearCookie('token', tokenCookie)
    .clearCookie('signature', signatureCookie)
    .sendStatus(200);
};

exports.register = async (req, res) => {
  const admin = await Admin.findOne({_id: req.authUserId});
  if (admin) {
    const {email, password, name} = req.body;
    const user = new Admin({email, password, name});
    user.save(err => {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'Email is al in gebruik'
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'Welkom bij obv dashboard!'
        });
      }
    });
  }
};
