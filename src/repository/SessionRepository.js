const redis = require('redis');
const redisClient = redis.createClient();

class SessionRepository {

  async validate(username) {
    return (redisClient.get(username) != null) ;
  }
  async set(username, token){
    return (redisClient.set(username, token))
  }
  async delete(token){
    return (redisClient.del(token))
  }
}

module.exports = new SessionRepository();