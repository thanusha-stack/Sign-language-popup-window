const authMiddleware = (req, res, next) => {
    // Check if user is authenticated
    if (req.headers.authorization === 'valid-token') {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = authMiddleware;