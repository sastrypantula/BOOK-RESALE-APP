const jwt = require("jsonwebtoken");
const User = require('../src/models/user');

const setUserFromToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const payload = jwt.verify(token, process.env.JWT_KEY);
      const user = await User.findById(payload._id);
      if (user) {
        req.user = user;
      }
    }
  } catch (err) {
    req.user = null; // Token invalid or user not found
  }
  next();
};

module.exports = setUserFromToken;