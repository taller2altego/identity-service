module.exports = app => {
  const session = require('../controller/SessionController');
  const logger = require('../../winston');
  const router = require('express').Router();

  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  const logInput = (req, res, next) => {
    logger.info(JSON.stringify(req.query, undefined, 2));
    logger.info(JSON.stringify(req.body, undefined, 2));
    next();
  };

  app.use('/', router);
  router.post('/login', logInput, session.login, handlerResponse);
  router.post('/login/send_token', logInput, session.sendToken, handlerResponse);
  router.post('/token', logInput, session.authentication, handlerResponse);
  router.post('/logout', logInput, session.logout, handlerResponse);
};
