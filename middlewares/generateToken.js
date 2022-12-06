require("dotenv").config();
const jwt = require("jsonwebtoken");

// ACCES_TOKEN_SEKRET_KEY=wi!.A3h2Bu3_j+`
// REFRESH_TOKEN_SEKRET_KEY=!uA=^B_aom:Wx7v



const { SECRET_KEY } = process.env;

module.exports = function generateToken(payload) {
  const accesToken = jwt.sign(JSON.stringify(payload), SECRET_KEY);
  const refreshToken = jwt.sign(JSON.stringify(payload), SECRET_KEY);
  return {
    accesToken,
    refreshToken,
  };
};
