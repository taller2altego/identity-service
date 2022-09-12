const sessionService = require('../service/SessionService');

class SessionController {
  async login(req, res, next) {
    return sessionService
      .login(req.body)
      .then(token => {
        res.customResponse = { statusCode: 200, token };
        next();
      });
  }

  async logout(req, res, next) {
    return sessionService
      .logout(req.token)
      .then(() => {
        res.customResponse = { statusCode: 200 };
        next();
      });
  }

  authentication(req, res, next) {
    return sessionService
      .tokenIsValid(req.params.token)
      .then(token => {
        res.customResponse = { statusCode: 200, token };
        next();
      });
  }
}

module.exports = new SessionController();