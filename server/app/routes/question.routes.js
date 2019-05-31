module.exports = app => {
  const {checkTokenAdmin} = require('../middleware');
  const controller = require('../controllers/question.controller.js');
  app.post('/api/questions/add', checkTokenAdmin, controller.create);
  app.get('/api/questions', controller.findAll);
  app.put('/api/questions/:questionId', checkTokenAdmin, controller.update);
  app.delete('/api/questions/:questionId', checkTokenAdmin, controller.delete);
};
