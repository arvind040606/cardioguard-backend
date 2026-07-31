const logger = require('../utils/logger');

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

function notFoundHandler(_req, res) {
  res.status(404).json({ error: 'The requested resource was not found.' });
}

function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational
    ? err.message
    : 'An unexpected server error occurred. Please try again later.';

  if (!err.isOperational) {
    logger.error('Unhandled server error', {
      message: err.message,
      stack: err.stack,
    });
  }

  res.status(statusCode).json({ error: message });
}

module.exports = { AppError, notFoundHandler, errorHandler };
