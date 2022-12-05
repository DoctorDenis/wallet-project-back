const { Transaction } = require("../../models/transaction");
const userServices = require("../../services/userServices");

const add = async (req, res) => {
  // Створюємо транзакію і отримуємо її у змінну transaction
  const transaction = await Transaction.create(req.body);
  //Додаємо створену транзакцію до юзера у поле transactions і отримуємо оновленого юзера
  const user = await userServices.addTransactionToUser(
    req.user._id,
    transaction
  );
  //Повертаємо у response оновлену історію транзакцій юзера
  res.status(201).json({ transactions: user.transactions });
};

module.exports = add;
