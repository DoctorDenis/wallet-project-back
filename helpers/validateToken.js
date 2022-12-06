const userService = require("../services/userServices");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

module.exports = async function validateToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token)
  // const refreshToken = req.headers.authorization.split(" ")[1];

  try {
    const result = jwt.verify(token, SECRET_KEY);
console.log(result.id)
    const user = await userService.getUserInfoById(result.id);
    req.user = user;
  } catch (error) {
    error.message = "Not authorized";
    error.code = 401;
    next(error);
  }
  next();
};
