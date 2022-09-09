module.exports = app => {
  const login = require('../controller/login/LoginController');
  const router = require('express').Router();

  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  app.use('/signup', router);
  router.post('/', login.signup, handlerResponse);
};
