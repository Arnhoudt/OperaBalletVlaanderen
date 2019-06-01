module.exports = app => {
  const {checkTokenAdmin} = require('../middleware');
  const controller = require('../controllers/act.controller.js');
  app.post('/api/acts/add', checkTokenAdmin, controller.create);
  app.get('/api/acts', controller.findAll);
  app.put('/api/acts/:actId', checkTokenAdmin, controller.update);
  app.delete('/api/acts/:actId', checkTokenAdmin, controller.delete);
};
