const jwt = require('jsonwebtoken');
const { config } = require('../config/env');
const { AppError } = require('./errorMiddleware');

function authMiddleware(req, _res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return next(new AppError('Authorization denied. Authentication token is required.', 401));
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return next(new AppError('Token format is invalid. Expected: Bearer <token>', 401));
  }

  try {
    const decoded = jwt.verify(parts[1], config.jwtSecret);
    req.user = {
      ...decoded,
      id: decoded.sub || decoded.id,
      role: decoded.role || decoded.user_metadata?.role || 'doctor'
    };
    next();
  } catch {
    next(new AppError('Token is invalid or expired.', 401));
  }
}

function requireAdmin(req, _res, next) {
  if (req.user.role !== 'admin') {
    return next(new AppError('Access denied. Administrator privileges required.', 403));
  }
  next();
}

module.exports = authMiddleware;
module.exports.requireAdmin = requireAdmin;
