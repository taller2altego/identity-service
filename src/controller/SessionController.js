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
    const authorization = req.headers.authorization && req.headers.authorization.split(' ');
    const token = authorization[0] === 'Bearer' ? authorization[1] : '';

    return sessionService
      .logout(token)
      .then(() => {
        res.customResponse = { statusCode: 200 };
        next();
      });
  }

  authentication(req, res, next) {
    const authorization = req.headers.authorization && req.headers.authorization.split(' ');
    const token = authorization[0] === 'Bearer' ? authorization[1] : '';

    return sessionService
      .tokenIsValid(req.params.username, { token })
      .then(token => {
        res.customResponse = { statusCode: 200, token };
        next();
      })
      .catch(err => {
        console.log(err);
        res.customResponse = { statusCode: 403, message: err.message };
        next();
      });
  }
}

module.exports = new SessionController();