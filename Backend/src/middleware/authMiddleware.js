const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = (roles = []) => async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid', error: err.message });
  }
};

module.exports = authMiddleware;
