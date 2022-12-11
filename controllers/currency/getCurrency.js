const { default: axios } = require("axios");

const getCurrency = async (req, res) => {
  try {
    const data = await axios("https://api.monobank.ua/bank/currency");
    console.log(data);
    res.status(200).json(data.data.slice(0, 3));
  } catch (error) {
    res.status(200).send();
  }
};
module.exports = getCurrency;
