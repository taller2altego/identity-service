const UserRepository = require('../../repository/UserRepository');

class LoginService {
  async signin(username, password) {
    return 'signin';
  }

  async signup(username, password) {
    return 'signup';
  }
}

module.exports = new LoginService();