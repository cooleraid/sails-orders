/**
 * Allow any authenticated user.
 */
const jwt = require('jsonwebtoken')
const { secret } = sails.config.settings.jwt;
module.exports = async (req, res, next) => {
  if (req.headers.authorization?.split(' ')[0].toLowerCase() !== 'jwt') return res.status(401).json({ status: "error", message: "No authorization header was found.", data: false });
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ status: "error", message: "Token is required.", data: false });
  try {
    const { id } = jwt.verify(token, secret)
    const user = await User.findOne({ id })
    if (!user) return res.status(401).json({ status: "error", message: "Invalid user.", data: false });
    req.user = user;
    return next();
  } catch (err) {
    res.status(401).json({ status: "error", message: err.message, data: false });
  }
};
