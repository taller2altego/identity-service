const sessionService = require('../service/SessionService');

class SessionController {
  async login(req, res, next) {
    console.log('asdasdsa');
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
      })
      .catch(err => {
        if (err.statusCode) {
          res.customResponse = { statusCode: err.statusCode, message: err.message };
        } else {
          res.customResponse = { status: 500, message: 'Unexpected error' };
        }
        next();
      });
  }

  async authentication(req, res, next) {
    const authorization = req.headers.authorization && req.headers.authorization.split(' ');
    const token = authorization[0] === 'Bearer' ? authorization[1] : '';

    console.log(token);
    return sessionService
      .tokenIsValid(token)
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