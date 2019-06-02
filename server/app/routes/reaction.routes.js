module.exports = app => {
  const {checkTokenUser} = require('../middleware');
  const controller = require('../controllers/reaction.controller.js');
  app.post('/api/reactions/add', checkTokenUser, controller.create);
  app.get('/api/reactions', controller.findAll);
  app.get('/api/reactions/user/:userId', controller.findAllByUserId);
  app.put('/api/reactions/:reactionId', checkTokenUser, controller.update);
  app.delete('/api/reactions/:reactionId', checkTokenUser, controller.delete);
};
