const jwt = require('jsonwebtoken');
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

exports.registerRandom = async (req, res) => {
  try {
    const customId = mongoose.Types.ObjectId();
    const token = jwt.sign({_id: customId, name: `random`}, process.env.SECRET, {
      expiresIn: '24h'
    });
    const parts = token.split('.');
    const signature = parts.splice(2);
    const unregisteredUser = new UnregisteredUser({_id: customId, token});
    const r = await unregisteredUser.save();
    res
      .cookie('token', parts.join('.'), tokenCookie)
      .cookie('signature', signature, signatureCookie)
      .status(200)
      .send(r);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'User niet geregistreerd'
    });
  }
};
