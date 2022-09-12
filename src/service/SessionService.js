const SessionRepository = require('../repository/SessionRepository');
const { secretKey } = require('config');

const jwt = require('jsonwebtoken');

class LoginService {
  login(body) {
    const token = jwt.sign({ ...body }, secretKey);
    return SessionRepository
      .set(body.username, token)
      .then(() => token);
  }

  async logout(body) {
    return SessionRepository
      .delete(body.username)
      .then(() => {});
  }

  async tokenIsValid(body) {
    return Promise.all([jwt.verify(body.token, secretKey), SessionRepository.validate(body.username)])
      .then(responses => {
        const repositoryResponse = responses[1];
        if (repositoryResponse === body.token) return body.token;
        throw new Error();
      });
  }
}

module.exports = new LoginService();