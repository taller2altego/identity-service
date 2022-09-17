const redisClient = require('./../global').redisClient;

class SessionRepository {

  async validate(username) {
    const x = await redisClient.get(username);
    console.log(x);
    return x !== null;
  }

  async set(username, token) {
    return redisClient.set(username, token);
  }

  async delete(username) {
    return redisClient.del(username);
  }
}

module.exports = new SessionRepository();