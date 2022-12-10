const { Transaction } = require("../../models/transaction");
const userServices = require("../../services/userServices");

const add = async (req, res) => {
  const { body } = req;
  body.owner = req.user._id;

  const balance =
    req.user.balance +
    (body.isIncome === true ? body.amount : body.amount * -1);

  body.balance = balance;

  const transaction = await Transaction.create(body);
  //Додаємо створену транзакцію до юзера у поле transactions і отримуємо оновленого юзера
  const user = await userServices.addTransactionToUser(
    req.user._id,
    transaction
  );
  //Повертаємо у response оновлену історію транзакцій юзера
  res.status(201).json({ data: transaction });
};

module.exports = add;
