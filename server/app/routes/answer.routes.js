module.exports = app => {
  const {checkToken} = require('../middleware');
  const controller = require('../controllers/answer.controller.js');
  app.post('/api/answers/add', controller.create);
  app.get('/api/answers', checkToken, controller.findAll);
};
