// const categoriesServices = require("");
const { Transaction } = require("../../models/transaction");

module.exports = async function getCategories(req, res, next) {
  try {
    const { _id: owner } = req.user;
    let result = await Transaction.aggregate([

`     { $match: { owner, isIncome: false } },

      {
        $group: { _id: "$category" },
      },
    ]);
    result = result.map((i) => i._id).sort();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
