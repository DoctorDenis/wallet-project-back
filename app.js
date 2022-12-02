const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const path = require("path");
const usersRouter = require("./routes/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { code = 500 } = err;
  res.status(code).json({ message: err.message });
});

module.exports = { app };
