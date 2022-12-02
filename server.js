const { app } = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_URI, PORT } = process.env;

// const DB_URI =
//   "mongodb+srv://denis:Ot0UzVGiGGwOpjsC@wallet-database.q8jesgd.mongodb.net/wallet-database?retryWrites=true&w=majority";

// const PORT = 3000;

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
