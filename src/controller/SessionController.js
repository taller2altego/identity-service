const sessionService = require('../service/SessionService');

class SessionController {
  async login(req, res, next) {
    const token = await sessionService.login();
    res.customResponse = { statusCode: 200, token };
    next();
  }

  async logout(req, res, next) {
    await sessionService.logout();
    res.customResponse = { statusCode: 200, token };
    next();
  }

  async isValid(req, res, next) {
    await sessionService.tokenIsValid();
    res.customResponse = { statusCode: 200, token };
    next();
  }
}

module.exports = new SessionController();