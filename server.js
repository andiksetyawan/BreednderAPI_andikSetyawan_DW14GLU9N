require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT;

const routes = require("./routers");

app.use(express.json());
app.use("/api/v1", routes);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "You are not authorized." });
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`running on port ${port}`));
