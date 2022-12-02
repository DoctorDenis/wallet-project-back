const { app } = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_URI, PORT } = process.env;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database connection successfully established");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
