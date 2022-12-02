const userService = require("../../services/userServices");
const generateToken = require("../../middlewares/generateToken");
const createUserBodyResponse = require("../../helpers/createUserBodyResponse");

async function login(req, res, next) {
  try {
    const result = await userService.loginUser(req.body);
    const token = generateToken(result);

    res.status(200).json({ token, user: createUserBodyResponse(result) });
  } catch (error) {
    error.code = 401;
    next(error);
  }
}

module.exports = login;
