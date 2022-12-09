const { default: axios } = require("axios");

const getCurrency = async (req, res) => {
  const data = await axios("https://api.monobank.ua/bank/currency");
  res.status(200).json(data.data.slice(0, 3));
};

module.exports = getCurrency;
