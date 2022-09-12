const redisClient = require('./../global').redisClient;

class SessionRepository {

  async validate(username) {
    return redisClient.get(username) !== null;
  }

  async set(username, token) {
    return redisClient.set(username, token);
  }

  async delete(token) {
    return redisClient.del(token);
  }
}

module.exports = new SessionRepository();