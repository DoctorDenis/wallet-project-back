const fs = require("fs");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const usersRouter = require("./routes/users");
const transRouter = require("./routes/transactions");
const categoriesRouter = require("./routes/categories");
const statisticsRouter = require("./routes/statistics");
const currencyRouter = require("./routes/currency");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "common";

app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", usersRouter);
app.use("/transactions", transRouter);
app.use("/categories", categoriesRouter);
app.use("/statistics", statisticsRouter);
app.use("/currency", currencyRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { code = 500 } = err;
  res.status(code).json({ message: err.message });
});

module.exports = { app };
