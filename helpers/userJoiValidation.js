const Joi = require("joi");

const registrationUserSchema = Joi.object({
  name: Joi.string()
    .pattern(
      /[ЙЦУКНГШЩЗХЇЄЖДЛОРПАВІФЮБЬТИМСЧЯйцукенгшщзхїєждлорпавіфячсмитьбюA-Za-z']/
    )
    .min(1)
    .max(12)
    .required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .min(6)
    .max(16)
    .required(),

  email: Joi.string()
    .min(10)
    .max(63)
    .pattern(/^[A-Za-z0-9._]{1}[A-Za-z0-9._-]{1,}@[A-Za-z0-9]+\.\w{2,3}$/)
    .rule({
      keep: true,
      message:
        "The email seems not valid. Try something like this 'elon.musk@twitter.com' ;-)",
    })
    .required(),

  subscription: Joi.string().valid("basic", "pro").default("basic"),

  accesToken: Joi.string(),
  refreshToken: Joi.string(),
}).messages({
  "any.required": "You forgot to provide {{#label}}",
  // "string.pattern.base":
  //   "{{#label}} with value {:[.]} fails to match the required pattern",
});

const loginUserSchema = Joi.object({
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .min(6)
    .max(16)
    .required(),

  email: Joi.string()
    .min(10)
    .max(63)
    .pattern(/^[A-Za-z0-9._]{1}[A-Za-z0-9._-]{1,}@[A-Za-z0-9]+\.\w{2,3}$/)
    .rule({
      keep: true,
      message:
        "The email seems not valid. Try something like this 'elon.musk@twitter.com' ;-)",
    })
    .required(),

  accesToken: Joi.string(),
  refreshToken: Joi.string(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = validateUser = (req, res, next) => {
  const obj = {
    ["/register"]: registrationUserSchema,
    ["/login"]: loginUserSchema,
    ["/refresh"]: refreshTokenSchema,
  };

  const { error, value } = obj[req.url].validate(req.body);
  if (error) {
    res.status(400).json({ validation_error: error.message });
  } else {
    next();
  }
};
