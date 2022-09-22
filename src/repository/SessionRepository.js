const redisClient = require('./../global').redisClient;

class SessionRepository {

  async validate(email) {
    const x = await redisClient.get(email);
    console.log(x);
    return x !== null;
  }

  async set(email, token) {
    return redisClient.set(email, token);
  }

  async delete(email) {
    return redisClient.del(email);
  }
}

module.exports = new SessionRepository();