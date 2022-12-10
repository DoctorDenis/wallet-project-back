const userServices = require("../../services/userServices");

const getCurrent = async (req, res) => {
  const { user } = req;

  const result = await userServices.getUserInfoById(user._id);
  console.log(result);
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: result,
    },
  });
};

module.exports = getCurrent;
