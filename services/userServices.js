const { userModel } = require("../models/user");
const bcrypt = require("bcrypt");
const ResponseError = require("../helpers/errorHandler");
const saltRounds = 10;

module.exports = class userService {
  static async registerUser(body) {
    const encriptionResult = await bcrypt.hash(body.password, saltRounds);
    body.password = encriptionResult;
    const result = await userModel.create(body);
    return result;
  }

  static async loginUser(body) {
    const result = await userModel.findOne({ email: body.email });
    let authResult = null;
    if (result) {
      authResult = await bcrypt.compare(body.password, result.password);
    } else {
      const error = new Error(`Email or password is wrong`);
      error.code = 403;
      throw error;
    }

    if (!result || !authResult) {
      const err = new Error(`Email or password is wrong`);
      err.code = 403;
      throw err;
    } else {
      return result;
    }
  }

  static async getUserInfoById(id) {
    const user = await userModel.findById(id);
    if (!user) {
      throw ResponseError(404, "Not found");
    } else {
      return user;
    }
  }

  static async updateSuscription(id, obj) {
    const user = await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: { subscription: obj.subscription },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    if (!user) {
      throw new Error("Not found");
    } else {
      return user;
    }
  }

  static async changeAvatar(body) {
    const user = await userModel.findOneAndUpdate(
      { _id: body._id },
      {
        $set: { avatarURL: body.avatarURL },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!user) {
      throw new Error("Not found");
    } else {
      return user;
    }
  }

  static async verifyEmail(token) {
    const user = await userModel.findOneAndUpdate(
      { verificationToken: token },
      {
        $set: { verify: true, verificationToken: null },
      }
    );
    if (!user) {
      const error = new Error("User not found");
      error.code = 404;
      throw error;
    } else {
      return user;
    }
  }

  static async getuserByEmail(email) {
    const user = await userModel.findOne({ email });

    if (user.verify) {
      const error = new Error("Verification has already been passed");
      error.code = 400;
      throw error;
    } else {
      return user;
    }
  }
};
