const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Auth error' });

  try {
    const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET || 'fallback_secret_123');
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Invalid token' });
  }
};
