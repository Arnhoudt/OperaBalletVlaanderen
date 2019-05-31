module.exports = app => {
  const {checkTokenAdmin} = require('../middleware');
  const controller = require('../controllers/answer.controller.js');
  app.post('/api/answers/add', controller.create);
  app.get('/api/answers', checkTokenAdmin, controller.findAll);
  //app.get('/api/answers/:id',checkTokenUser, controller.getByUserId);
};
