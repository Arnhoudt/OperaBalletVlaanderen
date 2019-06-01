module.exports = app => {
  const {checkTokenAdmin, checkTokenUserRandom} = require('../middleware');

  const controller = require('../controllers/answer.controller.js');
  app.post('/api/answers/add', controller.create);
  app.get('/api/answers', checkTokenAdmin, controller.findAll);
  app.get(
    '/api/answers/byUser',
    checkTokenUserRandom,
    controller.getAllByUserId
  );
};
