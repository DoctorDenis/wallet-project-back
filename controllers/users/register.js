const userService = require("../../services/userServices");
const generateToken = require("../../middlewares/generateToken");
const gravatar = require("gravatar");
const shortid = require("shortid");
const createUserBodyResponse = require("../../helpers/createUserBodyResponse");
const {userModel} = require("../../models/user");
// const sendEmail = require("../../helpers/sendEmail");
// const generateEmailBody = require("../../helpers/generateEmailBody");

async function register(req, res, next) {
  const { body } = req;
  body.avatarURL = gravatar.url(body.email, {
    s: "200",
    r: "pg",
    d: "retro",
    protocol: "http",
  });
  body.emailVerificationToken = shortid();

  try {
    const result = await userService.registerUser(body);
    const token = generateToken(result);
    const { accesToken, refreshToken } = token;
    await userModel.updateMany({accesToken: accesToken, refreshToken: refreshToken});
    res.status(201).json({
      message: "User successfully created",
      user: createUserBodyResponse(result),
      accesToken,
      refreshToken,
    });

    // const emailBody = generateEmailBody(result);
    // sendEmail(emailBody);
  } catch (error) {
    if (error.code === 11000) {
      error.code = 409;
      error.message = `Email in use`;
    }
    next(error);
  }
}

module.exports = register;
