module.exports = app => {
  const session = require('../controller/SessionController');
  const router = require('express').Router();

  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  app.use('/login', router);
  router.post('/', session.login, handlerResponse);
  router.get('/:token', session.isValid, handlerResponse);

  app.use('/logout', router);
  router.post('/', session.logout, handlerResponse);
};
