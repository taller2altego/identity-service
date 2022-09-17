const redisClient = require('./../global').redisClient;

class SessionRepository {

  async validate(name) {
    const x = await redisClient.get(name);
    console.log(x);
    return x !== null;
  }

  async set(name, token) {
    return redisClient.set(name, token);
  }

  async delete(name) {
    return redisClient.del(name);
  }
}

module.exports = new SessionRepository();