const express = require("express");
const cors = require("cors");

const redis = require('redis');
const redisClient = redis.createClient({
  url: 'redis://redis:6379'
});

(async () => {
  await redisClient.connect();
  redisClient.on('error', (err) => {
    console.log('Error occured while connecting or accessing redis server');
  });


  if (!redisClient.get('customer_name', redis.print)) {
    //create a new record
    redisClient.set('customer_name', 'John Doe', redis.print);
    console.log('Writing Property : customer_name');
  } else {
    let val = redisClient.get('customer_name', redis.print);
    console.log(`Reading property : customer_name - ${JSON.stringify(val, null, 2)}`);
  }

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

  app.post("/signin", (req, res) => {
    // const username = '';

    // creas un token con jwt
    // guardas el token en redis como username-token

    // devolves el token
    redisClient.set(req.body.name, req.body.value);
    res.status(200).send('ok');
  });

  app.post('/signout', (req, res) => {
    // eliminamos el token de redis
  });

  app.get('/authentication', async (req, res) => {
    const value = await redisClient.get(req.query.name);
    res.status(200).send(value);
  });

  app.get("/test", async (req, res) => {
    const value = await redisClient.get(req.query.name);
    res.status(200).send(value);
  });

  require("./src/routes/LoginRoutes")(app);
  require("./src/routes/SignUpService")(app);

  // set port, listen for requests
  const PORT = 5000;
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
})();