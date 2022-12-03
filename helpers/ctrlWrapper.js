const ctrlWrapper = (ctrl) => {
  const foo = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return foo;
};

module.exports = ctrlWrapper;
