module.exports = app => {
  const {
    checkTokenAdmin,
    checkTokenUserRandom,
    checkTokenUser
  } = require('../middleware');

  const controller = require('../controllers/answer.controller.js');
  app.post('/api/answers/add', controller.create);
  app.get('/api/answers', checkTokenAdmin, controller.findAll);
  app.get(
    '/api/answers/user',
    checkTokenUserRandom,
    controller.findAllByUserId
  );
  app.delete('/api/answers/:answerId', checkTokenUser, controller.delete);
};
