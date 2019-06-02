module.exports = app => {
  const {checkTokenAdmin} = require('../middleware');
  const controller = require('../controllers/character.controller.js');
  app.post('/api/characters/add', checkTokenAdmin, controller.create);
  app.get('/api/characters', controller.findAll);
  app.get('/api/characters/:characterId', controller.findById);
  app.put('/api/characters/:characterId', checkTokenAdmin, controller.update);
  app.delete(
    '/api/characters/:characterId',
    checkTokenAdmin,
    controller.delete
  );
};
