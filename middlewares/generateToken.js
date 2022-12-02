// require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

module.exports = function generateToken(payload) {
  const token = jwt.sign(JSON.stringify(payload), SECRET_KEY);
  return token;
};
