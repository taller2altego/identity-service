const express = require("express");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const redis = require('redis');
const redisClient = redis.createClient({ url: process.env.REDIS_TLS_URL || 'redis://redis:6379' });
const morgan = require('morgan');
const logger = require('./winston');
var globaldata = require('./src/global');

(async () => {
  await redisClient.connect();
  redisClient.on('error', (err) => {
    console.log('Error occured while connecting or accessing redis server');
  });

  globaldata.redisClient = redisClient;

  const app = express();
  app.use(
    cors({
      origin: "*",
    })
  );

  const myStream = {
    write: text => {
      logger.info(text);
    }
  };
  app.use(morgan('combined', { stream: myStream }));

  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Identity Microservice",
      description: "API del microservicio de identificacion de usuarios",
      version: "0.1",
    },
    servers: [{ url: "http://localhost:5002", description: "" }]
  };
  const options = { swaggerDefinition, apis: ["./docs/**/*.yaml"] };
  const swaggerSpec = swaggerJSDoc(options);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "hello world" });
  });

  require("./src/routes/SessionRoutes")(app);

  // set port, listen for requests
  const PORT = 5000;
  app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
})();