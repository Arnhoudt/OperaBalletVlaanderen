module.exports = app => {
  const controller = require('../controllers/authUser.controller.js');
  app.post('/auth/user/registerRandom', controller.registerRandom);
};
