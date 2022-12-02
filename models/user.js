const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: {
    type: String,
    required: [true, "Provide password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: {
      values: ["basic", "pro"],
      message:
        '{VALUE} is not valid value for subscription. Only "basic", "pro" are supported',
    },
    default: "basic",
  },
  balance: { type: Number, default: 100 },
  avatarURL: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel, userSchema };
