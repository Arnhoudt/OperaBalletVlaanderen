module.exports = app => {
  const {checkTokenUser} = require('../middleware');
  const controller = require('../controllers/answer.controller.js');
  app.post('/api/answers/add', controller.create);
  app.get('/api/answers', checkTokenUser, controller.findAll);
};
