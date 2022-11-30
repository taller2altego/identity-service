const { secretKey } = require('config');

const jwt = require('jsonwebtoken');
const SessionRepository = require('../repository/SessionRepository');
const { sendMail } = require('../utils/nodeMailer');

class LoginService {
  login(body) {
    const token = jwt.sign({ ...body }, secretKey, { expiresIn: 3600 * 2 });
    return SessionRepository
      .set(body.email, token)
      .then(() => token);
  }

  logout(token) {
    const isValid = jwt.verify(token, secretKey);
    if (isValid) {
      const { payload } = jwt.decode(token, { complete: true });
      return SessionRepository
        .delete(payload.email)
        .then(() => { });
    }
    throw new Error('El token no existe');
  }

  block(email) {
    return SessionRepository
      .delete(email)
      .then(() => { });
  }

  sendToken(body) {
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
        .then(emailIsValid => {
          if (emailIsValid) {
            return {
              token, isAdmin: payload.isAdmin, id: payload.id, isSuperadmin: payload.isSuperadmin
            };
          }
          throw new Error('El token no es valido');
        });
    }
    throw new Error('El token no es valido');
  }
}

module.exports = new LoginService();
