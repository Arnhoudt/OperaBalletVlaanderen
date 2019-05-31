module.exports = app => {
  const {checkTokenAdmin} = require('../middleware');
  const controller = require('../controllers/authAdmin.controller.js');
  app.post('/auth/admin/login', controller.login);
  app.post('/auth/admin/logout', checkTokenAdmin, controller.logout);
  app.post('/auth/admin/register', checkTokenAdmin, controller.register);
};
