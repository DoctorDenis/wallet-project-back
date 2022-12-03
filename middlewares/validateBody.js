const errorHandler = require("../helpers/errorHandler");

const validateBody = (schema) => {
  const foo = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw errorHandler(400, error.message);
    }
    next();
  };
  return foo;
};

module.exports = validateBody;
