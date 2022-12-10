const { Transaction } = require("../../models/transaction");
const ResponseError = require("../../helpers/errorHandler");

const remove = async (req, res) => {
  const { transactionId } = req.params;
  const result = await Transaction.findByIdAndDelete(transactionId);
  if (!result) {
    throw ResponseError(404, "Transaction Not Found");
  }
  res.status(200).json({ message: "transaction deleted" });
};

module.exports = remove;
