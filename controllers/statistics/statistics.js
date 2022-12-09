const { Transaction } = require("../../models/transaction");

module.exports = async function getStatistics(req, res, next) {
  // const [year, month, day] = req.query.date.split("-");
  console.log(req.query.date);

  const startDate = new Date(req.query.date);
  const endDate = new Date(
    new Date(startDate).setMonth(new Date(req.query.date).getMonth() + 1)
  );

  try {
    const { _id: owner } = req.user;
    let result = await Transaction.aggregate([
      {
        $match: {
          owner,
          isIncome: false,
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    next(error);
  }
};
