require("dotenv").config();
const jwt = require("jsonwebtoken");

// ACCES_TOKEN_SEKRET_KEY=wi!.A3h2Bu3_j+`
// REFRESH_TOKEN_SEKRET_KEY=!uA=^B_aom:Wx7v

const { SECRET_KEY } = process.env;

module.exports = function generateToken(user) {
  const payload = { _id: user._id };
  const accesToken = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
  const refreshToken = jwt.sign(payload, SECRET_KEY, {expiresIn: "10d"});
  return {
    accesToken,
    refreshToken,
  };
};
