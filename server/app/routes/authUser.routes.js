module.exports = app => {
  const {checkTokenIfEmptyGenerate, checkTokenUser} = require('../middleware');
  const controller = require('../controllers/authUser.controller.js');
  app.post('/auth/user/login', controller.login);
  app.post('/auth/user/logout', checkTokenUser, controller.logout);
  app.post('/auth/user/register', checkTokenIfEmptyGenerate, controller.register);
  app.post('/auth/user/registerRandom', controller.registerRandom);
  app.delete('/auth/user/delete', checkTokenUser, controller.delete);
};
