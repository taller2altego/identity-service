const router = require('express').Router();

const session = require('../controller/SessionController');
const logger = require('../../winston');

module.exports = app => {
  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    logger.info(`response: ${JSON.stringify(otherFields, undefined, 2)}`);
    res.status(statusCode).send(otherFields);
  };

  const logInput = (req, res, next) => {
    if (req.query) {
      logger.info(JSON.stringify(req.query, undefined, 2));
      logger.info(`query: ${JSON.stringify(req.query, undefined, 2)}`);
    }

    if (req.params) {
      logger.info(`params: ${JSON.stringify(req.params, undefined, 2)}`);
    }

    if (req.body) {
      logger.info(`body: ${JSON.stringify(req.body, undefined, 2)}`);
    }
    next();
  };

  app.use('/', router);
  router.post('/login', logInput, session.login, handlerResponse);
  router.post('/login/send_token', logInput, session.sendToken, handlerResponse);
  router.post('/token', logInput, session.authentication, handlerResponse);
  router.post('/logout', logInput, session.logout, handlerResponse);
  router.post('/block', logInput, session.block, handlerResponse);
};
