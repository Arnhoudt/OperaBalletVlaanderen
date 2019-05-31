const jwt = require('jsonwebtoken');

const checkTokenAdmin = (req, res, next) => {
  const {tokenAdmin, signatureAdmin} = req.cookies;
  if (!tokenAdmin) {
    res.status(401).send({
      success: false,
      message: 'Auth token is not supplied'
    });
  } else {
    jwt.verify(
      `${tokenAdmin}.${signatureAdmin}`,
      process.env.SECRET,
      (err, decoded) => {
        if (err) {
          res.status(401).send({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.authUserId = decoded._id;
          next();
        }
      }
    );
  }
};

const checkToken = (req, res, next) => {
  const {token, signature} = req.cookies;
  if (!token) {
    res.status(401).send({
      success: false,
      message: 'Auth token is not supplied'
    });
  } else {
    jwt.verify(`${token}.${signature}`, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.authUserId = decoded._id;
        next();
      }
    });
  }
};

const checkTokenUser = (req, res, next) => {
  const {tokenUser, signatureUser} = req.cookies;
  if (!tokenUser) {
    res.status(401).send({
      success: false,
      message: 'Auth token is not supplied'
    });
  } else {
    jwt.verify(
      `${tokenUser}.${signatureUser}`,
      process.env.SECRET,
      (err, decoded) => {
        if (err) {
          res.status(401).send({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.authUserId = decoded._id;
          next();
        }
      }
    );
  }
};

module.exports = {checkTokenAdmin, checkToken, checkTokenUser};
