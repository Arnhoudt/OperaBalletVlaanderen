module.exports = app => {
  const {checkToken} = require('../middleware');
  const controller = require('../controllers/authUser.controller.js');
  app.post('/auth/user/login', controller.login);
  app.post('/auth/user/logout', controller.logout);
  app.post('/auth/user/register', checkToken, controller.register);
  app.post('/auth/user/registerRandom', controller.registerRandom);
  app.post('/auth/user/delete', controller.delete);
};
