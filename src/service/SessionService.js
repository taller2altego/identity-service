const SessionRepository = require('../repository/SessionRepository');
const { secretKey } = require('config');

const jwt = require('jsonwebtoken');

class LoginService {
  login(body) {
    const token = jwt.sign({ ...body }, secretKey, { expiresIn: 3600 * 24 });
    return SessionRepository
      .set(body.username, token)
      .then(() => token);
  }

  logout(token) {
    return SessionRepository
      .delete(token)
      .then(() => { });
  }

  async tokenIsValid(username, { token }) {
    return Promise.all([jwt.verify(token, secretKey), SessionRepository.validate(username)])
      .then(responses => {
        const isValid = responses[1];
        if (isValid) return token;
        throw new Error();
      });
  }
}

module.exports = new LoginService();