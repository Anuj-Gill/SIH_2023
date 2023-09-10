const userModel = require("../schema/users");
const { verifyToken } = require("../utils/index");

module.exports = async (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token);
  if (token) {
    const tokenData = verifyToken(token);
    const user = await userModel.findOne({ email: tokenData.email }).populate({
      path: "role",
    });
    console.log(user);
    req.user = user;
    next();
  } else {
    // Error Handlings
    // res.status(401).json({});
  }
};
