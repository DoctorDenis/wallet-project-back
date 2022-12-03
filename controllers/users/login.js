const userService = require("../../services/userServices");
const generateToken = require("../../middlewares/generateToken");
const createUserBodyResponse = require("../../helpers/createUserBodyResponse");
const {userModel}= require("../../models/user");

async function login(req, res, next) {
  try {
    const result = await userService.loginUser(req.body);
    const token = generateToken(result);
    const { accesToken, refreshToken } = token;
    const {_id} = result;
    await userModel.findByIdAndUpdate(_id, {accesToken, refreshToken});
console.log(_id)
    res.status(200).json( accesToken, refreshToken, {user: createUserBodyResponse(result)} );
  } catch (error) {
    error.code = 401;
    next(error);
  }
}

module.exports = login;
