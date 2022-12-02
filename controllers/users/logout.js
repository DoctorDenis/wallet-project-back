const userService = require("../../services/userServices");

async function logout(req, res, next) {
  try {
    const result = await userService.getUserInfoById(req.user._id);

    res.status(204).send("No content");
  } catch (error) {
    error.code = 401;
    error.message = "Not authorized";
    next(error);
  }
}

module.exports = logout;
