module.exports = function createUserBodyResponse(user) {
  return {
    name: user.name,
    email: user.email,
    subscription: user.subscription,
    balance: user.balance,
    avatarURL: user.avatarURL,
    transactions: user.transactions,
  };
};
