const userService = require("../services/userServices");
const jwt = require("jsonwebtoken");

const { ACCES_TOKEN_SEKRET_KEY, REFRESH_TOKEN_SEKRET_KEY } = process.env;

module.exports = async function validateToken(req, res, next) {
  const accessToken = req.headers.authorization.split(" ")[1];
  const refreshToken = req.headers.authorization.split(" ")[1];

  try {
    const result = jwt.verify(accessToken, refreshToken, ACCES_TOKEN_SEKRET_KEY, REFRESH_TOKEN_SEKRET_KEY);
    const user = await userService.getUserInfoById(result._id);
    req.user = user;
  } catch (error) {
    // error.message = "Not authorized";
    // error.code = 401;
    next(error);
  }

  next();
};
