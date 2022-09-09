module.exports = app => {
  const login = require('../controller/login/LoginController');
  const router = require('express').Router();

  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  app.use('/signin', router);
  router.post('/', login.signin, handlerResponse);
};
