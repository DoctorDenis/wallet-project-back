const userService = require("../../services/userServices");
const { userModel } = require("../../models/user");

async function logout(req, res, next) {
  try {
    const result = await userService.getUserInfoById(req.user._id);
    // const { _id } = req.user;
    await userModel.findByIdAndUpdate(result._id, {
      accesToken: "",
      refreshToken: "",
    });
    res.status(204).send("Logout Success");
  } catch (error) {
    error.code = 401;
    error.message = "Not authorized";
    next(error);
  }
}

module.exports = logout;
