const { Transaction } = require("../../models/transaction");
const { userModel } = require("../../models/user");
const ResponseError = require("../../helpers/errorHandler");

const remove = async (req, res) => {
  const { transactionId } = req.params;
  const result = await Transaction.findByIdAndDelete(transactionId);
  if (!result) {
    throw ResponseError(404, "Transaction Not Found");
  }
  const balanceChange = result.isIncome ? result.amount * -1 : result.amount;
  const updatedUser = await userModel.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { transactions: transactionId },
      $inc: { balance: balanceChange },
    },
    { new: true }
  );

  result.balance = updatedUser.balance;
  res.status(200).json(result);
};

module.exports = remove;
