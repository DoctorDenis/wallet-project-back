const { isValidObjectId } = require("mongoose");
const ResponseError = require("../../helpers/errorHandler");

const isValidId = (req, res, next) => {
  const { transactionId } = req.params;
  const result = isValidObjectId(transactionId);
  if (!result) {
    next(ResponseError(400, "Invalid id format"));
  }
  next();
};

module.exports = isValidId;
