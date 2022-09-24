const SessionRepository = require('../repository/SessionRepository');
const { secretKey } = require('config');

const jwt = require('jsonwebtoken');
const { sendMail } = require('../utils/nodeMailer');

class LoginService {
  login(body) {
    const token = jwt.sign({ ...body }, secretKey, { expiresIn: 3600 * 2 });
    return SessionRepository
      .set(body.email, token)
      .then(() => token);
  }

  logout(token) {
    const { payload } = jwt.decode(token, { complete: true });
    return SessionRepository
      .delete(payload.email)
      .then(() => { });
  }

  send_token(body) {
    const token = jwt.sign({ ...body }, secretKey, { expiresIn: 300 });
    return SessionRepository
      .set(body.email, token)
      .then(() => {
        sendMail(body.email, token);
        return token;
      });
  }

  async tokenIsValid(token) {
    const isValid = jwt.verify(token, secretKey);
    if (isValid) {
      const { payload } = jwt.decode(token, { complete: true });
      return SessionRepository
        .validate(payload.email)
        .then(isValid => {
          if (isValid) {
            return token;
          } else {
            throw new Error('token is invalid');
          }
        });
    } else {
      throw new Error('token is invalid');
    }
  }
}

module.exports = new LoginService();