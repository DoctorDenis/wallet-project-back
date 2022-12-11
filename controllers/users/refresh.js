const { userModel } = require("../../models/user");

const jwt = require("jsonwebtoken");

const ResponseError = require("../../helpers/errorHandler");

const { SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;
  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    // console.log(_id)
    const user = await userModel.findById(_id);
    // console.log(user)
    // if (!user || user.refreshToken !== token) {
    //   throw new Error("Token expired. Please try again");
    // }
    const payload = {
      id: user._id,
    };
    console.log(payload)
    const accesToken = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
    const refreshToken = jwt.sign(payload, SECRET_KEY, {expiresIn: "10d"});
    await userModel.findByIdAndUpdate(user._id, { accesToken, refreshToken });
    res.json({
      accesToken,
      refreshToken,
    });
  } catch (error) {
    throw ResponseError(401);
  }
};

module.exports = refresh;
