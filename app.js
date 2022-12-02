const fs = require("fs");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/users");
const transRouter = require("./routes/transactions");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "common";
// var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
//   flags: "a",
// });

// app.use(logger(formatsLogger, { stream: accessLogStream }));
app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);
app.use("/transactions", transRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { code = 500 } = err;
  res.status(code).json({ message: err.message });
});

module.exports = { app };
