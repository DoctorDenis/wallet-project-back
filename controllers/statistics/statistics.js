const { Transaction } = require("../../models/transaction");

module.exports = async function getStatistics(req, res, next) {
  // const [year, month, day] = req.query.date.split("-");
  const { month, year } = req.query;
  const { _id: owner } = req.user;

  // month = Number(month);
  // year = Number(year);

  const startDate = new Date(Number(year), Number(month - 1), 1, 3);
  const endDate = new Date(
    new Date(startDate).setMonth(new Date(startDate).getMonth() + 1)
  );

  console.log("start date: ", startDate);
  console.log("end date: ", endDate);

  try {
    let expensesByCategories = await Transaction.aggregate([
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

    let sumsByTypes = await Transaction.aggregate([
      {
        $match: {
          owner,
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: "$isIncome",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const sums = sumsByTypes.map((item) => {
      if (item._id === true) {
        return { earned: item.total };
      } else {
        return { spent: item.total };
      }
    });

    console.log(sums);

    res.json({ expensesByCategories, sums });
  } catch (error) {
    next(error);
  }
};
