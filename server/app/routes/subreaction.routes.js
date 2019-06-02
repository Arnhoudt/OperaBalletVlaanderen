module.exports = app => {
  const {checkTokenUser} = require('../middleware');
  const controller = require('../controllers/subreaction.controller.js');
  app.post('/api/subreactions/add', checkTokenUser, controller.create);
  app.get('/api/subreactions', controller.findAll);
  app.get('/api/subreactions/:reactionId', controller.findAllByReactionId);
  app.get('/api/subreactions/user/:userId', controller.findAllByUserId);
  app.put(
    '/api/subreactions/:subreactionId',
    checkTokenUser,
    controller.update
  );
  app.delete(
    '/api/subreactions/:subreactionId',
    checkTokenUser,
    controller.delete
  );
};
