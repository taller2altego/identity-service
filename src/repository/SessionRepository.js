class SessionRepository {
  constructor() {
    this.users = [
      {
        id: 1,
        username: 'facu',
        password: 'x'
      },
      {
        id: 2,
        username: 'luchito',
        password: 'trolo'
      }
    ];
  }

  async setToken(token) {
    return token;
  }

  async getUserByUsername(username) {
    return this.users.filter(user => user.username === username)[0] || {};
  }
}

module.exports = new SessionRepository();