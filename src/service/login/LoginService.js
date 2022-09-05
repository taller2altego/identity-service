const UserRepository = require('../../repository/UserRepository');

class LoginService {
  async loginWithPassword(username, password) {
    console.log(username);
    return UserRepository
      .getUserByUsername(username)
      .then(user => {
        console.log(user);
        if (user.password === password) {
          return 'Token';
        } else {
          throw new Error('Credenciales incorrectas');
        }
      })
      .catch(err => {
        console.log(err);
        if (err.code === 503) {
          throw new Error('El servicio no responde');
        } else {
          throw new Error('Unexpected error');
        }
    });
  }
}

module.exports = new LoginService();