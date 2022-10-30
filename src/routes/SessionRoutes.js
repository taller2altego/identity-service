module.exports = app => {
  const session = require('../controller/SessionController');
  const router = require('express').Router();

  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  app.use('/', router);
  router.post('/login', session.login, handlerResponse);
  router.post('/login/send_token', session.sendToken, handlerResponse);
  router.post('/token', session.authentication, handlerResponse);
  router.post('/logout', session.logout, handlerResponse);
};