module.exports = app => {
  const {checkToken} = require('../middleware');
  const controller = require('../controllers/question.controller.js');
  app.post('/api/questions/add', checkToken, controller.create);
  app.get('/api/questions', checkToken, controller.findAll);
  app.put('/api/questions/:questionId', checkToken, controller.update);
  app.delete('/api/questions/:questionId', checkToken, controller.delete);
};
