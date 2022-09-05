const express = require("express");
const cors = require("cors");
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

require("./src/routes/LoginRoutes")(app);

// set port, listen for requests
const PORT = 5000;
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${PORT}.`);
});