module.exports = app => {
  const {checkToken} = require('../middleware');
  const controller = require('../controllers/character.controller.js');
  app.post('/api/characters/add', checkToken, controller.create);
  app.get('/api/characters', checkToken, controller.findAll);
  app.put('/api/characters/:characterId', checkToken, controller.update);
  app.delete('/api/characters/:characterId', checkToken, controller.delete);
};
