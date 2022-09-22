const redisClient = require('./../global').redisClient;

class SessionRepository {

  async validate(email) {
    const isValid = await redisClient.get(email);
    return isValid !== null;
  }

  async set(email, token) {
    return redisClient.set(email, token);
  }

  async delete(email) {
    return redisClient.del(email);
  }
}

module.exports = new SessionRepository();