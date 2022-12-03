const { Transaction } = require("../../models/transaction");

const add = async (req, res) => {
  // const { _id: owner } = req.user;
  console.log("here");
  const transaction = await Transaction.create(req.body);
  res.status(201).json(transaction);
};

module.exports = add;
