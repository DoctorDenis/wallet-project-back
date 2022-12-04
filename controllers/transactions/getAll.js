const { Transaction } = require('../../models/transaction');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const transactions = await Transaction.find(
    { owner },
    '-createdAt -updatedAt'
  );
  //   const { page = 1, limit = 10, ...filter } = req.query;
  //   const skip = (page - 1) * limit;
  //   const transactions = await Transaction.find(
  //     { owner, ...filter },
  //     "-createdAt -updatedAt",
  //     {
  //       skip,
  //       limit,
  //     }
  //   ).populate("owner", "name email");
  res.json(transactions);
};

module.exports = getAll;
