const { userModel } = require("../../models/user");

const jwt = require("jsonwebtoken");


const ResponseError = require("../../helpers/errorHandler")

const { REFRESH_TOKEN_SEKRET_KEY, ACCES_TOKEN_SEKRET_KEY} = process.env;

const refresh = async (req, res) => {
    const { refreshToken: token } = req.body;
    try {
        const {_id} = jwt.verify(token, REFRESH_TOKEN_SEKRET_KEY);
        // console.log(_id)
        const user = await userModel.findById(_id);
        // console.log(user._id)
        if (!user || user.refreshToken !== token) {
            throw new Error("Token expired. Please try again");
        }
        const payload = {
            id: user._id,
        }
        // console.log(payload)
        const accesToken = jwt.sign(payload, ACCES_TOKEN_SEKRET_KEY);
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SEKRET_KEY);
        await userModel.findByIdAndUpdate(user._id, {accesToken, refreshToken});
        res.json({
            accesToken,
            refreshToken,
        })
    } catch (error) {
        throw ResponseError(401);
    }
};

module.exports = refresh;