const LoginService = require('../../service/login/LoginService');

class LoginController {
  async loginWithPassword(req, res, next) {
    const token = await LoginService.loginWithPassword(req.body.username, req.body.password)
      .catch((err) => {
        if (err.statusCode === undefined) {
          res.customResponse = { statusCode: 500, message: 'Unexpected error' };
        } else {
          res.customResponse = { statusCode: err.statusCode, message: err.message };
        }
        next();
      });
    res.customResponse = { statusCode: 200, token };
    next();
  }
}

module.exports = new LoginController();