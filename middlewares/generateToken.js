// require("dotenv").config();
const jwt = require("jsonwebtoken");
// ACCES_TOKEN_SEKRET_KEY=wi".A3h2Bu3_j+`
// REFRESH_TOKEN_SEKRET_KEY=!uA=^B_aom:Wx7v
const { ACCES_TOKEN_SEKRET_KEY, REFRESH_TOKEN_SEKRET_KEY } = process.env;

module.exports = function generateToken(payload) {
  const accesToken = jwt.sign(JSON.stringify(payload), ACCES_TOKEN_SEKRET_KEY );
  const refreshToken = jwt.sign(JSON.stringify(payload), REFRESH_TOKEN_SEKRET_KEY);
  return {
    accesToken,
    refreshToken,
  };
};
