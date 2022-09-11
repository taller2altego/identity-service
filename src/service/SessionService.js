const UserRepository = require('../repository/SessionRepository');

const jwt = require('jsonwebtoken');

class LoginService {
  async login(username, password) {
    // const username = '';

    // creas un token con jwt
    // guardas el token en redis como username-token

    // devolves el token
    // redisClient.set(req.body.name, req.body.value);
    return 'signin';
  }

  async logout(username, password) {
    // eliminamos el token de redis
    return 'signup';
  }

  async tokenIsValid() {
    // const value = await redisClient.get(req.query.name);
    return 'x';
  }
}

module.exports = new LoginService();