module.exports = app => {
  const {checkToken} = require('../middleware');
  const controller = require('../controllers/user.controller.js');
  app.post('/api/users/add', checkToken, controller.create);
  app.get('/api/users/:userId', checkToken, controller.findOneByToken);
  app.delete('/api/users/:userId', checkToken, controller.delete);
};
