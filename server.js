const express = require("express");
const cors = require("cors");
var globaldata = require('./src/global');

const redis = require('redis');
const redisClient = redis.createClient({ url: 'redis://redis:6379' });

(async () => {
  await redisClient.connect();
  redisClient.on('error', (err) => {
    console.log('Error occured while connecting or accessing redis server');
  });

  console.log('server');
  console.log(redisClient);
  globaldata.redisClient = redisClient;

  const app = express();
  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "hello world" });
  });

  require("./src/routes/SessionRoutes")(app);

  // set port, listen for requests
  const PORT = 5000;
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
})();